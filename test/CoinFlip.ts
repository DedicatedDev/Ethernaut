import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"
import { BigNumber } from "ethers"
import { ethers } from "hardhat"
import { CoinFlip, CoinFlip__factory } from "../typechain"

xdescribe("CoinFlip",async()=>{
    let CoinFlipFactory:CoinFlip__factory
    let coinFlip:CoinFlip
    let owner:SignerWithAddress
    let tester:SignerWithAddress
    before(async()=>{
        [owner,tester] = await ethers.getSigners()
        CoinFlipFactory = await ethers.getContractFactory("CoinFlip")
        coinFlip = await CoinFlipFactory.deploy()
        await coinFlip.deployed()
    })

    it("guess result", async()=>{
        let Factor =  await coinFlip.FACTOR()
        for (let index = 0; index < 10; index++) {
            const blockNumber = await ethers.provider.getBlockNumber()
            let blockHash =  (await ethers.provider.getBlock(blockNumber)).hash
            let blockValue = BigNumber.from(blockHash)
            let lastHash = await coinFlip.lastHash()
            if (lastHash == blockValue) {
                continue
            }
            let result = blockValue.div(Factor).toString() == "1" ? true : false
            await coinFlip.flip(result)
        }
        const winTimes = await coinFlip.consecutiveWins()
        expect(winTimes.toString()).to.equal("10")
    })


})
