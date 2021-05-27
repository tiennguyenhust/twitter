// import abi from "./abi";
import TweetFactory from "./TweetFactory.json"

let Web3 = require("web3");
export const address = "0xe7af88CaAe4412837465219E2E1a26Ec84cE8759";
// from 0x2090984d1044F2C0B6ac138fAe2EDaB58751e617

export const web3 = new Web3(
	window.ethereum ||
		new Web3.providers.WebsocketProvider(
			"wss://ropsten.infura.io/ws/v3/ec32ce1a86c044838f15d8379562b1b1"
		)
);

if (window.ethereum) window.ethereum.autoRefreshOnNetworkChange = false;

const smartContract = new web3.eth.Contract(TweetFactory.abi, address);

export default smartContract;
