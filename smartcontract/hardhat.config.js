require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config()
 
module.exports = {
  solidity: "0.8.6",
  paths: {
    artifacts: './src/artifacts',
  },
  defaultNetwork: "fuji",
  networks: {
    hardhat: {
    },
    fuji: {
      url: process.env.QUICKNODE_URL,
      accounts: [`0x` + process.env.PRIVATE_KEY],
      chainId: 43113,
    },
  },
  etherscan: {
    apiKey: process.env.API_KEY
  }
}
