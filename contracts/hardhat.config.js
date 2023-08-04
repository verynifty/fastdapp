/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomicfoundation/hardhat-toolbox");

require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

//
// Select the network you want to deploy to here:
//
const defaultNetwork = "goerli";

module.exports = {
  defaultNetwork,
  networks: {
    hardhat: {
      forking: {
        url: `https://mainnet.infura.io/v3/${process.env.INFURA}`,
        blockNumber: 15409855,
        // accounts: [process.env.KEY],
      },
    },
    localhost: {
      url: "http://localhost:8545",
      allowUnlimitedContractSize: true,
      timeout: 1800000,

      /*
            notice no mnemonic here? it will just use account 0 of the hardhat node to deploy
            (you can put in a mnemonic here to set the deployer locally)
      */
    },

    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA}`,
      // accounts: [process.env.KEY],
      accounts: [process.env.KEY],
      gasPrice: 23000000000,
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA}`,
      // accounts: [process.env.KEY],
      accounts: [process.env.KEY],
      gasPrice: 19000000000,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA}`,
      // accounts: [process.env.KEY],
      accounts: [process.env.KEY],
      gasPrice: 19000000000,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA}`,
      // accounts: [process.env.KEY],
      accounts: [process.env.KEY],
    },
    arbitrum: {
     url: "https://arb1.arbitrum.io/rpc",
     accounts: [process.env.KEY],
   },
   arbitrumOne: {
     url: "https://arb1.arbitrum.io/rpc",
     accounts: [process.env.KEY],
   }
  },
  etherscan: {
   apiKey:{
     arbitrumOne: "",
   },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
};