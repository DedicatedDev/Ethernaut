// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "hardhat/console.sol";
contract Fallout {

    mapping (address => uint) private allocations;
    address payable public owner;

    function fallout() public payable {
        owner = payable(msg.sender);
        allocations[owner] = msg.value;
    }
    modifier onlyOwner {
        require(
            msg.sender == owner,
            "caller is not the owner"
        );
        _;
    }
    function allocate() public payable {
        allocations[msg.sender] += msg.value;
    }
    function sendAllocation(address payable allocator) public {
        require(allocations[allocator] > 0, "allocatin is zero");
        allocator.transfer(allocations[allocator]);
    }
    function collectAllocations() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
    function allocatorBalance(address allocator) public view returns (uint) {
        return allocations[allocator];
    }
}