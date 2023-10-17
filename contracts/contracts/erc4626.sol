//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";

contract myERC4626 is ERC4626 {

    constructor() ERC20("ERC4626", "ERC4626") ERC4626(IERC20(0xB6Ca7399B4F9CA56FC27cBfF44F4d2e4Eef1fc81)) {

    }
}
