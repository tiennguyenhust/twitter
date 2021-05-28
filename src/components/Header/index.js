import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CommonStyle from "../../resources/common.css";
import Style from "./index.css";

import smartContract from "services/smartContract.js";

const Header = () => {
	const [tweet, setTweet] = useState("");
	const [error, setError] = useState(null);
	const [currentAccount, setCurrentAccount] = useState(null);

	const handleChange = (event) => {
		setTweet(event.target.value);
	};

	useEffect(() => {
		if (window.ethereum) {
			window.ethereum
				.request({ method: "eth_accounts" })
				.then(handleAccountsChanged)
				.catch((err) => {
					// eslint-disable-next-line no-console
					console.error(err);
				});
		}
	});

	const handleAccountsChanged = (accounts) => {
		if (accounts.length === 0) {
			setError("Please connect to Metamask");
			setCurrentAccount(null);
			document.querySelector('#enableMetamask').classList.add("active");
			document.querySelector('#submitTweet').classList.remove("active");
		
		} else if (accounts[0] !== currentAccount) {
			setCurrentAccount(accounts[0]);
			document.querySelector('#enableMetamask').classList.remove("active");
			document.querySelector('#submitTweet').classList.add("active");
		}
	};

	const enableMetamask = async () => {
		if (window.ethereum) {
			window.ethereum
				.request({ method: "eth_requestAccounts" })
				.then((response) => {
					handleAccountsChanged(response);
					setError(null);
    				document.querySelector('#enableMetamask').classList.remove("active");
    				document.querySelector('#submitTweet').classList.add("active");
				})
				.catch((err) => {
					if (err.code === 40001) {
						setError("Please connect to Metamask");
					} else {
						setError(err);
					}
				});
		} else {
			setError("Your browser does not seem compatible with Ethereum.");
		}
	};

	const handleSubmit = async (tweet) => {
		smartContract.methods.createTweet(tweet).send({ from: currentAccount });
		setError(null);
	};

	return (
		<div>
			<div className="enable-metamask w-full">
				<Button
					id="enableMetamask"
					className="tlt-btn positive-btn active"
					variant="contained"
					onClick={enableMetamask}
					disabled={currentAccount !== null}
				>
					Enable Metamask
				</Button>
			</div>
			<form
				noValidate
				autoComplete="off"
				className="w-full"
				onSubmit={(event) => {
					event.preventDefault();
					handleSubmit(tweet);
				}}
			>
				<div className="tweet-input w-full">
					<TextField
						id="outlined-basic"
						label="Your tweet"
						variant="outlined"
						className="w-full"
						multiline
						onChange={handleChange}
					/>
				</div>
				<div className="tweet-submit w-full flex justify-end">
					<Button
						id="submitTweet"
						className="tlt-btn positive-btn"
						variant="contained"
						type="submit"
						disabled={currentAccount === null}
					>
						Tweet
					</Button>
				</div>
			</form>
			{error && <div className="text-red-600 font-bold">{error}</div>}
		</div>
	);
};

export default Header;
