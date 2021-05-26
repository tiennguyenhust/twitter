import React from 'react'
import { eth, getInstance } from '../web3/provider' 

import TweetFactory from "../web3/artifacts/TweetFactory.json"

export default class IndexPage extends React.Component {
    async componentDidMount() {
        try {
            await ethereum.enable() // Prompt user to let our DApp access their addresses
            const addresses = await eth.getAccounts() // Get user's ETH addresses
            console.log(addresses)
      
            const balance = await eth.getBalance(addresses[0])
            console.log(balance)
      
            console.log(TweetFactory)
      
            const tweetfactory = await getInstance(TweetFactory)
          } catch (err) {
            console.error("Error!")
            console.error(err)
            console.error(err.stack)
          }
      }
  
    createTweet = async (text) => {
        const tweetfactory = await getInstance(TweetFactory)
  
        try {
        await ethereum.enable()
        const addresses = await eth.getAccounts()
        
        await tweetfactory.createTweet(text, { from: addresses[0]})
        } catch (err) {
        console.error("Err:", err)
        }
    }

    readTweets = async() => {
        const tweetfactory = await getInstance(TweetFactory)
        try {
            const tweets = await tweetfactory.readTweets()
            return tweets;
        } catch (err) {
            console.error("Err:", err)
        }
    }

    updateTweets = async(tweetId, text) => {
        const tweetfactory = await getInstance(TweetFactory)
        
        try {
            await ethereum.enable()
            const addresses = await eth.getAccounts()
            await tweetfactory.updateTweet(tweetId, text, {from: addresses[0]});
        } catch (err) {
            console.error("Err:", err)
        }
    }

    deleteTweets = async(tweetId) => {
        const tweetfactory = await getInstance(TweetFactory)
        
        try {
            await ethereum.enable()
            const addresses = await eth.getAccounts()
            await tweetfactory.deleteTweet(tweetId, {from: addresses[0]});
        } catch (err) {
            console.error("Err:", err)
        }
    }

    render() {
        return (
            <h1>hello world!</h1>
        )
    }
}