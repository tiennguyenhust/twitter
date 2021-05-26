const TweetFactory = artifacts.require('TweetFactory');

module.exports = (deployer) => {
  deployer.deploy(TweetFactory); 
}
