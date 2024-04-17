
//=================== Paremeter Block that differentiate this testing script from others ======

let CONTRACT = null;
const CONTRACT_NAME = "SimpleExpRewardNovel";
const CONTRACT_SYMBOL = "SERWN";
const minOneBlockSurvival = 0.99;

async function showTotalState() {
    const s = await CONTRACT.getTotalState();
    console.log("\n\tTotal:".yellow.bold);
    console.log("\ttotalSupply %s, latestNet %s", s.totalSupply, s._latestNet);
    console.log("\tVIRTUAL %s, nowBlock %s", s._VIRTUAL, s.nowBlock);
    console.log("\ttotalPending %s, burnDone %s", s._totalPendingReward, s._burnDone);
}

async function showUserState(user) {
    const s = await CONTRACT.getUserState(user.address);
    console.log("\n\tUser %s:".yellow, user.name);
    console.log("\tshare %s, VIRTUAL %s,", s._share, s._VIRTUAL);
    console.log("\tuserPending %s, latestBlock %s", s._userPendingReward, s._latestBlock);
}

//==========================================================================================


const { ethers, waffle, network, upgrades } = require("hardhat");
const { expect, util } = require("chai");
const { utils, BigNumber } = require("ethers");
require("colors");

const {
    deployWireLibrary, deployResearchToken,
    deployIntegralMathLibrary,
  } = require("./utils");
  
const { assert } = require("console");
const { yellow, cyan } = require("colors");
const { zeroAddress } = require("ethereumjs-util");
const { doesNotMatch } = require("assert");
const zero_address = "0x0000000000000000000000000000000000000000";

let integralMathLib, SimpleFixedReward, distTypeB, SimpleLinearReward, distTypeD, SimpleExpReward, SimpleExpBurn, CompoundExpBurnNovel;
let owner, alice, bob, carol, votes;
let symbol = null;
let tx;

// These constants come from IConstants.sol.
const FeeMagnifierPower = 5;
const RateMagnifier = 10 ** FeeMagnifierPower;
const SqaureMagnifier = RateMagnifier * RateMagnifier;
const LiquiditySafety = 10**3;
const DECIMALS = 18;
const INITIAL_SUPPLY = 10**(DECIMALS+6);
const MAX_SUPPLY = 1000*INITIAL_SUPPLY;

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


function expectGreater(a, b) {
    expect(a).to.be.gt(b);
}

function expectLess(a, b) {
    expect(a).to.be.lt(b);
}

async function showMilestone(text) {
    console.log("\n\t%s".blue, text);
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

async function mintTime(seconds) {
    let tm0 = (await ethers.provider.getBlock("latest")).timestamp;
    await network.provider.send("evm_increaseTime", [seconds]);
    console.log("\t%s seconds minted.", (await ethers.provider.getBlock("latest")).timestamp - tm0);
}

async function checkConsistency() {
    report = await CONTRACT.checkForConsistency();
    console.log("\n\tConsistency report:".bold.yellow);
    console.log("\tp_collective %s, p_marginal %s",
    report.pending_collective, report.pending_marginal)
    console.log("\tabs_error %s, error_rate (trillionths) === %s",
    report.abs_error, report.error_rate)
}

async function transfer(sender, recipient, amount) {
    let amountWei = ethToWei(amount);
    let balance = await CONTRACT.balanceOf(sender.address);
    if (amount > weiToEth(balance) * minOneBlockSurvival) {
        amount = Math.floor((weiToEth(balance) * minOneBlockSurvival)*100)/100;
    }
    if (amount >= 1) {
        amountWei = ethToWei(amount);
        let symbol = await CONTRACT.symbol();
        console.log("\t%s is transferring %s %s to %s...".yellow, 
        sender.name == undefined ? "undefined" : sender.name,
        amount,  symbol,
        recipient.hasOwnProperty("name") ? (recipient.name == undefined ? "undefined" : recipient.name) : "NoName");

        tx = CONTRACT.connect(sender).transfer(recipient.address, amountWei );
        (await tx).wait();
        console.log("\tTransfer done".green);
        return true;
    } else {
        console.log("\tToo little amount to transfer!");
        return false;
    }
}

async function mint(minter, to, amount) {
    let amountWei = ethToWei(amount);
    let totalSupply = await CONTRACT.totalSupply();
    if ( amount > weiToEth(MAX_SUPPLY) - weiToEth(totalSupply) ) {
        amount = Math.floor((weiToEth(MAX_SUPPLY) - weiToEth(totalSupply) * minOneBlockSurvival)*100)/100;
    }

    if (amount >= 1) {
        amountWei = ethToWei(amount);
        let symbol = await CONTRACT.symbol();
        await console.log("\t%s is minting %s %s to %s ...".yellow, 
        minter.name == undefined ? "undefined" : minter.name,
        amount, symbol,
        to.hasOwnProperty("name") ? (to.name == undefined ? "undefined" : to.name) : "NoName" );

        tx = CONTRACT.connect(minter).mint(to.address, amountWei );
        (await tx).wait();
        await console.log("\tMint done".green);
        return true;
    } else {
        console.log("\tToo little space to mint!");
        return false;
    }

}

async function burn(burner, from, amount) {

    let amountWei = ethToWei(amount);
    let balance = await CONTRACT.balanceOf(from.address);
    if (amount > weiToEth(balance) * minOneBlockSurvival) {
        amount = Math.floor((weiToEth(balance) * minOneBlockSurvival)*100)/100;
    }
    if (amount >= 1) {
        amountWei = ethToWei(amount);
        let symbol = await CONTRACT.symbol();
        await console.log("\t%s is burning %s %s from %s ...".yellow, 
        burner.name == undefined ? "undefined" : burner.name,
        amount, symbol,
        from.hasOwnProperty("name") ? (from.name == undefined ? "undefined" : from.name) : "NoName" );

        tx = CONTRACT.connect(burner).burn(from.address, amountWei );
        (await tx).wait();
        console.log("\tBurn done".green);
        return true;
    } else {
        console.log("\tToo little amount to burn!");
        return false;
    }
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


        CONTRACT = await deployResearchToken(CONTRACT_NAME, owner, analyticMath.address);
        console.log("\tCONTRACT contract deployed at: %s", CONTRACT.address);
        console.log("\tOwner's balance: %s", await CONTRACT.balanceOf(owner.address));
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
        const name = await CONTRACT.name();
        console.log("\tCONTRACT token's name: %s", name);
        expectEqual(name, CONTRACT_NAME);

        const symbol = await CONTRACT.symbol();
        console.log("\tCONTRACT symbol: %s", symbol);
        expectEqual(symbol, CONTRACT_SYMBOL);

        const decimals = await CONTRACT.decimals();
        console.log("\tCONTRACT decimals: %s", decimals);
        expectEqual(decimals, 18);

    
        await checkConsistency();
    });

    it("1.3 Total supply and owner balance are checked.\n".green, async function () {
        const totalSupply = await CONTRACT.totalSupply();
        console.log("\tCONTRACT total supply: %s gways",BigInt(totalSupply));
        if (minOneBlockSurvival == 0.98) {
            expectLess(weiToEth(totalSupply), weiToEth(INITIAL_SUPPLY));
        } else if (minOneBlockSurvival == 1.0) {
            expectGreater(weiToEth(totalSupply), weiToEth(INITIAL_SUPPLY));
        } else {
            expectEqual(weiToEth(totalSupply), weiToEth(INITIAL_SUPPLY));
        }

        console.log("\tTotal supply amount was minted to owner.");
        const ownerTgrBalance = await CONTRACT.balanceOf(owner.address);
        console.log("\tCONTRACT owner balance: %s gways", BigInt(ownerTgrBalance));
        if (minOneBlockSurvival == 0.98) {
            expectLess(weiToEth(ownerTgrBalance), weiToEth(INITIAL_SUPPLY));
        } else if (minOneBlockSurvival == 1.0) {
            expectGreater(weiToEth(ownerTgrBalance), weiToEth(INITIAL_SUPPLY));
        } else {
            expectEqual(weiToEth(ownerTgrBalance), weiToEth(INITIAL_SUPPLY));
        }
        await checkConsistency();
    });

    it("1.4 Allowance control functions were checked.\n".green, async function () {
        let symbol = await CONTRACT.symbol();
        console.log("Owner approves Alice to spend 1000 %s", symbol);
        await CONTRACT.connect(owner).approve(alice.address, ethToWei(1000));

        let allowanceOwnerAlice = await CONTRACT.allowance(owner.address, alice.address);
        console.log("\tallowance[owner][alice]: %s", weiToEthEn(allowanceOwnerAlice));
        expectEqual(weiToEth(allowanceOwnerAlice), 1000);

        console.log("\tIncrease it by 1000.");
        await CONTRACT.connect(owner).increaseAllowance(alice.address, ethToWei(1000));
        allowanceOwnerAlice = await CONTRACT.allowance(owner.address, alice.address);
        console.log("\tallowance[owner][alice]: %s", weiToEthEn(allowanceOwnerAlice));
        expectEqual(weiToEth(allowanceOwnerAlice), 2000);

        console.log("\tDecrease it by 1000.");
        await CONTRACT.connect(owner).decreaseAllowance(alice.address, ethToWei(1000));
        allowanceOwnerAlice = await CONTRACT.allowance(owner.address, alice.address);
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
              await showTotalState()
              await showUserState(owner);
              await showUserState(alice);
              await showUserState(bob);
              await showUserState(carol);
              await checkConsistency();

              await mintBlocks(blocks);

              await showTotalState()
              await showUserState(owner);
              await showUserState(alice);
              await showUserState(bob);
              await showUserState(carol);
              await checkConsistency();

              await mint(owner, bob, mintAmount);
              await checkConsistency();

              await showTotalState()
              await showUserState(owner);
              await showUserState(alice);
              await showUserState(bob);
              await showUserState(carol);
              await checkConsistency();

              await burn(owner, bob, burnAmount);

              await showTotalState()
              await showUserState(owner);
              await showUserState(alice);
              await showUserState(bob);
              await showUserState(carol);
              await checkConsistency();

              await transfer(owner, bob, 100);
              await mintBlocks(blocks);
              await showTotalState()
              await showUserState(owner);
              await showUserState(alice);
              await showUserState(bob);
              await showUserState(carol);
              await checkConsistency();
  
              await mintBlocks(blocks);
              await mint(owner, bob, mintAmount);
              await transfer(owner, carol, 10000);
              await mintBlocks(blocks);
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


 
describe("====================== Stage 3: Random calls ======================\n".yellow, async function () {

    const users = [];
    const errors = [];

    it("3.0 Prepare.\n".green, async function () {
        users.push(owner); users.push(owner); users.push(owner); users.push(owner); users.push(owner); users.push(owner);
        users.push(alice); users.push(alice); users.push(alice); users.push(alice); 
        users.push(bob); users.push(bob); users.push(bob);
        users.push(carol);
    });

    function generateRandomInteger(min, max) {
        return Math.floor(min + Math.random()*(max - min + 1));
    }

    async function showUserStateAll() {
        await showUserState(owner);
        await showUserState(alice);
        await showUserState(bob);
        await showUserState(carol);    
    }
    
    async function transferRandom() {        
        sender = users[generateRandomInteger(0, users.length - 1)];
        recipient = users[generateRandomInteger(0, users.length - 1)];
        amount = generateRandomInteger(10, 100);
        report = await transfer(sender, recipient, amount);
        return report;
    }
    
    async function mintRandom() {
        recipient = users[generateRandomInteger(0, users.length - 1)];
        amount = generateRandomInteger(10, 100);
        report = await mint(owner, recipient, amount);
        return report;
    }
    
    async function burnRandom() {
        recipient = users[generateRandomInteger(0, users.length - 1)];
        amount = generateRandomInteger(10, 100);
        report = await burn(owner, recipient, amount);
        return report;
    }
    
    async function mintBlocksRandom() {
        amount = generateRandomInteger(0, 100);
        await mintBlocks(amount);    
        return true;
    }
    
    const functions = [ transferRandom, transferRandom, transferRandom, transferRandom, transferRandom,
        transferRandom, transferRandom, transferRandom, transferRandom, transferRandom, transferRandom,
         mintRandom, burnRandom, mintBlocksRandom ];


    async function writeStringToFile(path, data) {
        const fs = require('fs')
        fs.writeFile(path, data, (err) => {
            if (err) throw err;
        })
    }

    it("3.1 Random calls.\n".green, async function () {

        blocks = 60 // twice the cycle
        mintAmount = 1000
        burnAmount = 700

        let values = [];
        let movingAvg = 0;
        let count = 0; let window = 5;
        const thresholdX = 5;

        const target = 3;
        while (values.length < target) {
            rand = generateRandomInteger(0, functions.length - 1);
            report = await functions[rand]();
            if (report == true) {
                consistency = await CONTRACT.checkForConsistency();
                error = Number(consistency.error_rate);
                values.push(error);
            } else {
                console.log("\tRandom call failed.".red);
            }
        }
        json = JSON.stringify(values);
        console.log(json);
        await writeStringToFile("test_" + CONTRACT_NAME + ".txt", json);
    });   
});