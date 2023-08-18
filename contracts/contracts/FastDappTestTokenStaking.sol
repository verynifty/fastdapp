// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/*

                       .,,uod8B8bou,,.
              ..,uod8BBBBBBBBBBBBBBBBRPFT?l!i:.
         ,=m8BBBBBBBBBBBBBBBRPFT?!||||||||||||||
         !...:!TVBBBRPFT||||||||||!!^^""'   ||||
         !.......:!?|||||!!^^""'            ||||
         !.........||||                     ||||
         !.........||||  ##                 ||||
         !.........||||                     ||||
         !.........||||                     ||||
         !.........||||                     ||||
         !.........||||                     ||||
         `.........||||                    ,||||
          .;.......||||               _.-!!|||||
   .,uodWBBBBb.....||||       _.-!!|||||||||!:'
!YBBBBBBBBBBBBBBb..!|||:..-!!|||||||!iof68BBBBBb....
!..YBBBBBBBBBBBBBBb!!||||||||!iof68BBBBBBRPFT?!::   `.
!....YBBBBBBBBBBBBBBbaaitf68BBBBBBRPFT?!:::::::::     `.
!......YBBBBBBBBBBBBBBBBBBBRPFT?!::::::;:!^"`;:::       `.
!........YBBBBBBBBBBRPFT?!::::::::::^''...::::::;         iBBbo.
`..........YBRPFT?!::::::::::::::::::::::::;iof68bo.      WBBBBbo.
  `..........:::::::::::::::::::::::;iof688888888888b.     `YBBBP^'
    `........::::::::::::::::;iof688888888888888888888b.     `
      `......:::::::::;iof688888888888888888888888888888b.
        `....:::;iof688888888888888888888888888888888899fT!
          `..::!8888888888888888888888888888888899fT|!^"'
            `' !!988888888888888888888888899fT|!^"'
                `!!8888888888888888899fT|!^"'
                  `!988888888899fT|!^"'
                    `!9899fT|!^"'
                      `!^"'
 _______  _______  _______ _________ ______   _______  _______  _______ 
(  ____ \(  ___  )(  ____ \\__   __/(  __  \ (  ___  )(  ____ )(  ____ )
| (    \/| (   ) || (    \/   ) (   | (  \  )| (   ) || (    )|| (    )|
| (__    | (___) || (_____    | |   | |   ) || (___) || (____)|| (____)|
|  __)   |  ___  |(_____  )   | |   | |   | ||  ___  ||  _____)|  _____)
| (      | (   ) |      ) |   | |   | |   ) || (   ) || (      | (      
| )      | )   ( |/\____) |   | |   | (__/  )| )   ( || )      | )      
|/       |/     \|\_______)   )_(   (______/ |/     \||/       |/       
                                               By the MuseDAO
                                                fastdapp.xyz                    
*/

import "./FastDappTestToken.sol";

contract FastDappTestTokenStaking {
    FastDappTestToken public immutable token;
    uint256 public immutable rewardsPerHour = 1000; // 0.01%

    event Deposit(address sender, uint256 amount);
    event Withdraw(address sender, uint256 amount);
    event Claim(address sender, uint256 amount);
    event Compound(address sender, uint256 amount);

    mapping(address => uint256) public balanceOf;
    mapping(address => uint256) public lastUpdated;
    mapping(address => uint256) public claimed;

    constructor(FastDappTestToken token_) {
        token = token_;
    }

    function deposit(uint256 amount_) external {
        token.transferFrom(msg.sender, address(this), amount_);
        balanceOf[msg.sender] += amount_;
        lastUpdated[msg.sender] = block.timestamp;
        emit Deposit(msg.sender, amount_);
    }

    function balanceAndRewards(address address_) public view returns (uint256) {
        return balanceOf[address_] + rewards(address_);
    }

    function rewards(address address_) public view returns (uint256) {
        return
            ((block.timestamp - lastUpdated[address_]) * balanceOf[address_]) /
            (rewardsPerHour * 1 hours);
    }

    function claim() external {
        uint256 amount = rewards(msg.sender);
        token.mint(msg.sender, amount);
        _update(amount);
        emit Claim(msg.sender, amount);
    }

    function _update(uint256 amount_) internal {
        claimed[msg.sender] += amount_;
        lastUpdated[msg.sender] = block.timestamp;
    }

    function compound() public {
        uint256 amount = rewards(msg.sender);
        token.mint(address(this), amount);
        balanceOf[msg.sender] += amount;
        _update(amount);
        emit Compound(msg.sender, amount);
    }

    function withdraw(uint256 amount_) public {
        require(balanceOf[msg.sender] >= amount_, "Insufficient funds");
        compound();
        balanceOf[msg.sender] -= amount_;
        token.transfer(msg.sender, amount_);
        emit Withdraw(msg.sender, amount_);
    }

    function withdrawAll() external {
        withdraw(balanceOf[msg.sender]);
    }
}
