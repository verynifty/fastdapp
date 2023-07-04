// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BUILD is ERC721, ERC721Enumerable, Ownable {

    mapping(uint256 => string) public locations;

    constructor() ERC721("FastDapp", "FAST⚡") {}

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function getID(string memory _name) public pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(_name)));
    }

    function mint(address _to, string memory _name, string memory _location) public  {
        uint256 tokenId = getID(_name);
        locations[tokenId] = _location;
        _safeMint(_to, tokenId);
    }
    
}