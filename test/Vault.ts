import { expect } from "chai"
import { ethers } from "hardhat"
import { Vault, Vault__factory } from "../typechain"

describe("Vault", async()=> {
    let VaultFactory: Vault__factory
    let vault:Vault
    before(async()=>{
        VaultFactory = await ethers.getContractFactory("Vault");
        vault = await VaultFactory.deploy(ethers.utils.solidityKeccak256(['string'],["this is test password"]));
        await vault.deployed()
    })

    it("unlock",async()=>{
        const pwd = await ethers.provider.getStorageAt(vault.address,1)
        await vault.unlock(pwd)
        
        expect(await vault.locked()).to.equal(false)
    })
})