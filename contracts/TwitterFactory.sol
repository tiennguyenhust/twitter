// SPDX-License-Identifier: MIT
pragma solidity >=0.5.13 <0.9.0;

/**
 @title TwitterFactory
 @author Van Tien NGUYEN
 @dev A contract dedicated to the creation of new twitter in the decentralised light-Twitter
 */
contract TwitterFactory {

    event NewTwitter(uint256 id, string context);

    uint256 digits = 16;
	uint256 idModulus = 10**digits;

    struct Twitter {
        uint256 id;
        string context;
    }

    Twitter[] public twitters;

    mapping(address => uint256) ownerTwitterCount;

    /**
     *@dev A function that will generate a random id of a twit from a context
     *@param _str A string from which the random id will be generated
     *@return A random id made of 16 digits
     */
    function _generateRandomId(string memory _str) private view returns (uint256) {
        uint256 rand = uint256(keccak256(abi.encodePacked(_str)));
        return rand % idModulus;
    }

    /**
     * @dev A function that creates new twitter with context
     * @param _context The context of the twitter
     */
    function createTwitter(string memory _context) public {
        require(
            ownerTwitterCount[msg.sender] == 0,
            "Only owner can call this function once"    
        );

        uint256 randId = _generateRandomId(_context);
        twitters.push(
            Twitter(randId, _context)
        );
    }
}