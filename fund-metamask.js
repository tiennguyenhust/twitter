// Edit the receiver to your metamask address to receive 10 wei
const receiver = "0x2090984d1044F2C0B6ac138fAe2EDaB58751e617";
const amount = web3.utils.toWei("10", 'ether');

module.exports = async function(callback) {
  const addresses = await web3.eth.getAccounts()

  web3.eth.sendTransaction({
    from: addresses[1],
    to: receiver, 
    value: amount
  }, callback)
}