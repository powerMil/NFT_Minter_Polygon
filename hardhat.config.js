require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const {
  ALCHEMY_RPC_URL,
  PRIVATE_KEY
} = process.env;

module.exports = {
  networks: {
    mumbai: {
      url: ALCHEMY_RPC_URL,
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: "0.8.20",
};
