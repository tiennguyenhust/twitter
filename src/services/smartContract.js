// import abi from "./abi";
import TweetFactory from "./TweetFactory.json"

let Web3 = require("web3");

export const address = "0xfA6815F402dBb0B3Cf2630334Ee9385524098051";

export const web3 = new Web3(
	window.ethereum ||
		new Web3.providers.WebsocketProvider(
			"wss://ropsten.infura.io/ws/v3/0418d0934f9843e082c9d4f274a22415"
		)
);

if (window.ethereum) window.ethereum.autoRefreshOnNetworkChange = false;

const smartContract = new web3.eth.Contract(TweetFactory.abi, address);

export default smartContract;
