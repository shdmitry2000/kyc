import Web3 from 'web3';

const HDWalletProvider = require("@truffle/hdwallet-provider");
//const Web3HDWalletProvider = require("web3-hdwallet-provider");
const fs = require("fs");
//
const projectId  =  "22061bf4f360438997f0055e5c095cf4"
const E_MNEMONIC = process.env.MNEMONIC;
const mnemonic = "mixed exercise gorilla coyote response trap actual wife poem bus typical reform";


//export default new Web3(
//  new Web3.providers.HttpProvider(
//    `http://127.0.0.1:7545`,
//  )
//);


//export default new Web3(
//  new Web3.providers.HttpProvider(
//    //`http://127.0.0.1:7545`,
//    `http://52.39.220.74:8545`,
//  )
//);

const NODE_API_KEY = process.env.INFURA_KEY || process.env.ALCHEMY_KEY;
const isInfura = !!process.env.INFURA_KEY;
//const provider =new HDWalletProvider(mnemonic, "wss://rinkeby.infura.io/ws/v3/22061bf4f360438997f0055e5c095cf4");
//const provider =new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/22061bf4f360438997f0055e5c095cf4");
const provider =new HDWalletProvider(mnemonic, "wss://ropsten.infura.io/ws/v3/22061bf4f360438997f0055e5c095cf4");
export default new Web3(provider.engine);











//export default new Web3(
//
//  new Web3.providers.HttpProvider(
//    'https://ropsten.infura.io/v3/22061bf4f360438997f0055e5c095cf4',
//  ),
//);


//const new_web3 = new Web3();
//new_web3.setProvider(provider);

//web3 = new Web3(provider.engine)

//const w = new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/22061bf4f360438997f0055e5c095cf4")
//web3 = new Web3(w.engine)




