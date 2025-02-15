var HDWalletProvider = require("@truffle/hdwallet-provider");
var mnemonic =
  "sail access oven pioneer blast annual vessel help method traffic novel bean";

module.exports = {
  contracts_build_directory: "../client/src/contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          "https://rinkeby.infura.io/v3/b005654c891e4a8ba70f98edbf54dfd6"
        );
      },
      network_id: 4,
      gas: 3000000,
      gasPrice: 10000000000,
    },
  },
  compilers: {
    solc: {
      version: "0.8.4",
      settings: {
        optimizer: {
          enabled: false,
          runs: 200,
        },
      },
    },
  },
};
