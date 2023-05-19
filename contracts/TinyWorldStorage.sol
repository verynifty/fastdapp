// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "./Types.sol";

contract TinyWorldStorage {
    uint256 public seed;
    uint256 public worldWidth;
    uint256 public worldScale;
    int16[2][16] public vecs;
    int16 public vecsDenom;
    uint16 public perlinMax;

    mapping(uint256 => mapping(uint256 => Tile)) public cachedTiles;
    Coords[] public touchedCoords;

    function getCachedTile(Coords memory coords) public view returns (Tile memory) {
        return cachedTiles[coords.x][coords.y];
    }

    function getTouchedTiles() public view returns (Tile[] memory) {
        Tile[] memory touchedTiles = new Tile[](touchedCoords.length);
        for (uint256 i = 0; i < touchedCoords.length; i++) {
            touchedTiles[i] = getCachedTile(touchedCoords[i]);
        }
        return touchedTiles;
    }
}