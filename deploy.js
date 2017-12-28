const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');
const solc = require('solc');

const ownerAddress = '0x92def74b66e0a22fdebd3d24723ae86c530401d9';

const code = fs.readFileSync('KingOfTheEther.sol').toString();
const compiledCode = solc.compile(code)

console.log(compiledCode);

const contractAbi = JSON.parse(compiledCode.contracts[':KingOfTheEther'].interface)
const contractCode = compiledCode.contracts[':KingOfTheEther'].bytecode

const KingOfTheEtherContract = new web3.eth.Contract(contractAbi);

KingOfTheEtherContract.deploy({
  data: contractCode
})
.send({
  from: ownerAddress,
  gas: 4000000,
  gasPrice: '300000'
})
.then((contractInstance) => {
  console.log(JSON.stringify(contractInstance));
  console.log(`Address: ${contractInstance.options.address}`);
});
