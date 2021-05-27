import React from 'react'
import { eth, getInstance } from '../web3/provider' 
import { Page, Center } from "../components/Layout"
import TweetFactory from "../web3/artifacts/TweetFactory.json"
// import Button from "../components/Button"
import Modal from "../components/Modal"

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
            <Page>
                <Center>
                <h2>
                    A <mark>decentralized</mark>, <mark>uncensorable</mark> Twitter clone built on Ethereum
                </h2>

                <div className="right-side">
                    <div className="disclaimer">
                    <p>
                        MetaMask will automatically open and ask you to confirm a transaction.
                    </p>
                    <p>
                        Please note that creating an account on the Ethereum blockchain costs a small amount of Ether.
                    </p>
                    </div>
                </div>
                </Center>

                <style jsx global>{`
                html, body {
                    min-height: 100%;
                }
                body {
                    background-color: #262740;
                    background-image: url("/static/images/landing-bg.jpg");
                    background-size: cover;
                    background-position: center center;
                }
                `}</style>

                <style jsx>{`
                h2 {
                    font-size: 50px;
                    color: #FFFFFF;
                    line-height: 78px;
                    position: relative;
                    text-transform: uppercase;
                    max-width: 520px;
                    display: inline-block;
                }
                mark {
                    color: inherit;
                    background-color: #9F99EC;
                    padding: 0 7px;
                }
                .right-side {
                    float: right;
                    position: relative;
                    max-width: 320px;
                    text-align: center;
                    margin-top: 120px;
                }
                .right-side :global(svg) {
                    position: absolute;
                    margin-left: -46px;
                    margin-top: -8px;
                }
                .disclaimer {
                    font-size: 14px;
                    color: rgba(255,255,255,0.8);
                    line-height: 23px;
                    font-weight: 400;
                    margin-top: 23px;
                }
                `}</style>
            </Page>
        )
    }
}