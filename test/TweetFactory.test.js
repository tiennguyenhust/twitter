require("chai").should();

const TweetFactory = artifacts.require("TweetFactory");

contract("TweetFactory", function([user0]) {
    beforeEach(async () => {
        this.TweetFactory = await TweetFactory.new();
    });

    describe("Createing new Tweet", () => {
        it("should create new tweet from a context", async () => {
            _context = "Hello, I am Sherlock!";
            this.TweetFactory.createTweet(_context);

            firstTweet = await this.TweetFactory.tweets.call([0]);
            console.log(firstTweet.context + ": " + firstTweet.createdAt);

            _context2 = "I am a detective!";
            this.TweetFactory.createTweet(_context2);

            secondTweet = await this.TweetFactory.tweets.call([1]);
            console.log(secondTweet.context + ": " + secondTweet.createdAt);

            firstTweet.context.should.equal(_context);
            secondTweet.context.should.equal(_context2);
        });
    });

    describe("Reading all tweets", () => {
        it("should return all tweets", async () => {
            tweets = this.TweetFactory.readTweets();
            console.log("====== All Tweets========");
            console.log(tweets);

            for (var i=0; i<tweets.length; i++){
                tweet = await this.TweetFactory.tweets.call([i]);
                tweet.should.equal(tweets[i]);
            }
        });
    });
    
})