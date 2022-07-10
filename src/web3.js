import Web3 from 'web3';

const HDWalletProvider = require("@truffle/hdwallet-provider");
//const Web3HDWalletProvider = require("web3-hdwallet-provider");
const fs = require("fs");
//
const projectId  =  "22061bf4f360438997f0055e5c095cf4"
const E_MNEMONIC = process.env.MNEMONIC;
const mnemonic = "mixed exercise gorilla coyote response trap actual wife poem bus typical reform";

/*
export default new Web3(
  new Web3.providers.HttpProvider(
    `http://127.0.0.1:7545`,
  )
);
*/

/*

const provider =new HDWalletProvider(mnemonic, "wss://eth-ropsten.alchemyapi.io/v2/P_rlamgm0Xce7MJzZCHpg4mnXUu5gzTZ");
export default new Web3(provider.engine);
web3.eth.handleRevert = true;
*/

/*
export default new Web3(

  new Web3.providers.HttpProvider(
    'https://ropsten.infura.io/v3/22061bf4f360438997f0055e5c095cf4',
  ),
);

*/

/*
export default new Web3(

  new Web3.providers.HttpProvider(
    'https://eth-goerli.g.alchemy.com/v2/UQWhNDhfOyVZTqPtWkgnh_yonzoHFroV',
  ),
);

*/


const provider =new HDWalletProvider(mnemonic, "wss://eth-goerli.g.alchemy.com/v2/UQWhNDhfOyVZTqPtWkgnh_yonzoHFroV");
export default new Web3(provider.engine);
//web3.eth.handleRevert = true;







//const new_web3 = new Web3();
//new_web3.setProvider(provider);

//web3 = new Web3(provider.engine)

//const w = new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/22061bf4f360438997f0055e5c095cf4")
//web3 = new Web3(w.engine)




