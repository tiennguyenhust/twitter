// SPDX-License-Identifier: MIT
pragma solidity >=0.5.13 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";


/**
 @title TweetFactory
 @author Van Tien NGUYEN
 @dev A contract dedicated to the creation of new tweet in the decentralised light-Twitter
 */
contract TweetFactory is Ownable{

    event NewTweet(uint256 id, string content, uint256 createdAt, address onwer);

    uint256 digits = 16;
	uint256 idModulus = 10**digits;
    uint fee = 0.001 ether;

    struct Tweet {
        string content;
        uint256 createdAt;
        address owner;
    }

    Tweet[] public tweets;

    mapping(address => uint256) ownerTweetCount;
    mapping(uint256 => address) tweetToOwner;


    /**
     * @dev A modifier that check the owner of a function
     * @param _id the id of a tweet
     */
    modifier ownerOf(uint256 _id) {
        require(
            tweetToOwner[_id] == msg.sender,
            "Only owner can call this function!"    
        );
		_;
	}

    /**
	 * @dev A function that allows the owner of the smart contract to withdraw all the ethers stored
	 */
	function withdraw() external onlyOwner {
		address payable _owner = payable(owner());
		_owner.transfer(address(this).balance);
	}

    /**
     * @dev A function that creates a new tweet with content
     * @param _content The content of the tweet
     */
    function createTweet(string memory _content) public {
        // require(msg.value == fee);
        uint256 createdAt = block.timestamp;
        tweets.push(
            Tweet(_content, createdAt, address(msg.sender))
        );
        
        uint256 id = tweets.length - 1;
        tweetToOwner[id] = msg.sender;
        ownerTweetCount[msg.sender]++;
        emit NewTweet(id, _content, createdAt, address(msg.sender));
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
    function updateTweet(uint256 _id, string calldata _content) public ownerOf(_id) {
        // require(msg.value == fee);
        Tweet memory updatedTweet = tweets[_id];
        updatedTweet.content = _content;
        updatedTweet.createdAt = block.timestamp;

        for (uint i=_id; i<tweets.length-1; i++){
            tweets[i] = tweets[i+1];
            tweetToOwner[i] = tweets[i+1].owner;
        }
        tweets[tweets.length-1] = updatedTweet;
        tweetToOwner[tweets.length-1] = updatedTweet.owner;
    }

    /**
     @dev A function that allow the owner to delete his (her) tweet
     @param _id the id of the tweet
     */
    function deleteTweet(uint256 _id) public ownerOf(_id) {
        // require(msg.value == fee);
        ownerTweetCount[msg.sender]--;
        for (uint i=_id; i<tweets.length-1; i++){
            tweets[i] = tweets[i+1];
        }
        tweets.pop();
        delete tweetToOwner[_id];
    }
}