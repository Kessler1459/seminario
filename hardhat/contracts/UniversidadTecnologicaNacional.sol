// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract UniversidadTecnologicaNacional is ERC721, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct ScoreEntry{
        uint256 tokenId;
        uint8 score;
    }

    address[] public addresses;
    mapping(uint256 => uint8) public scores;

    constructor() ERC721("Universidad Tecnologica Nacional", "UTN") {}

    function _baseURI() internal pure override returns (string memory) {
        return "kjjjj";
    }

    function getAllTokens(address _address) public view returns(ScoreEntry[] memory){
        uint256 balance=balanceOf(_address);
        ScoreEntry[] memory entries=new ScoreEntry[](balance) ;
        for (uint256 i = 0; i < balance; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(_address,i);
            entries[i]=ScoreEntry(tokenId,scores[tokenId]);
        }
        return entries;
    }

    function getAllAddresses()public view returns( address[] memory) {
        return addresses;
    }

    function safeMint(address to, uint8 score) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        if(balanceOf(to)==0){
            addresses.push(to);
        }
        scores[tokenId]=score;
        _safeMint(to, tokenId);
    }
        
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)internal override(ERC721, ERC721Enumerable){
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)public view override(ERC721, ERC721Enumerable) returns (bool){
        return super.supportsInterface(interfaceId);
    }
}