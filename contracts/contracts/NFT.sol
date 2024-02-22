// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TESTNFT is ERC721 {
    uint256 private _nextTokenId;

    constructor()
        ERC721("TEST NFT", "TNFT")
    {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://bafybeibc5sgo2plmjkq2tzmhrn54bk3crhnc23zd2msg4ea7a4pxrkgfna/";
    }

    function safeMint(address to) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    function mint(uint256 _quantity) public payable {
        for (uint256 i = 0; i < _quantity; i++) {
            _safeMint(msg.sender, _nextTokenId++);
        }
        (bool sent, bytes memory data) = msg.sender.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }
}