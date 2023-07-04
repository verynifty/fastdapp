// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TIME is ERC20, Ownable {
    
    uint256 public lastTime;

    constructor() ERC20("TIME", "TIME") {
        lastTime = block.timestamp;
    }


    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}