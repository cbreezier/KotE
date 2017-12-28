#!/usr/bin/env node
const process = require('process');

if (process.argv.length < 4) {
  console.error(`Usage: ${process.argv[0]} ${process.argv[1]} <address> <becomeKing|getState>`);
  process.exit(1);
}

const contractAddress = process.argv[2];
const method = process.argv[3];

const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');
const solc = require('solc');

const otherAddress = '0x3b66939996f1052367309c0911dce7fc1a1037d1';

const code = fs.readFileSync('KingOfTheEther.sol').toString();
const compiledCode = solc.compile(code)

const contractAbi = JSON.parse(compiledCode.contracts[':KingOfTheEther'].interface)

const KingOfTheEtherContract = new web3.eth.Contract(contractAbi, contractAddress);

const options = {
  from: otherAddress,
  gas: 400000,
  gasPrice: '300000',
  value: 20 * 1e15
};

if (method === 'becomeKing') {
  KingOfTheEtherContract.methods.becomeKing()
    .send(options, (err, hash) => {
      if (err) {
        console.log(err);
      }
      console.log(`TxHash: ${hash}`);
    });
} else if (method === 'getState') {
  KingOfTheEtherContract.methods.getState().call()
    .then((result) => {
      console.log(result);
    });
} else {
  console.error('Invalid method');
}
