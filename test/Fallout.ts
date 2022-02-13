import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"
import { BigNumber, Contract } from "ethers"
import { ethers } from "hardhat"
import { Fallout, Fallout__factory } from "../typechain"

xdescribe("Fallout",()=> {
    let FalloutFactory:Fallout__factory
    let fallout:Fallout
    let accounts:SignerWithAddress[]
    before(async()=>{
        accounts = await ethers.getSigners()
        FalloutFactory = await ethers.getContractFactory("Fallout")
        fallout = await FalloutFactory.deploy()
        await fallout.deployed()
    })

    it("get ownership", async()=>{
        let originalBalance = await accounts[1].getBalance();
        const tx = await fallout.connect(accounts[1]).fallout({value: 100000})
        //tx.gasPrice
        originalBalance = originalBalance.sub(tx.gasPrice!)
        expect(await fallout.owner()).to.equal(accounts[1].address)
        const tx2 = await fallout.connect(accounts[1]).collectAllocations()
        originalBalance.sub(tx2.gasPrice!)
        originalBalance.add(BigNumber.from(100000))
        
        const currentBalance = await accounts[1].getBalance()
        //console.log(currentBalance.sub(originalBalance))
        //expect(currentBalance.sub(originalBalance).toString()).to.equal("0")
        
    })  
})