// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ETHPage is ERC721, ERC721Enumerable, AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("ETHPage", "PAGE") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function safeMint(address to) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
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
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function concatHTML(string memory _body, string memory _style, string memory _script) public pure returns (string memory) {
        return string(
            abi.encodePacked('<!DOCTYPE html><html><body>', _body,'</body><style>', _style,'</style><script>', _script,'</script></html>'));
    }

    function getHTML(uint256 _tokenId) public pure returns (string memory) {
        return '<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>';
    }

    function tokenURI(
        uint256 _tokenId
    ) public view virtual override returns (string memory) {
        string memory description = "ETHPage";
        string memory name = "ETHPage";
        string memory json = string(
            abi.encodePacked(
                '{name:"',
                name,
                '", description:"',
                description,
                '", animation_url:"',
                getHTML(_tokenId),
                '"}'
            )
        );
        return json;
    }
}