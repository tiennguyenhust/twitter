require("chai").should();

const TwitterFactory = artifacts.require("TwitterFactory");

contract("TwitterFactory", function([user0]) {
    beforeEach(async () => {
        this.TwitterFactory = await TwitterFactory.new();
    });

    describe("Createing new Twitt", () => {
        it("should create new twitt from a context", async () => {
            _context = "Hello, I am Tien!";
            this.TwitterFactory.createTwitter(_context);

            firstTwitt = await this.TwitterFactory.twitters.call([0]);
            console.log(firstTwitt);
            firstTwitt.context.should.equal(_context);
        });
    });
})