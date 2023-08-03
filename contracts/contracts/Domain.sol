// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BUILD is ERC721, ERC721Enumerable, Ownable {
    mapping(uint256 => string) public locations;
    mapping(string => uint256) public nameToId;
    uint256 public price;

    constructor() ERC721("FastDapp", "FAST") {
        price = 1 ether;
    }

    function setFee(uint256 _price) public onlyOwner {
        price = _price;
    }

    function setLocation(uint256 _tokenId, string memory _newLocation) public onlyOwner {
        require(ownerOf(_tokenId) == msg.sender, "Not owner");
        locations[_tokenId] = _newLocation;
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
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // Check if name of domain is valid
    function isNameValid(string str) public pure returns (bool) {
        bytes memory b = bytes(str);
        if (b.length > 0) return false;
        for (uint i; i < b.length; i++) {
            bytes1 char = b[i];
            if (
                !(char >= 0x30 && char <= 0x39) && //9-0
                !(char >= 0x61 && char <= 0x7A) && //a-z
                !(char == 0x2D || char == 0x5F) //- and _
            ) return false;
        }
        return true;
    }

    function mint(
        string memory _name,
        string memory _location
    ) public payable {
        require(msg.value > price, "You didn't pay enough");
        // Check if name is available
        require(nameToId[_name] == 0, "Name already taken");
        // Check if name is valid
        require(isNameValid(_name), "Name must contain only characters from 0-9, a-z, - and _");
        uint256 tokenId = getID(_name);
        locations[tokenId] = _location;
        _safeMint(msg.sender, tokenId);
    }
}
