const { ethers, waffle, network, upgrades } = require("hardhat");
const { expect, util } = require("chai");
const { utils, BigNumber } = require("ethers");
require("colors");

const {
    deployWireLibrary, deployDistTypeF,
    deployIntegralMathLibrary,
  } = require("./utils");
    const { assert } = require("console");
    const { yellow, cyan } = require("colors");
    const { zeroAddress } = require("ethereumjs-util");
    const { doesNotMatch } = require("assert");
    const zero_address = "0x0000000000000000000000000000000000000000";
    
    let integralMathLib, distTypeA, distTypeB, distTypeC, distTypeD, distTypeE, distTypeF;
    let owner, alice, bob, carol, votes;
    let tx;
    
    // These constants come from IConstants.sol.
    const FeeMagnifierPower = 5;
    const RateMagnifier = 10 ** FeeMagnifierPower;
    const SqaureMagnifier = RateMagnifier * RateMagnifier;
    const LiquiditySafety = 10**3;
    const DECIMALS = 18;
    const INITIAL_SUPPLY = 10**(DECIMALS+6);
    const MAX_SUPPLY = 10**(DECIMALS+8)

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


async function showMilestone(text) {
    console.log("\t%s".blue, text);
}

async function Pow(analyticMath, a, b, c, d) {
    console.log("\tcalling analyticMath.pow with \n\t%s, \n\t%s, \n\t%s, \n\t%s...".yellow, a, b, c, d);
    const pq = await analyticMath.pow(a, b, c, d);
    console.log(BigInt(pq[0]), BigInt(pq[1]), BigInt(pq[0])/BigInt(pq[1]));
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


async function showTotalState() {
    const s = await distTypeF.getTotalState();
    console.log("\tTotal:".yellow.bold);
    console.log("\ttotalSupply %s, latestBlock %s", s.totalSupply, s._latestBlock);
    console.log("\trewardPool %s, totalPending %s", s._rewordPool, s._totalPendingReward);
    console.log("\taccRewardPerShare12 %s", s._accRewardPerShare12);
}

async function showUserState(user) {
    const s = await distTypeF.getUserState(user.address);
    console.log("\tUser %s:".yellow, user.name);
    console.log("\tshare %s, reward %s", s._share, s._reward);
    console.log("\trewardDebt %s, userPending %s", s._rewardDebt, s._userPendingReward);
}

async function mintTime(seconds) {
    let tm0 = (await ethers.provider.getBlock("latest")).timestamp;
    await network.provider.send("evm_increaseTime", [seconds]);
    console.log("\t%s seconds minted.", (await ethers.provider.getBlock("latest")).timestamp - tm0);
}

async function checkConsistency() {
    report = await distTypeF.checkForConsistency();
    console.log("\tConsistency report:".bold.yellow);
    console.log("\tpending_collective %s, pending_marginal %s",
    report.pending_collective, report.pending_marginal)
    console.log("\tabs_error %s, error_rate (trillionths) === %s",
    report.abs_error, report.error_rate)
}

async function transfer(sender, recipient, amount) {
    let amountWei = ethToWei(amount);
    let balance = await distTypeF.balanceOf(sender.address);
    if (amountWei > balance) {
        amountWei = balance;
        amount = weiToEth(amountWei);
    }
    let symbol = await distTypeF.symbol();
    //console.log("\t%s is transferring %s %s TY_F ...".yellow, sender.name, recipient.name, weiToEth(amountWei));
    console.log("\t%s is transferring %s TY_F to %s...".yellow, 
    sender.name == undefined ? "undefined" : sender.name,
    amount,
    recipient.hasOwnProperty("name") ? (recipient.name == undefined ? "undefined" : recipient.name) : "NoName");

    tx = distTypeF.connect(sender).transfer(recipient.address, amountWei );
    (await tx).wait();
    console.log("\tTransfer done".green);
}

async function mint(minter, to, amount) {
    let amountWei = ethToWei(amount);
    await console.log("\t%s is minting %s TY_F to %s ...".yellow, 
    minter.name == undefined ? "undefined" : minter.name,
    amount,
    to.hasOwnProperty("name") ? (to.name == undefined ? "undefined" : to.name) : "NoName" );

    tx = distTypeF.connect(minter).mint(to.address, amountWei );
    (await tx).wait();

    await console.log("\tMint done".green);
}

async function burn(burner, from, amount) {

    let amountWei = ethToWei(amount);
    let balance = await distTypeF.balanceOf(from.address);
    // if (amountWei > balance) {
    //     console.log("amount %s reduced", amount, BigInt(balance), BigInt(amountWei));
    //     amountWei = balance;
    //     amount = weiToEth(amountWei);
    // }
    await console.log("\t%s is burning %s TY_F from %s ...".yellow, 
    burner.name == undefined ? "undefined" : burner.name,
    amount,
    from.hasOwnProperty("name") ? (from.name == undefined ? "undefined" : from.name) : "NoName" );

    tx = distTypeF.connect(burner).burn(from.address, amountWei );
    (await tx).wait();

    await console.log("\tBurn done".green);
}



let analyticMath;

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

        const AnalyticMath = await ethers.getContractFactory("AnalyticMath", owner);
        analyticMath = await AnalyticMath.deploy();
        await analyticMath.init();
        console.log("\tAnalyticMath contract was deployed at: ", analyticMath.address);


        distTypeF = await deployDistTypeF(owner, analyticMath.address);
        console.log("\tDistTypeF contract deployed at: %s", distTypeF.address);
        console.log("\tOwner's balance: %s", await distTypeF.balanceOf(owner.address));
        await showTotalState()
        await showUserState(owner);
        await showUserState(alice);
        await showUserState(bob);
        await showUserState(carol);
        await checkConsistency();


        integralMathLib = await deployIntegralMathLibrary(owner);
        console.log("\tIntegralMath deployed at %s", integralMathLib.address);

        await showTotalState()
        await showUserState(owner);
        await showUserState(alice);
        await showUserState(bob);
        await showUserState(carol);
        await checkConsistency();
    });

    it("1.2 DistTyepA token name, symbol and decimals were checked.\n".green, async function () {
      const name = await distTypeF.name();
      console.log("\tDistTypeF token's name: %s", name);
      expectEqual(name, "DistTypeF");

      const symbol = await distTypeF.symbol();
      console.log("\tDistTypeF symbol: %s", symbol);
      expectEqual(symbol, "TY_F");

      const decimals = await distTypeF.decimals();
      console.log("\tDistTypeF decimals: %s", decimals);
      expectEqual(decimals, 18);

 
      await checkConsistency();
    });

    it("1.3 Total supply and owner balance of TY_F are checked.\n".green, async function () {
      const totalSupply = await distTypeF.totalSupply();
      console.log("\tDistTypeF total supply: %s gways",BigInt(totalSupply));
      expectEqual(weiToEth(totalSupply), weiToEth(INITIAL_SUPPLY));

      console.log("\tTotal supply amount was minted to owner.");
      const ownerTgrBalance = await distTypeF.balanceOf(owner.address);
      console.log("\tDistTypeF owner balance: %s gways", BigInt(ownerTgrBalance));
      expectEqual(weiToEth(ownerTgrBalance), weiToEth(INITIAL_SUPPLY));

      await checkConsistency();
    });

    it("1.4 Allowance control functions were checked.\n".green, async function () {
      console.log("Owner approves Alice to spend 1000 TY_F");
      await distTypeF.connect(owner).approve(alice.address, ethToWei(1000));

      let allowanceOwnerAlice = await distTypeF.allowance(owner.address, alice.address);
      console.log("\tallowance[owner][alice]: %s", weiToEthEn(allowanceOwnerAlice));
      expectEqual(weiToEth(allowanceOwnerAlice), 1000);

      console.log("\tIncrease it by 1000.");
      await distTypeF.connect(owner).increaseAllowance(alice.address, ethToWei(1000));
      allowanceOwnerAlice = await distTypeF.allowance(owner.address, alice.address);
      console.log("\tallowance[owner][alice]: %s", weiToEthEn(allowanceOwnerAlice));
      expectEqual(weiToEth(allowanceOwnerAlice), 2000);

      console.log("\tDecrease it by 1000.");
      await distTypeF.connect(owner).decreaseAllowance(alice.address, ethToWei(1000));
      allowanceOwnerAlice = await distTypeF.allowance(owner.address, alice.address);
      console.log("\tallowance[owner][alice]: %s", weiToEthEn(allowanceOwnerAlice));
      expectEqual(weiToEth(allowanceOwnerAlice), 1000);

      await checkConsistency();
    });

});


describe("====================== Stage 2: Test pulses ======================\n".yellow, async function () {

  it("2.1 Test Pulses.\n".green, async function () {
    await checkConsistency();

    blocks = 60 // twice the cycle
    mintAmount = 1000
    burnAmount = 700

    for(i=0; i<1; i++) {
        await showMilestone("Milestone 0");

        await showTotalState()
        await showUserState(owner);
        await showUserState(alice);
        await showUserState(bob);
        await showUserState(carol);
        await checkConsistency();

        await showMilestone("Milestone 0.0");
        await mintBlocks(blocks);
        await mint(owner, bob, mintAmount);
        await transfer(owner, alice, 10000);
        await mintBlocks(blocks);
        await showTotalState();
        await showUserState(owner);
        await showUserState(bob);
        await checkConsistency();

        await mintBlocks(blocks);
        await mint(owner, bob, mintAmount);
        await transfer(owner, carol, 10000);
        await transfer(carol, bob, 10000);
        await mintBlocks(blocks);
        await showTotalState();
        await showUserState(owner);
        await showUserState(bob);
        await checkConsistency();

        await mintBlocks(blocks);
        await mint(owner, bob, mintAmount);
        await transfer(owner, bob, 10000);
        await mintBlocks(blocks);
        await burn(owner, bob, 1000);
        await showTotalState();
        await showUserState(owner);
        await showUserState(bob);
        await checkConsistency();

        await showMilestone("Milestone 0.1");
        await mintBlocks(blocks);
        await mint(owner, bob, mintAmount);
        await transfer(owner, carol, 10000);
        await mintBlocks(blocks);
        await showTotalState();
        await showUserState(owner);
        await showUserState(bob);
        await checkConsistency();




        await mintBlocks(blocks);
        await mint(owner, bob, mintAmount);
        await mintBlocks(blocks);
        await showTotalState();
        await showUserState(owner);
        await showUserState(bob);
        await checkConsistency();;

        await showMilestone("Milestone 0.2");
        await mintBlocks(blocks);
        await mint(owner, owner, mintAmount);
        await mintBlocks(blocks);
        await burn(owner, alice, 1000);
        await showTotalState();
        await showUserState(owner);
        await checkConsistency();

        await showMilestone("Milestone 0.3");
        await mintBlocks(blocks);
        await mint(owner, owner, mintAmount);
        await mintBlocks(blocks);
        await showTotalState();
        await showUserState(owner);
        await checkConsistency();

        await showMilestone("Milestone 0.4");
        await mintBlocks(blocks);
        await mint(owner, owner, mintAmount);
        await mintBlocks(blocks);
        await showTotalState();
        await showUserState(owner);
        await checkConsistency();

        await showMilestone("Milestone 0.5");
        await mintBlocks(blocks);
        await mint(owner, owner, mintAmount);
        await mintBlocks(blocks);
        await showTotalState();
        await showUserState(owner);
        await checkConsistency();

        await showMilestone("Milestone 0.6");
        await mintBlocks(blocks);
        await mint(owner, owner, mintAmount);
        await mintBlocks(blocks);
        await showTotalState();
        await showUserState(owner);
        await checkConsistency();

        await showMilestone("Milestone 0.7");
        await mintBlocks(blocks);
        await mint(owner, owner, mintAmount);
        await mintBlocks(blocks);
        await showTotalState();
        await showUserState(owner);
        await checkConsistency();

        await showMilestone("Milestone 0.8");
        await mintBlocks(blocks);
        await mint(owner, owner, mintAmount);
        await mintBlocks(blocks);
        await showTotalState();
        await showUserState(owner);
        await checkConsistency();

        await showMilestone("Milestone 0.9");
        await mintBlocks(blocks);
        await mint(owner, owner, mintAmount);
        await mintBlocks(blocks);
        await showTotalState();
        await showUserState(owner);
        await checkConsistency();

        await showMilestone("Milestone 1");

    }

});


});

