// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

 import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PYDProxy {
    
    address public owner;
    address public manager;

    mapping(address => uint256) public deposits;
    mapping(address => uint256) public lastDeposit;
    mapping(address => uint256) public points;

    uint256 public totalDeposits;
    uint256 public totalWithdrawn;
    IERC20 public asset;

    event Deposit(address indexed _user, uint256 _amount);
    event WithdrawDeposit(address indexed _user, uint256 _amount);
    event WithdrawRewards(address indexed _user, uint256 _amount);
    
    constructor() {}

    function init(address _owner, address _asset) public {
        require(owner == address(0), "PYD: already initialized");
        owner = _owner;
        asset = IERC20(_asset);
        manager = msg.sender;
    }

    function transferOwnership(address _owner) public {
        require(msg.sender == owner, "Mus be owner");
        owner = _owner;
    }

    // deposit a token for donating yield in the vault
    // token must be a rebasing ERC20 token such as Lido's stETH or AAVE's aUSDC..
    function _deposit( uint256 _amount, address _from, address _to) internal {
        points[_to] += (getTotalRewards() - lastDeposit[_to]) * (deposits[_to] / totalDeposits);
        asset.transferFrom(_from, address(this), _amount);
        deposits[_to] += _amount;
        totalDeposits += _amount;
        emit Deposit(_to, _amount);
    }

    function deposit(uint256 _amount) public {
        _deposit(_amount, msg.sender, msg.sender);
    }

    // Deposit tokens on behalf of someone else (e.g. from a contract)
    function delegateDeposit(address _for, uint256 _amount) public {
        _deposit(_amount, msg.sender, _for);
    }

    function _withdraw(address _for, uint256 _amount) internal {
        require(deposits[_for] >= _amount, "Not enough funds");
        deposits[_for] -= _amount;
        totalDeposits -= _amount;
        asset.transfer(_for, _amount);
        emit WithdrawDeposit(_for, _amount);
    }
    
    // A user can withdraw the previously deposited tokens at anytime
    function withdraw(uint256 _amount) public {
        _withdraw(msg.sender, _amount);
    }

    // A user can withdraw the previously deposited tokens at anytime
    function withDrawAll() public {
        uint256 _amount = deposits[msg.sender];
        _withdraw(msg.sender, _amount);
    }

    // Get how much token were accrued by the pool owner
    function getTotalRewards() public view returns (uint256){
        return asset.balanceOf(address(this)) - totalDeposits + totalWithdrawn;
    }

    function getInfo(address user) public view returns (IERC20 _asset, uint256 _totalDeposits, uint256 _myDeposit, uint256 _pendingRewards, uint256 _totalWithdrawn){
        return (asset, totalDeposits, deposits[user], getRewards(), totalWithdrawn);
    }

    function withdrawDonations() public {
        require(msg.sender == owner, "Only owner can withdraw rewards");
        uint256 _amount = getRewards();
        // We take a 0.3% fee on the rewards
        uint256 fee = _amount * 100 / 10000;
        // Transfer fee to Muse DAO multisig
        asset.transfer(0x6fBa46974b2b1bEfefA034e236A32e1f10C5A148, fee);
        asset.transfer(msg.sender, _amount - fee);
        totalWithdrawn += _amount;
        emit WithdrawRewards(msg.sender, _amount);
    }

    function getPoints(address _user) public view returns (uint256){
        return deposits[_user];
    }

}