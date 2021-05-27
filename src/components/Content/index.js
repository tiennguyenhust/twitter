import React, { useState, useEffect } from "react";
import smartContract from "services/smartContract.js";
import { web3 } from "services/smartContract";

import Tweet from "components/Tweet";

const Content = () => {
	const [account, setAccount] = useState("");
	const [tweets, setTweets] = useState([]);

	const updateTweets = (response) => {
		let newTweets = [];
		console.log(response)
		for (let i = response.length - 1; i >= 0; i--) {
			newTweets.push({
				author: "0x2090984d1044F2C0B6ac138fAe2EDaB58751e617",
				content: response[i].content,
				timestamp: response[i].createdAt,
				id: i,
			});
		}
		setTweets(newTweets);
	};

	useEffect(() => {
		web3.eth.getAccounts().then(setAccount);

		async function listenMMAccount() {
			if (window.ethereum) {
				window.ethereum.on("accountsChanged", async function () {
					const accounts = await web3.eth.getAccounts();
					setAccount(accounts);
				});
			}
		}
		listenMMAccount();
	}, []);

	useEffect(() => {
		// Initial tweet getting
		smartContract.methods.readTweets().call().then(updateTweets);

		let subscription = web3.eth.subscribe("newBlockHeaders", (error) => {
			if (!error) {
				smartContract.methods.readTweets().call().then(updateTweets);
			}
		});

		return subscription.unsubscribe((error, success) => {
			if (success) {
				console.log("Successfully unsubscribed");
			}
		});
	}, []);

	return (
		<div className="mt-6">
			{tweets.map((tweet) => {
				return (
					<Tweet
						key={tweet.id}
						author={tweet.author}
						content={tweet.content}
						timestamp={tweet.timestamp}
						id={tweet.id}
						account={account[0]}
					/>
				);
			})}
		</div>
	);
};

export default Content;
