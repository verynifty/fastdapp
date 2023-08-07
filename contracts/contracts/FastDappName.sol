// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

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
*/

contract FastDappName is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    mapping(uint256 => string) public locations;
    mapping(uint256 => string) public idToName;

    uint256 public price;

    event newLocation(uint256 indexed id, string location);

    constructor() ERC721("Fast Dapp Name", "FAST") {}

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://fastdapp.xyz/api/name/";
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /*
        Here starts our code
    */

    /*
        GETTERS
    */

    function getIdFromName(string memory _name) public pure returns (uint256) {
        return uint256(keccak256(abi.encode(_name)));
    }

    function getInfoFromName(
        string memory _name
    )
        public
        view
        returns (
            address owner,
            string memory location,
            string memory name,
            uint256 tokenId
        )
    {
        uint256 _tokenId = getIdFromName(_name);
        return (getInfoFromId(_tokenId));
    }

    function getInfoFromId(
        uint256 _tokenId
    )
        public
        view
        returns (
            address owner,
            string memory location,
            string memory name,
            uint256 tokenId
        )
    {
        owner = ownerOf(_tokenId);
        location = locations[_tokenId];
        name = idToName[_tokenId];
        tokenId = _tokenId;
    }

    // Check if name of domain is valid
    function isNameValid(string memory str) public pure returns (bool) {
        bytes memory b = bytes(str);
        if (b.length < 1) return false;
        for (uint i; i < b.length; i++) {
            bytes1 char = b[i];
            if (
                !((char >= 0x30 && char <= 0x39) || //9-0
                    (char >= 0x61 && char <= 0x7A) || //a-z
                    (char == 0x2D || char == 0x5F)) //- and _
            ) return false;
        }
        return true;
    }

    /*
        SETTERS
    */

    function mint(string memory _name, string memory _location) public payable {
        uint256 tokenId = getIdFromName(_name);
        require(msg.value >= price, "You didn't pay enough");
        // Check if name is available
        require(!_exists(tokenId), "Name already taken");
        // Check if name is valid
        require(
            isNameValid(_name),
            "Name must contain only characters from 0-9, a-z, - and _"
        );
        idToName[tokenId] = _name;
        locations[tokenId] = _location;
        emit newLocation(tokenId, _location);
        _mint(msg.sender, tokenId);
    }

    function setLocation(uint256 _tokenId, string memory _newLocation) public {
        require(ownerOf(_tokenId) == msg.sender, "Not owner");
        locations[_tokenId] = _newLocation;
        emit newLocation(_tokenId, _newLocation);
    }

    function setPrice(uint256 _price) public onlyOwner {
        price = _price;
    }

    function withdrawEth() public payable {
        address payable _to = payable(owner());
        (bool sent, ) = _to.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
    }
}
