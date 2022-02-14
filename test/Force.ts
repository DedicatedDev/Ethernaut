import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"
import { BigNumber } from "ethers"
import { ethers } from "hardhat"
import { Force, Force__factory, SelfDestructive, SelfDestructive__factory } from "../typechain"

describe("Force", async() => {
    let ForceFactory:Force__factory
    let force:Force
    let SelfDestructive:SelfDestructive__factory
    let selfdes:SelfDestructive
    let accounts:SignerWithAddress[]
    before(async() => {
        accounts = await ethers.getSigners()
        ForceFactory = await ethers.getContractFactory('Force')
        force = await ForceFactory.deploy()
        await force.deployed()

        SelfDestructive = await ethers.getContractFactory("SelfDestructive")
        selfdes = await SelfDestructive.deploy()
        await selfdes.deployed()
    })

    it("test Force", async()=> {
        expect(await ethers.provider.getBalance(force.address)).to.equal(BigNumber.from("0"))
        expect(await ethers.provider.getBalance(selfdes.address)).to.equal(BigNumber.from("0"))
        await accounts[1].sendTransaction({
            to:selfdes.address,
            value: 10000
        })
        expect(await ethers.provider.getBalance(selfdes.address)).to.equal(BigNumber.from("10000"))
        await selfdes.attack(force.address)
        expect(await ethers.provider.getBalance(force.address)).to.above(BigNumber.from("0"))
    })
})