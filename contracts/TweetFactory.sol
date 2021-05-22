// SPDX-License-Identifier: MIT
pragma solidity >=0.5.13 <0.9.0;


/**
 @title TweetFactory
 @author Van Tien NGUYEN
 @dev A contract dedicated to the creation of new tweet in the decentralised light-Twitter
 */
contract TweetFactory {

    event NewTweet(uint256 id, string context, uint256 createdAt);

    uint256 digits = 16;
	uint256 idModulus = 10**digits;

    struct Tweet {
        string context;
        uint256 createdAt;
    }

    Tweet[] public tweets;

    mapping(address => uint256) ownerTweetCount;
    mapping(uint256 => address) tweetToOwner;

    /**
     * @dev A function that creates a new tweet with context
     * @param _context The context of the tweet
     */
    function createTweet(string memory _context) public {
        require(
            ownerTweetCount[msg.sender] == 0,
            "Only owner can call this function!"    
        );

        uint256 createdAt = block.timestamp;
        tweets.push(
            Tweet(_context, createdAt)
        );
        
        uint256 id = tweets.length - 1;
        tweetToOwner[id] = msg.sender;
        ownerTweetCount[msg.sender]++;
        emit NewTweet(id, _context, createdAt);
    }

    /**
     * @dev A function that return all tweets
     */
    function readTweets() public view returns (Tweet[] memory) {
        return tweets;
    }

    /**
     * @dev A function that allow user to update tweet
     * @param _id The id of the context
     * @param _context The new context will be updated
     */
    function updateTweet(uint256 _id, string memory _context) external {
        require(
            tweetToOwner[_id] == msg.sender,
            "Only owner can call this function!"    
        );
        tweets[_id].context = _context;
        tweets[_id].createdAt = block.timestamp;
    }
}