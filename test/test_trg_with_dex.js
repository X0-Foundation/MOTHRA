const { ethers, waffle, network, upgrades } = require("hardhat");
const { expect, util } = require("chai");
const { utils, BigNumber } = require("ethers");
require("colors");

const XPairArtifacts = require("../artifacts/contracts/core/XPair.sol/XPair.json");
const ERC20Abi = require("../artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json");

const {
    deployWireLibrary,
    deployTGR,
    deployWBNB,
    deployFactory,
    deployFarmLibrary,
    deployFarm,
    deployCenter,
    deployXLibrary,
    deployRouterLibrary,
    deployMaker,
    deployTaker,
    deployXTgr,
    deployReferral,
    deployMockToken,
    deployRTgr,
    deployRSyrup,
    deployRepay,
    verifyContract,
    verifyUpgradeable,
    getCreate2Address,
    sqrt,
  } = require("./utils");
    const { assert } = require("console");
    const { yellow, cyan } = require("colors");
    const { zeroAddress } = require("ethereumjs-util");
    const { doesNotMatch } = require("assert");
    const zero_address = "0x0000000000000000000000000000000000000000";
    
    let wireLib, factory, wbnb, center, crossLib, routerLib, maker, taker, tgr, mock, mock2, farm, farmLib, xTgr, referral, rTgr, rSyrup, repay;
    let tgr_bnb, mck_bnb, tgr_mck, tgr_mck2;
    let owner, alice, bob, carol, tgrFtm, tgrHtz, votes;
    let tx;
    
    // These constants come from TGRToken.sol.
    const FeeMagnifier = Number(1e5); // 
    const DECIMALS = 18;
    const INITIAL_SUPPLY = 1e12;

function weiToEthEn(wei) {
    return Number(utils.formatUnits( BigInt(wei).toString(), DECIMALS)).toLocaleString("en");
}

function weiToEth(wei) {
  return Number(utils.formatUnits( BigInt(wei).toString(), DECIMALS));
}

function ethToWei(eth) {
    return utils.parseUnits(eth.toString(), DECIMALS);
}

function mega(wei) {
    return Number(utils.formatUnits( BigInt(wei/1e6).toString(), DECIMALS)).toString() + "M";
}

function uiAddr(address) {
    return "{0x" + address.substring(2, 6).concat("...") + "}";
}

function stringify(strValue) {
    return strValue.toString();
}

async function expectRevertedWith(tx, withMsg) {
    await expect(tx).to.be.revertedWith(withMsg);
}

async function expectNotReverted(tx) {
    await expect(tx).to.be.not.reverted;
}

async function expectReverted(tx) {
    await expect(tx).to.be.reverted;
}

async function eventTrigger(factory, tx, eventName, args) {
    await expect(tx)
      .to.emit(factory, eventName)
      .withArgs(...args);
}

function expectEqual(a, b) {
    expect(a).to.be.eq(b);
}

function expectNotEqual(a, b) {
    expect(a).to.be.not.eq(b);
}

const ListStatus = ["None", "Cleared", "Enlisted", "Delisted"]; // DO NOT change the order.

async function setupNodeChain() {
  //======================= Wire ==========================
    console.log("\n\tWiring contracts...".green);

    tx = tgr.connect(alice).wire(factory.address, center.address); //-------------------- expectReverted
    expectReverted(tx);
    console.log("\tAlice couldn't wire nodes", uiAddr(factory.address), uiAddr(center.address));

    tx = tgr.connect(owner).wire(factory.address, center.address);
    (await tx).wait();
    console.log("\tTgr token was wired: factory - O - center", uiAddr(factory.address), uiAddr(center.address));

    tx = center.connect(owner).wire(tgr.address, maker.address);
    (await tx).wait();
    console.log("\tControlCenter was wired: tgr - O - maker", uiAddr(tgr.address), uiAddr(maker.address));

    tx = maker.connect(owner).wire(center.address, taker.address);
    (await tx).wait();
    console.log("\tmaker was wired: center - O - taker", uiAddr(center.address), uiAddr(taker.address));

    tx = taker.connect(owner).wire(maker.address, factory.address);
    (await tx).wait();
    console.log("\ttaker was wired: maker - O - factory", uiAddr(maker.address), uiAddr(factory.address));

    tx = factory.connect(owner).wire(taker.address, tgr.address);
    (await tx).wait();
    console.log("\tfactory was wired: taker - O - tgr", uiAddr(taker.address), uiAddr(tgr.address));


    //======================= Setting contracts ==========================
    console.log("\n\tSetting contracts...".green);

    tx = tgr.connect(alice).setNode(NodeTypes.indexOf("Token"), tgr.address, zero_address); //-------------------- expectReverted
    expectReverted(tx);
    console.log("\tAlice couldn't set a node");

    tx = tgr.connect(owner).setNode(NodeTypes.indexOf("Token"), tgr.address, zero_address);
    (await tx).wait();
    console.log("\txTgr was set to the node chain");

    tx = tgr.connect(owner).setNode(NodeTypes.indexOf("Center"), center.address, zero_address);
    (await tx).wait();
    console.log("\tCenter was set to the node chain");

    tx = tgr.connect(owner).setNode(NodeTypes.indexOf("Maker"), maker.address, zero_address);
    (await tx).wait();
    console.log("\tMaker was set to the node chain");

    tx = tgr.connect(owner).setNode(NodeTypes.indexOf("Taker"), taker.address, zero_address);
    (await tx).wait();
    console.log("\tTaker was set to the node chain");

    tx = tgr.connect(owner).setNode(NodeTypes.indexOf("Factory"), factory.address, zero_address);
    (await tx).wait();
    console.log("\tFactory was set to the node chain");

    //======================= List tokens =============================

    tx = factory.connect(bob).changeTokenStatus(wbnb.address, ListStatus.indexOf("Enlisted"));
    expectReverted(tx);
    console.log("\tBob couldn't list a token");

    tx = factory.connect(owner).changeTokenStatus(wbnb.address, ListStatus.indexOf("Enlisted"));
    (await tx).wait();
    console.log("\twbnb was listed");

    tx = factory.connect(owner).changeTokenStatus(tgr.address, ListStatus.indexOf("Enlisted"));
    (await tx).wait();
    console.log("\ttgr was listed");

    tx = factory.connect(owner).changeTokenStatus(mock.address, ListStatus.indexOf("Enlisted"));
    (await tx).wait();
    console.log("\tmock was listed");

    tx = factory.connect(owner).changeTokenStatus(mock2.address, ListStatus.indexOf("Enlisted"));
    (await tx).wait();
    console.log("\tmock2 was listed");

    //======================= Configure fees ==========================
    console.log("\n\tConfiguring fees...".green);

    const accountant = "0x5cA00f843cd9649C41fC5B71c2814d927D69Df95"; // Set it a wallet address.

    const feeStores = [accountant];
    tx = tgr.connect(owner).setFeeStores(feeStores, zero_address);
    (await tx).wait();
    console.log("\tFeeStores were fed to the node chain");

    tx = tgr.connect(alice).setFeeStores(feeStores, zero_address); //-------------------- expectReverted
    expectReverted(tx);
    console.log("\tAlice couldn't feed FeeStores to the node chain");

    const FeeRates = [
        //(Accountant). Order is critical.
        [FeeMagnifier], // None. (Let them pay 100% fee if they are suspicious.)
        [FeeMagnifier * 0.001],  // Transfer
        [FeeMagnifier * 0.001],  // Swap
        [FeeMagnifier * 0.001],  // AddLiquidity
        [FeeMagnifier * 0.001],  // RemoveLiquidity
        [0]     // Dilute
        // [100], // Deposit
        // [100], // Withdraw
        // [100], // CompoundAccumulated
        // [100], // VestAccumulated
        // [100], // HarvestAccumulated
        // [100], // StakeAccumulated
        // [100], // MassHarvestRewards
        // [100], // MassStakeRewards
        // [100], // MassCompoundRewards
        // [100], // WithdrawVest
        // [100], // UpdatePool
        // [100], // EmergencyWithdraw
        // [0],  // SwitchCollectOption
        // [0]  // HarvestRepay
    ];

    tx = tgr.connect(alice).setFeeRates(0, FeeRates[0], zero_address);
    expectReverted(tx);
    console.log("\tAlice couldn't feed setFeeRates to the node chain");

    for (let st = 0; st < FeeRates.length; st++) {
        console.log(FeeRates[st]);
        tx = tgr.connect(owner).setFeeRates(st, FeeRates[st], zero_address);
        (await tx).wait();
    }
    console.log("\tFeeRates were fed to the node chain");

    const stakeholders = "0x23C6D84c09523032B08F9124A349760721aF64f6"; // Set it a wallet address.
    // tx = farm.connect(owner).setFeeParams(
    //     stakeholders,
    //     referral.address, // tgrReferral
    //     100, // 0.1%, referralCommissionRate
    //     25000, // 25.0%, nonVestBurnRate
    //     5000 // 5%, compoundFeeRate
    // );
    // (await tx).wait();
    // console.log("\tFarmFeeParams were set");

    // const backendCaller = carol.address; // Set it a wallet address.
    // tx = farm.connect(owner).setBackendCaller(backendCaller);
    // (await tx).wait();
    // console.log("\tBackend caller was set");

    // tx = referral.connect(owner).setPayer(farm.address);
    // (await tx).wait();
    // console.log("\tReferral payer was set");

}

async function showMilestone(text) {
    console.log("\t%s".blue, text);
}

async function mintBlocks(blocks) {
    console.log("\tchain is minting %s blocks...".yellow, blocks);

    let bn0 = (await ethers.provider.getBlock("latest")).number;
    for (let n = 0; n < blocks; n++) {
      await network.provider.send("evm_mine");
    }
    let bn1 = (await ethers.provider.getBlock("latest")).number;
    console.log("\t%s/%s blocks minted".green, bn1 - bn0, blocks);
}

async function pulse_user_burn() {
    console.log("\tSystem is pulse_user_burn-ing ...".yellow)
    await tgr.pulse_user_burn();
    console.log("\tPulse_user_burn-ed".green);
}

async function showStatus(user) {
    const s = await tgr.getStatus(user.address);
    console.log("\tstatus: %s", user.name);
    console.log("\t_totalSupply %s, ub_accDecayPer1e12 %s, \
    \n\tub.sum_tokens %s, ub.pending_burn %s, \
    \n\t_balances[acc] %s, _balanceOf(acc) %s, \
    \n\t_pendingBurn(acc) %s, \
    \n\tUsers[acc].debtToPendingBurn %s, \
    \n\t_totalSupply-nonUserTokenSum-ub.sum_tokens === %s, \
    \n\t_balances[acc]-balanceOf(acc)-pendingBurn(acc) === %s".green,
    s.totalSupply, s.ub_accDecayPer1e12, 
    s.ub_sum_tokens, s.ub_pending_burn,
    s.account_balances, s.account_balanceOf,
    s.account_pending_burn,
    s.account_debtToPendingBurn,
    BigInt(s.totalSupply)-BigInt(s._nonUserSumTokens)-BigInt(s.ub_sum_tokens),
    BigInt(s.account_balances)-BigInt(s.account_balanceOf)-BigInt(s.account_pending_burn)
    );
}

// function getStatus(address account) external view returns (
//     uint totalSupply, uint ub_accDecayPer1e12, uint ub_sum_tokens, uint ub_pending_burn,
//     uint account_balances, uint account_debtToPendingBurn, uint account_balanceOf
// ) {
//     totalSupply = _totalSupply;
//     ub_accDecayPer1e12 = user_burn.accDecayPer1e12;
//     ub_sum_tokens = user_burn.sum_tokens;
//     ub_pending_burn = user_burn.pending_burn;
//     account_balances = _balances[account];
//     account_debtToPendingBurn = Users[account].debtToPendingBurn;
//     account_balanceOf = _balanceOf(account);
// }

async function mintTime(seconds) {
    let tm0 = (await ethers.provider.getBlock("latest")).timestamp;
    await network.provider.send("evm_increaseTime", [seconds]);
    console.log("\t%s seconds minted.", (await ethers.provider.getBlock("latest")).timestamp - tm0);
}

async function showConsistency() {
    let user_burn = await tgr.user_burn();
    // console.log("\n\tuser_burn: \n\tsum_tokens: %s, pending_burn: %s, \n\ttotalSupply()=_ts-pending_burn: %s", 
    // user_burn.sum_tokens, user_burn.pending_burn, await tgr.totalSupply());
    await tgr.checkForConsistency();
    console.log("\tConsistency test PASS!");
}

async function transfer(sender, recipient, amount) {
    let amountWei = ethToWei(amount);
    let balance = await tgr.balanceOf(sender.address);
    if (amountWei > balance) amountWei = balance;
    let symbol = await tgr.symbol();
    //console.log("\t%s is transferring %s %s TGR ...".yellow, sender.name, recipient.name, weiToEth(amountWei));
    console.log("\t%s is transferring to %s %s %s(s) ...".yellow, 
    sender.name == undefined ? "undefined" : sender.name,
    recipient.hasOwnProperty("name") ? (recipient.name == undefined ? "undefined" : recipient.name) : "NoName",
    amount, symbol);

    tx = tgr.connect(sender).transfer(recipient.address, amountWei );
    (await tx).wait();
    console.log("\tTransfer done".green);
}

async function transfer2(token_contract, sender, recipient, amount) {
    let amountWei = ethToWei(amount);
    let balance = await token_contract.balanceOf(sender.address);
    if (amountWei > balance) amountWei = balance;
    let symbol = await token_contract.symbol();
    //console.log("\t%s is transferring %s %s TGR ...".yellow, sender.name, recipient.name, weiToEth(amountWei));
    console.log("\t%s is transferring to %s %s %s(s) ...".yellow, 
    sender.name == undefined ? "undefined" : sender.name,
    recipient.hasOwnProperty("name") ? (recipient.name == undefined ? "undefined" : recipient.name) : "NoName",
    amount, symbol);

    tx = token_contract.connect(sender).transfer(recipient.address, amountWei );
    (await tx).wait();
    console.log("\tTransfer done".green);
}

async function mint(minter, to, amount) {
    let amountWei = ethToWei(amount);
    await console.log("\t%s is minting to %s ...".yellow, 
    minter.name == undefined ? "undefined" : minter.name,
    to.hasOwnProperty("name") ? (to.name == undefined ? "undefined" : to.name) : "NoName" );

    tx = tgr.connect(minter).mint(to.address, amountWei );
    (await tx).wait();

    await console.log("\tMint done".green);
}

async function burn(burner, from, amount) {
    let amountWei = ethToWei(amount);
    await console.log("\t%s is burning from %s ...".yellow, 
    burner.name == undefined ? "undefined" : burner.name,
    from.hasOwnProperty("name") ? (from.name == undefined ? "undefined" : from.name) : "NoName" );

    tx = tgr.connect(burner).burn(from.address, amountWei );
    (await tx).wait();

    await console.log("\tBurn done".green);
}

async function test_addLiquidity(tokenA, amountA, tokenB, amountB, caller, to, log) {
    let report = "";
    let pairToReturn;
    const symbolA = await tokenA.symbol();
    const symbolB = await tokenB.symbol();

    await console.log("\t%s is adding liquidity (%s %s, %s %s) to %s' account".yellow, caller.name, amountA, symbolA, amountB, symbolB, to.name);

    pair = await factory.getPair(tokenA.address, tokenB.address)

    const isNewPair = ( pair == zero_address ? true : false);
    let liquidityBalance0, reserveA0, reserveB0;
    if (!isNewPair) {
        let pairAddr = await factory.getPair(tokenA.address, tokenB.address);
        let pair = new ethers.Contract(pairAddr, XPairArtifacts.abi, caller);
        liquidityBalance0 = await pair.balanceOf(to.address);
        [reserveA0, reserveB0] = await pair.getReserves();
        if (tokenA.address != (await pair.token0())) {
            let temp = reserveA0;
            reserveA0 = reserveB0;
            reserveB0 = temp; 
        }
    } else {
        liquidityBalance0 = 0;
        reserveA0 = 0;
        reserveB0 = 0;
    }
    let tokenABalance0 = await tokenA.balanceOf(caller.address);
    if (tokenABalance0 < utils.parseEther(amountA.toString())) {
        amountA = tokenABalance0/1e18; // utils.formatEther(tokenABalance0);
    }
    // expect(tokenABalance0).to.be.gt(utils.parseEther(amountA.toString()));
    // console.log(
    //     `\tCaller %s's balance %s %s is well greater than %s %s`,
    //     caller.name, weiToEthEn(tokenABalance0), symbolA, amountA, symbolA);
    let tokenBBalance0;
    if (tokenB == wbnb) {
        // Ether
        tokenBBalance0 = await ethers.provider.getBalance(caller.address);
    } else {
        tokenBBalance0 = await tokenB.balanceOf(caller.address);
    }
    if (tokenBBalance0 < utils.parseEther(amountB.toString())) {
        amountB = tokenBBalance0/1e18; // utils.formatEther(tokenABalance0);
    }
    // expect(tokenBBalance0).to.be.gt(utils.parseEther(amountB.toString()));
    // console.log(`\tCaller %s's balance %s %s is well greater than %s %s`,
    //     caller.name, weiToEthEn(tokenBBalance0), symbolB, amountB, symbolB);
    tokenA = tokenA.connect(caller);
    await tokenA.approve(maker.address, utils.parseEther((amountA * 1.001).toString()));
    allowance = (await tokenA.allowance(caller.address, maker.address)).toString();
    expectEqual(allowance, utils.parseEther((amountA * 1.001).toString()));
    console.log(
      "\tCaller %s approved Maker %s to spend %s %s.",
      caller.name, uiAddr(maker.address), (amountA * 1.001), symbolA);
    if (tokenB != wbnb) {
      tokenB = tokenB.connect(caller);
      await tokenB.approve(maker.address, utils.parseEther((amountB * 1.001).toString()));
      allowance = (await tokenB.allowance(caller.address, maker.address)).toString();
      expectEqual(allowance, utils.parseEther((amountB * 1.001).toString()));
      console.log(
        "\tCaller %s approved Maker %s to spend %s %s.",
        caller.name, uiAddr(maker.address), (amountB * 1.001), symbolB);
    }
    // Get last block.
    let block = await ethers.provider.getBlock("latest");
    let bytecode = XPairArtifacts.bytecode;
    let lengthPairs = await factory.allPairsLength();
    let create2Address = getCreate2Address(factory.address, [tokenA.address, tokenB.address], bytecode);
    maker = maker.connect(caller);
    console.log("\t%s is calling addLiquidity to add (%s %s, %s %s) ...".green,
        caller.name, amountA, symbolA, amountB, symbolB);
    if (tokenB == wbnb) {
        tx = await maker.addLiquidityETH(
            tokenA.address, utils.parseEther(amountA.toString()),
            0, 0, to.address, block.timestamp + 1000, { value: utils.parseEther(amountB.toString()) }
        );
    } else {
      tx = await maker.addLiquidity(
          tokenA.address, tokenB.address, utils.parseEther(amountA.toString()),
          utils.parseEther(amountB.toString()), 0, 0, to.address, block.timestamp + 1000
      );
    }

    tx.wait();

    let token0, token1;
    [token0, token1] = tokenA.address < tokenB.address ? [tokenA.address, tokenB.address] : [tokenB.address, tokenA.address];

    if (isNewPair) {
        await expect(tx)
          .to.emit(factory, "PairCreated")
        //.withArgs(token0, token1, create2Address);
    }
    console.log("\taddLiquidity successful.");

    let tokenABalance1;
    if (tokenA == wbnb) {
        // Ether
        tokenABalance1 = await ethers.provider.getBalance(caller.address);
    } else {
        tokenABalance1 = await tokenA.balanceOf(caller.address);
    }

    let delta = Number(tokenABalance0) - Number(tokenABalance1);
    let tokenBBalance1;
    if (tokenB == wbnb) {
        // Ether
        tokenBBalance1 = await ethers.provider.getBalance(caller.address);
    } else {
        tokenBBalance1 = await tokenB.balanceOf(caller.address);
    }
    let liquidityBalance1, reserveA1, reserveB1;

    let pairAddr = await factory.getPair(tokenA.address, tokenB.address);
    pairToReturn = new ethers.Contract(pairAddr, XPairArtifacts.abi, caller);

    liquidityBalance1 = await pairToReturn.balanceOf(to.address);
    [reserveA1, reserveB1] = await pairToReturn.getReserves();
    if (tokenA.address != (await pairToReturn.token0())) {
        let temp = reserveA1;
        reserveA1 = reserveB1;
        reserveB1 = temp;
    }
    console.log(`\tPair %s gained %s %s`, uiAddr(pairAddr), weiToEthEn(reserveA1.sub(reserveA0)), symbolA);
    console.log(`\tPair %s gained %s %s`, uiAddr(pairAddr), weiToEthEn(reserveB1.sub(reserveB0)), symbolB);
    console.log(
        `\t%s gained %s SQRT(%s x %s)`,
        to.name,
        weiToEthEn(liquidityBalance1.sub(liquidityBalance0)),
        symbolA,
        symbolB
    );
    await expect(tx).to.emit(pairToReturn, "Mint");
    //.withArgs(caller.address, (reserveA1 - reserveA0), (reserveB1 - reserveB0));
    report = "Successful";
    return [pairToReturn, report];
}

async function test_removeLiquidity(tokenA, tokenB, liquidity, caller, to, log) {
    let report = "";
    const symbolA = await tokenA.symbol();
    const symbolB = await tokenB.symbol();

    console.log("\t%s is removing liquidity %s SQRT(%s x %s) to %s' account".yellow, caller.name, liquidity, symbolA, symbolB, to.name);

    const isNewPair = (await factory.getPair(tokenA.address, tokenB.address)) == zero_address ? true : false;
    let liquidityBalance0, reserveA0, reserveB0;
    if (!isNewPair) {
        let pairAddr = await factory.getPair(tokenA.address, tokenB.address);
        let pair = new ethers.Contract(pairAddr, XPairArtifacts.abi, caller);
        liquidityBalance0 = await pair.balanceOf(caller.address);
        [reserveA0, reserveB0] = await pair.getReserves();
        if (tokenA.address != (await pair.token0())) {
            let temp = reserveA0;
            reserveA0 = reserveB0;
            reserveB0 = temp;
        }
    }
    if (isNewPair) {
        console.log(`\tYou cannot remove liquidity from a non-existing pair.`);
    } else {
        let pairAddr = await factory.getPair(tokenA.address, tokenB.address);
        let pair = new ethers.Contract(pairAddr, XPairArtifacts.abi, caller);
        await pair.approve(maker.address, utils.parseEther(liquidity.toString()));
        // Get last block.
        let block = await ethers.provider.getBlock("latest");
        let bytecode = XPairArtifacts.bytecode;
        maker = maker.connect(caller);
        console.log("\t%s is calling removeLiquidityETH to subtract %s SQRT(%s x %s) ...".green,
          caller.name, liquidity, symbolA, symbolB);
        if (tokenB == wbnb) {
            tx = await maker.removeLiquidityETH(
                tokenA.address,
                utils.parseEther(liquidity.toString()),
                0,
                0,
                to.address,
                block.timestamp + 1000
            );
        } else {
            tx = await maker.removeLiquidity(
                tokenA.address,
                tokenB.address,
                utils.parseEther(liquidity.toString()),
                0,
                0,
                to.address,
                block.timestamp + 1000
            );
        }
        tx.wait();

        let liquidityBalance1, reserveA1, reserveB1;
        liquidityBalance1 = await pair.balanceOf(caller.address);
        [reserveA1, reserveB1] = await pair.getReserves();
        if (tokenA.address != (await pair.token0())) {
            let temp = reserveA1;
            reserveA1 = reserveB1;
            reserveB1 = temp;
        }
        console.log(`\tPair %s lost %s %s`, uiAddr(pairAddr), weiToEthEn(reserveA0 - reserveA1), symbolA);
        console.log(`\tPair %s lost %s %s`, uiAddr(pairAddr), weiToEthEn(reserveB0 - reserveB1), symbolB);
        console.log(
          `\t%s lost %s SQRT(%s x %s)`,
          caller.name,
          weiToEthEn(liquidityBalance0 - liquidityBalance1),
          symbolA,
          symbolB
        );
    }
    report = "Successful";
    return report;
}

const NodeTypes = ["Token", "Center", "Maker", "Taker", "Factory"]; // DO not change the order.

async function test_swap(tokenA, amountA, tokenB, amountB, caller, to, log) {
    let report = "", computedAmount;
    const symbolA = await tokenA.symbol();
    const symbolB = await tokenB.symbol();

    if (amountA != undefined) {
        console.log("\t%s is swaping %s %s for undefined %s, for %s".yellow, caller.name, amountA, symbolA, symbolB, to.name);
    } else if (amountB != undefined) {
        console.log("\t%s is swaping undefined %s for %s %s , for %s".yellow, caller.name, symbolA, amountB, symbolB, to.name);
    } else {
        console.log("\t%s is swaping, with wrong parameters".yellow);
    }

    let totalLiquidity0, reserveA0, reserveB0;
    const isNewPair = (await factory.getPair(tokenA.address, tokenB.address)) == zero_address ? true : false;
    if (!isNewPair) {
        let pairAddr = await factory.getPair(tokenA.address, tokenB.address);
        let pair = new ethers.Contract(pairAddr, XPairArtifacts.abi, caller);
        totalLiquidity0 = await pair.totalSupply();
        [reserveA0, reserveB0] = await pair.getReserves();
        if (tokenA.address != (await pair.token0())) {
            let temp = reserveA0;
            reserveA0 = reserveB0;
            reserveB0 = temp;
        }
    }

    if (isNewPair) {
        console.log("\tYou cannot swap on a non-existing pair.");
    } else {
        let pairAddr = await factory.getPair(tokenA.address, tokenB.address);
        let pair = new ethers.Contract(pairAddr, XPairArtifacts.abi, caller);
        // Get last block.
        let block = await ethers.provider.getBlock("latest");

        console.log("\t%s is calling swap(.)...".green, caller.name);
        taker = taker.connect(caller);       
        if (tokenA == wbnb) {
            assert(tokenB != wbnb);
            if (amountA != undefined) {
                assert(amountB == undefined);
                await taker.swapExactETHForTokens(0, [tokenA.address, tokenB.address], to.address, block.timestamp + 100, { value: utils.parseEther(amountA.toString()) });
                //await taker.swapExactETHForTokensSupportingFeeOnTransferTokens(0, [tokenA.address, tokenB.address], to.address, block.timestamp + 100, { value: utils.parseEther(amountA.toString()) });
            } else {
                assert(amountB != undefined);
                let balanceEth = await ethers.provider.getBalance(caller.address);
                await taker.swapETHForExactTokens(utils.parseEther(amountB.toString()), [tokenA.address, tokenB.address], to.address, block.timestamp + 100, { value: BigInt(balanceEth/2) });
            }
        } else {
            tokenA = tokenA.connect(caller);

            if (tokenB == wbnb) {
                if (amountA != undefined) {
                    assert(amountB == undefined);
                    await tokenA.approve(taker.address, utils.parseEther(amountA.toString()));
                    await taker.swapExactTokensForETHSupportingFeeOnTransferTokens(utils.parseEther(amountA.toString()), 0, [tokenA.address, tokenB.address], to.address, block.timestamp + 100);
                } else {
                    assert(amountB != undefined);
                    let approval = 100000000000000000000; // large enough?
                    await tokenA.approve(taker.address, utils.parseEther(approval.toString()));         
                    await taker.swapTokensForExactETH(utils.parseEther(amountB.toString()), utils.parseEther(approval.toString()), [tokenA.address, tokenB.address], to.address, block.timestamp + 100);
                    await tokenA.approve(taker.address, utils.parseEther((0).toString()));
                }

            } else {
                if (amountA != undefined) {
                    assert(amountB == undefined);
                    await tokenA.approve(taker.address, utils.parseEther(amountA.toString()));
                    await taker.swapExactTokensForTokensSupportingFeeOnTransferTokens(utils.parseEther(amountA.toString()), 0, [tokenA.address, tokenB.address], to.address, block.timestamp + 100);
                } else {
                    assert(amountB != undefined);
                    let approval = 100000000000000000000; // large enough?
                    await tokenA.approve(taker.address, utils.parseEther(approval.toString()));
                    await taker.swapTokensForExactTokens(utils.parseEther(amountB.toString()), utils.parseEther(approval.toString()), [tokenA.address, tokenB.address], to.address, block.timestamp + 100);
                    await tokenA.approve(taker.address, utils.parseEther((0).toString()));
                }
            }
        }

        let totalLiquidity1, reserveA1, reserveB1;
        totalLiquidity1 = await pair.totalSupply();
        [reserveA1, reserveB1] = await pair.getReserves();
        if (tokenA.address != (await pair.token0())) {
            let temp = reserveA1;
            reserveA1 = reserveB1;
            reserveB1 = temp;
        }
        console.log(`\tPair %s gained %s %s from %s`, uiAddr(pairAddr), weiToEthEn(reserveA1 - reserveA0), symbolA, caller.name);
        console.log(`\tPair %s lost %s %s to %s`, uiAddr(pairAddr), weiToEthEn(reserveB0 - reserveB1), symbolB, to.name);

        // Check caller's and to.address's balance changes.

        if (totalLiquidity0 <= totalLiquidity1) {
            console.log(`\tPair %s gained %s SQRT(%s x %s)`, uiAddr(pairAddr), weiToEthEn(totalLiquidity1 - totalLiquidity0), symbolA, symbolB);
        } else {
            console.log(`\tPair %s lost %s SQRT(%s x %s)`, uiAddr(pairAddr), weiToEthEn(totalLiquidity0 - totalLiquidity1), symbolA, symbolB);
        }

        if (amountA == undefined) {
            computedAmount = weiToEth(reserveA1 - reserveA0); // Note this conversion degrades precision significantly.
        } else if (amountB == undefined) {
            computedAmount = weiToEth(reserveB0 - reserveB1); // Note this conversion degrades precision significantly.
        } else {
            computedAmount = weiToEth(0); // not sure.
        }
    }

    report = "Successful";
    return [report, computedAmount];
}


describe("====================== Stage 1: Deploy ======================\n".yellow, async function () {
    it("1.1 Main contracts are deployed.\n".green, async function () {
        // For the sake of transfer test, the pools tgrFtm, tgrHtz and votes are wallet accounts.
        // This way we can simulate a transfer from/to/between those pools.

        [owner, alice, bob, carol, votes] = await ethers.getSigners();
        owner.name = "Owner"; alice.name = "Alice"; bob.name = "Bob"; carol.name = "Carol"; votes.name = "Votes";

        console.log("\tOwner address: ".cyan, owner.address);
        console.log("\tAlice address: ".cyan, alice.address);
        console.log("\tBob address: ".cyan, bob.address);
        console.log("\tCarol address: ".cyan, carol.address);
        console.log("\tVotes address: ".cyan, votes.address);

        wireLib = await deployWireLibrary(owner);
        console.log("\tWireLibrary deployed at: %s", wireLib.address);

        const AnalyticMath = await ethers.getContractFactory("AnalyticMath", owner);
        analyticMath = await AnalyticMath.deploy();
        await analyticMath.init();
        console.log("\tAnalyticMath contract was deployed at: ", analyticMath.address);

        tgr = await deployTGR(owner, analyticMath.address, wireLib.address);
        console.log("\tTGR contract deployed at: %s", tgr.address);
        console.log("\tOwner's balance: %s", await tgr.balanceOf(owner.address));

        // Factory Deployment.
        factory = await deployFactory(owner, wireLib.address);
        console.log("\tFactory deployed at %s", factory.address);

        console.log("\tXFactory contract was deployed at: %s", factory.address);
        console.log("\t!!! Pair's bytecode hash = \n\t", (await factory.INIT_CODE_PAIR_HASH()).substring(2));
        console.log("\t!!! Please make sure the pairFor(...) function of XLibrary.sol file has the same hash.\n\n");

        // WBNB Deployment.
        wbnb = await deployWBNB(owner);
        console.log("\tWBNB deployed at: %s", wbnb.address);

        center = await deployCenter(owner, wireLib.address);
        center.address = center.address;
        console.log("\tControlCenter deployed at %s", center.address);

        crossLib = await deployXLibrary(owner);
        console.log("\tXLibrary deployed at %s", crossLib.address);

        // // RouterLibrary Deployment for Maker and Taker.
        // routerLib = await deployRouterLibrary(owner);
        // console.log("\tRouterLibrary deployed at %s", routerLib.address);

        // Maker Deployment.
        maker = await deployMaker(owner, wbnb.address, wireLib.address);
        console.log("\tMaker deployed at %s", maker.address);

        // Taker Deployment.
        taker = await deployTaker(owner, wbnb.address, wireLib.address);
        console.log("\tTaker deployed at %s", taker.address);

        // Referral Deployment.
        referral = await deployReferral(owner);
        console.log("\tReferral deployed at %s", referral.address);

        // // FarmLibrary Deployment for Farm.
        // farmLib = await deployFarmLibrary(owner);
        // consoleLogWithTab(`FarmLibrary deployed at: ${farmLib.address}`);

        // // Farm Deployment.
        // const startBlock = (await ethers.provider.getBlock("latest")).number + 10;
        // farm = await deployFarm(owner, tgr.address, ethToWei(crssPerBlock), startBlock, wireLib.address, farmLib.address);
        // consoleLogWithTab(`Farm deployed at: ${farm.address}`);

        // // XCRSS Deployment.
        // xTgr = await deployXTgr(owner, "Crosswise xCrss Token", "xCRSS", wireLib.address);
        // consoleLogWithTab(`XCRSS deployed at: ${xCrss.address}`);

        // Mock Token Deployment.
        mock = await deployMockToken(owner, "Mock", "MCK");
        console.log("\tmock deployed at %s", mock.address);
       
        // Mock Token Deployment.
        mock2 = await deployMockToken(owner, "Mock2", "MCK2");
        console.log("\tmock2 deployed at %s", mock2.address);

        await showConsistency();

    });

    it("1.2 TGR token name, symbol and decimals were checked.\n".green, async function () {
      const name = await tgr.name();
      console.log("\tTGR token's name: %s", name);
      expectEqual(name, "TGR Token");

      const symbol = await tgr.symbol();
      console.log("\tTGR symbol: %s", symbol);
      expectEqual(symbol, "TGR");

      const decimals = await tgr.decimals();
      console.log("\tTGR decimals: %s", decimals);
      expectEqual(decimals, 18);

      await showConsistency();
    });

    it("1.3 Total supply and owner balance of TGR are checked.\n".green, async function () {
      const totalSupply = await tgr.totalSupply();
      console.log("\tTGR total supply: %s",weiToEthEn(totalSupply));
      expectEqual(weiToEth(totalSupply), INITIAL_SUPPLY);

      console.log("\tTotal supply amount was minted to owner.");
      const ownerTgrBalance = await tgr.balanceOf(owner.address);
      console.log("\tTGR owner balance: %s", weiToEthEn(ownerTgrBalance));
      expectEqual(weiToEth(ownerTgrBalance), INITIAL_SUPPLY);

      await showConsistency();
    });

    it("1.4 Allowance control functions were checked.\n".green, async function () {
      console.log("Owner approves Alice to spend 1000 Crss");
      await tgr.connect(owner).approve(alice.address, ethToWei(1000));

      let allowanceOwnerAlice = await tgr.allowance(owner.address, alice.address);
      console.log("\tallowance[owner][alice]: %s", weiToEthEn(allowanceOwnerAlice));
      expectEqual(weiToEth(allowanceOwnerAlice), 1000);

      console.log("\tIncrease it by 1000.");
      await tgr.connect(owner).increaseAllowance(alice.address, ethToWei(1000));
      allowanceOwnerAlice = await tgr.allowance(owner.address, alice.address);
      console.log("\tallowance[owner][alice]: %s", weiToEthEn(allowanceOwnerAlice));
      expectEqual(weiToEth(allowanceOwnerAlice), 2000);

      console.log("\tDecrease it by 1000.");
      await tgr.connect(owner).decreaseAllowance(alice.address, ethToWei(1000));
      allowanceOwnerAlice = await tgr.allowance(owner.address, alice.address);
      console.log("\tallowance[owner][alice]: %s", weiToEthEn(allowanceOwnerAlice));
      expectEqual(weiToEth(allowanceOwnerAlice), 1000);

      await showConsistency();
    });

    it("1.5 1e6 Mock(MCK) tokens were minted to owner.\n".green, async function () {
      let mockOwnerBalance = await mock.balanceOf(owner.address);
      console.log("\tOwner's mock token balance: %s", weiToEthEn(mockOwnerBalance));
      console.log("\tMint 1e6 MCK tokens to owner.");
      await mock.connect(owner).mint(owner.address, ethToWei(1e6));
      mockOwnerBalance = await mock.balanceOf(owner.address);
      console.log("\tOwner's mock token balance after mint: %s", weiToEthEn(mockOwnerBalance));

      await showConsistency();
    });

    it("1.6 1e6 Mock2(MCK2) tokens were minted to owner.\n".green, async function () {
      let mockOwnerBalance = await mock2.balanceOf(owner.address);
      console.log("\tOwner's mock2 token balance: %s", weiToEthEn(mockOwnerBalance));
      console.log("\tMint 1e6 MCK2 tokens to owner.");
      await mock2.connect(owner).mint(owner.address, ethToWei(1e6));
      mockOwnerBalance = await mock2.balanceOf(owner.address);
      console.log("\tOwner's mock2 token balance after mint: %s", weiToEthEn(mockOwnerBalance));

      await showConsistency();
    });

    it("1.7 Setup the chain of nodes.\n".green, async function () {
      await setupNodeChain();
      await showConsistency();
    });
});


describe("====================== Stage 2: Test pulses ======================\n".yellow, async function () {

  it("2.1 Test Pulses.\n".green, async function () {
    await showConsistency();

    blocks = 50 // Test pulse cycles are less than 5.
    mintburn = 100

    for(i=0; i<1; i++) {
        await showMilestone("Milestone 0");
        await mintBlocks(blocks);
        await pulse_user_burn();
        await showConsistency();

        await showMilestone("Milestone 1");
        await showStatus(owner);
        await showStatus(alice);
        await transfer(owner, alice, 0);
        await showStatus(owner);
        await showStatus(alice);

        await showMilestone("Milestone 2");
        await showStatus(owner);
        await showStatus(alice);
        await mint(owner, alice, mintburn);
        await showStatus(owner);
        await showStatus(alice);

        await showMilestone("Milestone 3");
        await showStatus(owner);
        await showStatus(alice);
        await burn(owner, alice, mintburn);
        await showStatus(owner);
        await showStatus(alice);

        await showMilestone("Milestone 4");
        await showConsistency();
        await mintBlocks(blocks);
        await showConsistency();
        await pulse_user_burn();
        await showConsistency();

        await showMilestone("Milestone 5");
        await showStatus(owner);
        await showStatus(bob);
        await mint(owner, bob, mintburn);
        await showStatus(owner);
        await showStatus(bob);

        await showMilestone("Milestone 6");
        await burn(owner, bob, mintburn);
        await transfer(owner, bob, 1000);
        await showConsistency();
        await mintBlocks(blocks);
        await showConsistency();
        await pulse_user_burn();
        await showConsistency();    // outputs a non-zero error

        await showMilestone("Milestone 7");
        await showConsistency();
        await mint(owner, carol, mintburn);
        await showConsistency();
        await burn(owner, carol, mintburn);
        await showConsistency();
        await transfer(owner, carol, 5000);
        await mintBlocks(blocks);
        await showConsistency();
        await pulse_user_burn();
        await showConsistency();

        await showMilestone("Milestone 8");
        await mint(owner, alice, mintburn);
        await burn(owner, alice, mintburn);
        await mintBlocks(blocks);
        await pulse_user_burn();
        await showConsistency();

        await showMilestone("Milestone 9");
        await mint(owner, alice, mintburn);
        await burn(owner, alice, mintburn);
        await transfer(owner, carol, 100);
        await mintBlocks(blocks);
        await pulse_user_burn();
        await showConsistency();

        await showMilestone("Milestone 10");
        await mint(owner, bob, mintburn);
        await burn(owner, bob, mintburn);
        await transfer(carol, carol, 100);
        await mintBlocks(blocks);
        await pulse_user_burn();
        await showConsistency();

        await showMilestone("Milestone 11");
        await mint(owner, alice, mintburn);
        await burn(owner, alice, mintburn);
        await transfer(carol, alice, 100);
        await mintBlocks(blocks);
        await pulse_user_burn();
        await showConsistency();
    }

});


});


describe("====================== Stage 3: Test Dex ======================\n".yellow,
  async function () {

    it("3.1 Initial values were checked.\n".green, async function () {
        let feeTo = await factory.feeTo();
        expectEqual(feeTo, zero_address);
        console.log("\tInitial feeTo value is zero address.");
    
        let pairsLength = await factory.allPairsLength();
        expectEqual(pairsLength, 0);
        console.log("\tThere, initially, are no pairs created.");
    
        let factoryOwner = await factory.getOwner();
        console.log("\tOwner is deployer.");
        expectEqual(factoryOwner, owner.address);
        console.log("\tOwner address: %s", factoryOwner.address);

        await showConsistency();
    });

    it("3.2 setFeeTo function was checked.\n".green, async function () {
        let tx = factory.connect(alice).setFeeTo(bob.address);
        await expectRevertedWith(tx, "Caller != owner");
        console.log("\tAlice, a non-owner, setting feeTo to Bob reverted with <Caller != owner>");
    
        tx = factory.setFeeTo(owner.address);
        await expectNotReverted(tx);
        console.log("\tThe current owner could set feeTo to Bob.");

        await showConsistency();
    });  

    // --------------------------------- Liquidity -------------------------------

    it("3.3 Add liquidity and remove liquidity were checked.\n".green, async function () {
        //======================================== Tokenomic parameters =======================================
        let initialTgrPrice = 1;
        let initialTgrBnbValue = 1400000;
        let initialTgrMckValue = 1400000;
        let bnbPrice = 500, mckPrice = 1;

        console.log("\t==========================================================================================================".yellow);
        console.log("\tAssuming the following tokenomics parameters:".yellow);
        console.log("\tTgr/USD price initially targeted: %s".cyan.bold, initialTgrPrice);
        console.log("\tTgr/Bnb pool's assets value in USD, initially targeted: %s".cyan.bold, initialTgrBnbValue);
        console.log("\tTgr/Mck pool's assets value in USD, initially targeted: %s".cyan.bold, initialTgrMckValue);
        console.log("\tBnb/USD price at the time of Tgr/Bnb pool deployment: %s".cyan.bold, bnbPrice);
        console.log("\tMck/USD price at the time of Tgr/Mck pool deployment: %s".cyan.bold, mckPrice);
        console.log("\t==========================================================================================================".yellow);

        await mintBlocks(50);
        await pulse_user_burn();
        await showConsistency();

        await transfer(owner, alice, 1);
        await transfer2(mock2, owner, alice, 1);
        await mintBlocks(50);
        await pulse_user_burn();
        await showConsistency();

        let poolValue = initialTgrBnbValue;
        let tgrAmount = poolValue / 2 / initialTgrPrice;
        let bnbAmount = poolValue / 2 / bnbPrice;
        [tgr_bnb, report] = await test_addLiquidity(tgr, tgrAmount / 3, wbnb, bnbAmount / 3, owner, alice, true);

        await mintBlocks(50);
        await pulse_user_burn();
        await showConsistency();

        [tgr_bnb, report] = await test_addLiquidity(tgr, tgrAmount / 3, wbnb, bnbAmount / 3, owner, bob, true);
        await mintBlocks(50);
        await pulse_user_burn();
        await showConsistency();

        [tgr_bnb, report] = await test_addLiquidity(tgr, tgrAmount / 3, wbnb, bnbAmount / 3, owner, carol, true);
        await mintBlocks(50);
        await pulse_user_burn();
        await showConsistency();    //-----------------------------

        [mck_bnb, report] = await test_addLiquidity(mock, tgrAmount / 3, wbnb, bnbAmount / 3, owner, carol, true); // ------------ mck_bnb
        await mintBlocks(50);

        // [report, tgrAmount] = await test_swap(wbnb, 1, tgr, undefined, alice, bob, true);
        // await mintBlocks(50);
        // await pulse_user_burn();
        // await showConsistency();

        // [report, bnbAmount] = await test_swap(tgr, tgrAmount * 0.99, wbnb, undefined, bob, alice, true);
        // await mintBlocks(50);
        // await pulse_user_burn();
        // await showConsistency();

        // ------------------------ This doesn't work for TGR contract which collect fees.        
        // [report, tgrAmount] = await test_swap(tgr, undefined, wbnb, bnbAmount * 0.99, alice, bob, true); //----------------------------
        // await mintBlocks(50);
        // await pulse_user_burn();
        // await showConsistency();

        // let liquidityAmount = 0.001;
        // report = await test_removeLiquidity(tgr, wbnb, liquidityAmount, alice, alice, true);
        // await mintBlocks(50);
        // await pulse_user_burn();
        // await showConsistency();
        // console.log("\n\t9");

        // poolValue = initialTgrMckValue;
        // tgrAmount = poolValue / 10 / initialTgrPrice;
        // let mckAmount = poolValue / 10 / mckPrice;
        // [tgr_mck, report] = await test_addLiquidity(tgr, tgrAmount, mock, mckAmount, owner, alice, true);

        // await mintBlocks(50);
        // await pulse_user_burn();
        // await showConsistency();
        // console.log("\n\t10");

        // [tgr_mck, report] = await test_addLiquidity(tgr, tgrAmount, mock, mckAmount, owner, bob, true);
        
        // await mintBlocks(50);
        // await pulse_user_burn();
        // await showConsistency();
        // console.log("\n\t11");

        // [tgr_mck, report] = await test_addLiquidity(tgr, tgrAmount, mock, mckAmount, owner, carol, true);
        // console.log("\n\t12");

        // await mintBlocks(50);
        // await pulse_user_burn();
        // await showConsistency();
        // console.log("\n\t13");

        // [tgr_mck2, report] = await test_addLiquidity(tgr, tgrAmount, mock2, mckAmount, owner, alice, true); // ===========
        // await mintBlocks(50);
        // await pulse_user_burn();
        // await showConsistency();
        // console.log("\n\t14");

        // [tgr_mck2, report] = await test_addLiquidity(tgr, tgrAmount, mock2, mckAmount, owner, bob, true);
        // await mintBlocks(50);
        // await pulse_user_burn();
        // await showConsistency();
        // console.log("\n\t15");

        // [tgr_mck2, report] = await test_addLiquidity(tgr, tgrAmount, mock2, mckAmount, owner, carol, true);
        // await mintBlocks(50);
        // await pulse_user_burn();
        // await showConsistency();
        // console.log("\n\t16");

        // let balances = await tgr_mck2.connect(owner).getReserves();
        // [report, tgrAmount] = await test_swap(mock2, undefined, tgr, 100, alice, bob, true); //----------------------------------
        // await mintBlocks(50);
        // await pulse_user_burn();
        // await showConsistency();
        // console.log("\n\t17");

        // console.log("\n\tOwner transferring to alice... 15000 Tgr");
        // await tgr.connect(owner).transfer(alice.address, ethToWei(15000));
        // await mintBlocks(50);
        // await pulse_user_burn();
        // await showConsistency();
        // console.log("\n\t18");

        // [report, mockAmount] = await test_swap(tgr, 10, mock, undefined, alice, alice, true);
        // await mintBlocks(50);
        // await pulse_user_burn();
        // await showConsistency();
        // console.log("\n\t19");

        // [report, tgrAmount] = await test_swap(mock, mockAmount * 0.99, tgr, undefined, alice, bob, true);
        // await mintBlocks(50);
        // await pulse_user_burn();
        // await showConsistency();
        // console.log("\n\t20");

        // liquidityAmount = 0.001;
        // report = await test_removeLiquidity(tgr, mock, liquidityAmount, alice, alice, true);
        // await mintBlocks(50);
        // await pulse_user_burn();
        // await showConsistency();
        // console.log("\n\t21");

        // console.log("\n\tOwner transferring to alice... 15000 Trg");
        // await tgr.connect(owner).transfer(alice.address, ethToWei(15000));
        // await mintBlocks(50);
        // await pulse_user_burn();
        // await showConsistency();
        // console.log("\n\t22");

        // [report, mockAmount] = await test_swap(tgr, 10, mock2, undefined, alice, alice, true);
        // await mintBlocks(50);
        // await pulse_user_burn();
        // await showConsistency();
        // console.log("\n\t23");

        // [report, tgrAmount] = await test_swap(mock2, mockAmount * 0.99, tgr, undefined, alice, bob, true);
        // await mintBlocks(50);
        // await pulse_user_burn();
        // await showConsistency();
        // console.log("\n\t24");

        // liquidityAmount = 0.001;
        // report = await test_removeLiquidity(tgr, mock2, liquidityAmount, alice, alice, true);
        // await mintBlocks(50);
        // await pulse_user_burn();
        // await showConsistency();
        // console.log("\n\t25");

    });

    it ("3.4 Test Pulses, extended.\n".green, async function () {
        await showConsistency();

        await mintBlocks(50);
        await pulse_user_burn();
        await showConsistency();

        await transfer(owner, alice, 10);
        await mintBlocks(5);
        await pulse_user_burn();
        await showConsistency();

        await transfer(owner, bob, 1000);
        await mintBlocks(50);
        await pulse_user_burn();
        await showConsistency();

        await transfer(owner, carol, 5000);
        await mintBlocks(50);
        await pulse_user_burn();
        await showConsistency();

        await transfer(owner, carol, 100);
        await mintBlocks(50);
        await pulse_user_burn();
        await showConsistency();

        await transfer(carol, carol, 100);
        await mintBlocks(50);
        await pulse_user_burn();
        await showConsistency();

        await transfer(carol, alice, 100);
        await mintBlocks(50);
        await pulse_user_burn();
        await showConsistency();

        // await transfer(owner, tgr_bnb, 100);
        // await mintBlocks(50);
        // await pulse_user_burn();
        // await showConsistency();

        // tgr_mck.name = "_tgrHtz";
        // console.log("tgr_mck", tgr_mck.address, tgr_mck.name);
        // await transfer(tgr_bnb, tgr_mck, 101);
        // await mintBlocks(50);
        // await pulse_user_burn();
        // await showConsistency();

        await transfer(owner, votes, 100);
        await mintBlocks(20);
        await pulse_user_burn();
        await showConsistency();

        // await tgr.pulse_lp_reward();

        await mintBlocks(5);
        await pulse_user_burn();
        await showConsistency();

    });

});
