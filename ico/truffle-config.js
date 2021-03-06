/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = 'decrease better nerve cluster solar rice snack breeze bracket cancel stadium since';
module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    networks: {
      ropsten: {
        provider: new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/vJq5d33uIdKWsf0KwBPH'),
        network_id: '3',
        gas: 4500000
      },
      solc: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  };