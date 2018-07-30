const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = 'decrease better nerve cluster solar rice snack breeze bracket cancel stadium since';
module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    },
    networks: {
      development: {
        host: "localhost",
        port: 8545,
        gas: 6712388,
        gasPrice: 65000000000,
        network_id: "*"
      },
      ropsten: {
        provider: new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/vJq5d33uIdKWsf0KwBPH'),
        network_id: '3',
        gas: 4500000,
        deployedAccount: '0xf7D8350F7Cec54A971CA4c749Fbec100ABbc69b1'
      }
    }
  };