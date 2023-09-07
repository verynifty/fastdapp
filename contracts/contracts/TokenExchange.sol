// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


import "./FastDappTestToken.sol";

contract ERC20AMM {
    
    mapping(uint256 => uint256) public tokenBalance;
    mapping(uint256 => uint256) public ethBalance;
    mapping(address => mapping(uint256 => uint256)) public priceShares;
    mapping(uint256 => uint256) public totalShares;


    function getSharePrice(uint256 price) public view returns (uint256) {
        // handle case where only in eth or only in token
        return totalShares[price] / tokenBalance[price];
    }

    function addLiquidity(uint256 price, uint256 ethAmount, uint256 tokenAmount) public {
        uint256 sharePrice = getSharePrice(price);
        uint256 shares = ethAmount / sharePrice;
        // handle token transfer
        priceShares[msg.sender][price] += shares;
        // handle eth transfer
        totalShares[price] += shares;
        ethBalance[price] += ethAmount;
        tokenBalance[price] += tokenAmount;
    }

    function removeLiquidity(uint256 price, uint256 shares) public {
        uint256 sharePrice = getSharePrice(price);
        uint256 ethAmount = shares * sharePrice;
        uint256 tokenAmount = shares * sharePrice;
        priceShares[msg.sender][price] -= shares;
        totalShares[price] -= shares;
        ethBalance[price] -= ethAmount;
        tokenBalance[price] -= tokenAmount;
        // handle token transfer
        // handle eth transfer
    }

    function buy(uint256 price, uint256 ethAmount) public {
        uint256 sharePrice = getSharePrice(price);
        uint256 shares = ethAmount / sharePrice;
        priceShares[msg.sender][price] += shares;
        totalShares[price] += shares;
        ethBalance[price] += ethAmount;
        // make transfer
    }

    function sell(uint256 price, uint256 shares) public {
        uint256 sharePrice = getSharePrice(price);
        uint256 ethAmount = shares * sharePrice;
        priceShares[msg.sender][price] -= shares;
        totalShares[price] -= shares;
        ethBalance[price] -= ethAmount;
        // make transfer
    }
}

