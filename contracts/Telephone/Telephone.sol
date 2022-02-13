// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "hardhat/console.sol";
contract Telephone {
    address public owner;
    constructor() {
        owner = msg.sender;
    }

    function changeOwner(address _owner) public {
        console.log(tx.origin);
        if (tx.origin != msg.sender) {
            owner = _owner;
        }
    }
}