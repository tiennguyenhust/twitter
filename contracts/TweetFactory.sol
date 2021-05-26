// SPDX-License-Identifier: MIT
pragma solidity >=0.5.13 <0.9.0;

/**
 @title TweetFactory
 @author Van Tien NGUYEN
 @dev A contract dedicated to the creation of new tweet in the decentralised light-Twitter
 */
contract TweetFactory {

    event NewTweet(uint256 id, string content, uint256 createdAt);

    uint256 digits = 16;
	uint256 idModulus = 10**digits;

    struct Tweet {
        string content;
        uint256 createdAt;
    }

    Tweet[] public tweets;

    mapping(address => uint256) ownerTweetCount;
    mapping(uint256 => address) tweetToOwner;


    modifier ownerOf(uint256 _id) {
        require(
            tweetToOwner[_id] == msg.sender,
            "Only owner can call this function!"    
        );
		_;
	}


    /**
     * @dev A function that creates a new tweet with content
     * @param _content The content of the tweet
     */
    function createTweet(string memory _content) public {
        uint256 createdAt = block.timestamp;
        tweets.push(
            Tweet(_content, createdAt)
        );
        
        uint256 id = tweets.length - 1;
        tweetToOwner[id] = msg.sender;
        ownerTweetCount[msg.sender]++;
        emit NewTweet(id, _content, createdAt);
    }

    /**
     * @dev A function that return all tweets
     */
    function readTweets() public view returns (Tweet[] memory) {
        return tweets;
    }

    /**
     * @dev A function that allow the owner to update his (her) tweet
     * @param _id The id of the tweet
     * @param _content The new content will be updated
     */
    function updateTweet(uint256 _id, string calldata _content) external ownerOf(_id) {
        // require(
        //     tweetToOwner[_id] == msg.sender,
        //     "Only owner can call this function!"    
        // );
        tweets[_id].content = _content;
        tweets[_id].createdAt = block.timestamp;
    }

    /**
     @dev A function that allow the owner to delete his (her) tweet
     @param _id the id of the tweet
     */
    function deleteTweet(uint256 _id) external {
        require(
            tweetToOwner[_id] == msg.sender,
            "Only owner can call this function!"    
        );
        ownerTweetCount[msg.sender]--;
        delete tweetToOwner[_id];
        delete tweets[_id];
    }
}