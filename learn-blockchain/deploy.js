const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {
    interface,
    bytecode
} = require('./compile');

const provider = new HDWalletProvider(
    'decrease better nerve cluster solar rice snack breeze bracket cancel stadium since', // mnenonic
    'https://ropsten.infura.io/vJq5d33uIdKWsf0KwBPH'
);
const web3 = new Web3(provider);
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);
    const rs = await new web3.eth.Contract(JSON.parse(interface)).deploy({
        data: '0x' + bytecode
    }).send({
        from: accounts[0],
        gas: '1000000'
    });

    console.log(interface);
    console.log('Contract deployed at', rs.options.address);
};

deploy();