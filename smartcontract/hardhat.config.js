require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config()
 
module.exports = {
  solidity: "0.8.6",
  paths: {
    artifacts: './src/artifacts',
  },
  defaultNetwork: "testnet",
  networks: {
    hardhat: {
    },
    testnet: {
      url: "https://testnet-rpc.coinex.net",
      accounts: [`0x` + process.env.PRIVATE_KEY],
      chainId: 53,
    },
  },
  etherscan: {
    apiKey: {
      testnet: process.env.API_KEY
    },
    customChains: [
      {
        // network: "testnet",
        chainId: 53,
        urls: {
          apiURL: "https://testnet.coinex.net/api/v1",
          browserURL: "https://testnet.coinex.net"
        }
      }
    ]
  }
  // etherscan: {
  //   apiKey: process.env.API_KEY
  // },
}
