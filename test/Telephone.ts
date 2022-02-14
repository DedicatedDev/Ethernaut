// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
// import { expect } from "chai"
// import { ethers } from "hardhat"
// import { Telephone, TelephoneAttacker, TelephoneAttacker__factory, Telephone__factory } from "../typechain"

// xdescribe("Telephone",async() => {
//     let TelephoneFactory:Telephone__factory
//     let telephone:Telephone
//     let AttackerFactory:TelephoneAttacker__factory
//     let attacker:TelephoneAttacker
//     let accounts:SignerWithAddress[]
//     beforeEach(async()=>{
//         accounts = await ethers.getSigners()
//         TelephoneFactory = await ethers.getContractFactory("Telephone")
//         telephone = await TelephoneFactory.deploy()
//         await telephone.deployed()
//     })

//     it("Claim Owner ship", async()=>{
//         AttackerFactory = await ethers.getContractFactory("TelephoneAttacker")
//         attacker = await AttackerFactory.deploy()
//         await attacker.deployed()
//         attacker.attack(telephone.address, accounts[2].address)
//         expect(await telephone.owner()).to.equal(accounts[2].address)
//     })
// })