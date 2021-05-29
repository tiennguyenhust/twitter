/* eslint-disable no-console */
/* eslint-disable no-undef */
require("chai").should();

const { expectRevert } = require('@openzeppelin/test-helpers');
const TweetFactory = artifacts.require("TweetFactory");

contract("TweetFactory", function([user0, user1]) {
    beforeEach(async () => {
        this.TweetFactory = await TweetFactory.new();
    });

    describe("Createing new Tweet", () => {
        it("should create new tweet from a content", async () => {
            _content = "Hello, I am Sherlock!";
            this.TweetFactory.createTweet(_content, {from: user0});

            firstTweet = await this.TweetFactory.tweets.call([0]);
            console.log(firstTweet.content + ": " + firstTweet.createdAt);
            firstTweet.content.should.equal(_content);
        });
    });

    describe("Reading all tweets", () => {
        it("should return all tweets", async () => {
            this.TweetFactory.createTweet("Hello, I am Sherlock!", {from: user0});
            await this.TweetFactory.createTweet("Bonjour, Je m'appelle Tien!", {from: user1});

            numberOfTweets = 2;

            tweets = await this.TweetFactory.readTweets();
            console.log("====== All Tweets========");
            console.log("All Tweets: " + tweets);

            tweets.length.should.equal(numberOfTweets);
        });
    });

    describe("Update a tweet", () => {
        it("should update a tweet", async () => {
            this.TweetFactory.createTweet("Hello, I am Sherlock!", {from: user0});
            await this.TweetFactory.createTweet("I am a great detective!", {from: user0});
            
            newContent = "Bonjour! Je m'appelle Sherlock Holmes";
            await this.TweetFactory.updateTweet(
                0, newContent, 
                {from: user0}
            );
            updatedTweet = await this.TweetFactory.tweets.call([1]);
            console.log(updatedTweet);
            
            updatedTweet.content.should.equal(newContent);
        });

        it("should revert when a user who is not owner try to update a tweet", async () => {
            await this.TweetFactory.createTweet("Hello, I am Sherlock!", {from: user0});
            
            newContent = "Hi! I am Sherlock Holmes";
            await expectRevert(
                this.TweetFactory.updateTweet(
                    0, newContent, 
                    {from: user1}
                ),
                "Only owner can call this function!"
            )
        });
    });

    describe("Delete a tweet", () => {
        it("should update a tweet", async () => {
            this.TweetFactory.createTweet("Hello, I am Sherlock!", {from: user0});
            await this.TweetFactory.createTweet("I am a famous detective!", {from: user0});

            await this.TweetFactory.deleteTweet(0, {from: user0});

            firstTweet = await this.TweetFactory.tweets.call([0]);
            console.log(firstTweet);

            firstTweet.content.should.equal("I am a famous detective!");
        });

        it("should revert when a user who is not owner try to delete a tweet ", async () => {
            await this.TweetFactory.createTweet("Hello, I am Sherlock!", {from: user0});
            
            await expectRevert(
                this.TweetFactory.deleteTweet(0, {from: user1}),
                "Only owner can call this function!"
            )
        });
    });
    

    describe("Withdraw", () => {
        it("should withdraw gas from smart contract", async () => {
            _content = "Hello, I am Sherlock!";
            this.TweetFactory.createTweet(_content, {from: user0});

            let firstBalance = await web3.eth.getBalance(user0);

            await this.TweetFactory.withdraw();
            
            let lastBalance = await web3.eth.getBalance(user0);

            console.log(firstBalance);
            console.log(lastBalance);

            assert.notDeepEqual(firstBalance, lastBalance);
        });
    });
})