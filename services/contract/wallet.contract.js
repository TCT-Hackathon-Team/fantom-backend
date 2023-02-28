const { ethers } = require("ethers");
const { walletABI } = require("../../constants/abi/index");

function getWalletContract(address) {
  const contract = new ethers.Contract(address, walletABI);
  return contract;
}

module.exports = { getWalletContract };
