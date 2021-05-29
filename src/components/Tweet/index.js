/* eslint-disable import/no-unresolved */
import React, { useState } from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import smartContract from "services/smartContract.js";
import { web3 } from "services/smartContract";
import CommonStyle from "../../resources/common.css";
import Style from "./index.css";

const moment = require("moment");

const Tweet = ({ author, content, timestamp, id, account }) => {
	const [edit, setEdit] = useState(false);
	const [editClassList, setEditClassList] = useState("edit-btn tlt-btn positive-btn active");
	const [tweet, setTweet] = useState("");
	const [error, setError] = useState(null);

	const handleEdit = () => {
		if (!edit) {
			setEdit(true);
			setEditClassList("edit-btn tlt-btn positive-btn");
		} else {
			setEdit(false);
			setEditClassList("edit-btn tlt-btn positive-btn active");
		}
	};

	const cancelEdit = () => {
		setEdit(false);
		setEditClassList("edit-btn tlt-btn positive-btn active");
	};

	const handleDelete = async () => {
		try {
			const userAccount = await web3.eth.getAccounts();
			smartContract.methods
				.deleteTweet(id)
				.send({ from: userAccount[0] });
		} catch (error) {
			setError("Something went wrong. Please try again.");
		}
	};

	const handleChange = (event) => {
		setTweet(event.target.value);
	};

	const handleSubmit = async () => {
		const userAccount = await web3.eth.getAccounts();
		smartContract.methods
			.updateTweet(id, tweet)
			.send({ from: userAccount[0] })
			.then(() => {
				setEdit(false);
			});
	};

	return (
		<div className="tweet-block border p-3 hover:bg-gray-100">
			<div className="w-full flex justify-between">
				<div className="flex flex-row content-center justify-center">
					<div className="font-bold break-all">{author}</div>
					<div className="px-1">·</div>
					<div className="text-gray-600">
						{moment.unix(timestamp).fromNow()}
					</div>
				</div>
			</div>
			<div className="mt-2">{content}</div>
			{edit && (
				<form
					noValidate
					autoComplete="off"
					className="w-full flex justify-between mt-3"
					onSubmit={(event) => {
						event.preventDefault();
						handleSubmit(tweet);
					}}
				>
					<div className="w-4/6 pr-1">
						<TextField
							id="outlined-basic"
							label="Your updated tweet"
							variant="outlined"
							className="w-full"
							multiline
							onChange={handleChange}
						/>
					</div>
					<div className="pl-1 w-2/6 h-14">
						<Button
							className="tlt-btn positive-btn active"
							variant="contained"
							onClick={cancelEdit}
						>
							Cancel
						</Button>
						<Button
							className="tlt-btn positive-btn active"
							variant="contained"
							color="primary"
							type="submit"
						>
							Update
						</Button>
					</div>
				</form>
			)}
			{author == account && (
				<div className="flex flex-row justify-end mt-2">
					<Button
						className={editClassList}
						variant="contained"
						onClick={handleEdit}
						disabled={edit}
					>
						Edit
					</Button>
					<Button 
						className="tlt-btn negative-btn active"
						variant="contained"
						onClick={handleDelete}
					>
						Delete
					</Button>
				</div>
			)}
			{error && <div className="text-red-600 font-bold">{error}</div>}
		</div>
	);
};

Tweet.propTypes = {
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	timestamp: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	account: PropTypes.string,
};

export default Tweet;
