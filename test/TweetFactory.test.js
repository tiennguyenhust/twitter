require("chai").should();

const TweetFactory = artifacts.require("TweetFactory");

contract("TweetFactory", function([user0, user1]) {
    beforeEach(async () => {
        this.TweetFactory = await TweetFactory.new();
    });

    describe("Createing new Tweet", () => {
        it("should create new tweet from a context", async () => {
            _context = "Hello, I am Sherlock!";
            this.TweetFactory.createTweet(_context, {from: user0});

            firstTweet = await this.TweetFactory.tweets.call([0]);
            console.log(firstTweet.context + ": " + firstTweet.createdAt);
            firstTweet.context.should.equal(_context);
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

            await this.TweetFactory.tweets.call([0]);
            
            newContext = "Hi! I am Sherlock Holmes";
            await this.TweetFactory.updateTweet(0, newContext, {from: user0});
            updatedTweet = await this.TweetFactory.tweets.call([0]);
            
            console.log(updatedTweet);
            updatedTweet.context.should.equal(newContext);
        });
    });

    describe("Delete a tweet", () => {
        it("should update a tweet", async () => {
            this.TweetFactory.createTweet("Hello, I am Sherlock!", {from: user0});
            
            await this.TweetFactory.deleteTweet(0, {from: user0});
            tweet = await this.TweetFactory.tweets.call([0]);
            
            console.log(tweet);
            tweet.context.should.equal('');
        });
    });
    
})