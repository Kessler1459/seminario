// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract UniversidadTecnologicaNacional is ERC721,ERC721URIStorage, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct ScoreEntry{
        uint256 tokenId;
        uint8 score;
    }

    //Array with all the existing accounts with at least one token  without repeating
    address[] public addresses;

    // Mapping from token ID to score
    mapping(uint256 => uint8) public scores;

    constructor() ERC721("Universidad Tecnologica Nacional", "UTN") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    /**
     * @dev Returns an array with all the ScoreEntry from an address
     */
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

    function safeMint(address to, uint8 score, string memory uri) public scoreRange(score) onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        if(balanceOf(to)==0){
            addresses.push(to);
        }
        scores[tokenId]=score;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }
        
    modifier scoreRange(uint8 score){
        require((score >= 1) && (score<=10),"score must be between 1 and 10");
        _;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)internal override(ERC721, ERC721Enumerable){
        require(from == address(0) || to == address(0), "NonTransferrableERC721Token: non transferrable");
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)public view override(ERC721, ERC721Enumerable) returns (bool){
        return super.supportsInterface(interfaceId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
}