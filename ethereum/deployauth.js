const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledAuthentication = require('./build/Authentication.json');
//const ganache = require('ganache-cli');
//HDWalletProvider it synmatiously specify which account to unlock 
// const provider=new HDWalletProvider(
//   'virus guard flee puzzle wild output describe raccoon script merge bitter ecology',
//   'https://goerli.infura.io/v3/730eec436ea24c709ed6ea431286bb00'//(rinkby infura api)
// );//for worldhost network devloping use localhost
//web3 gives all deploy contract and send money bcz unlock the account
// const web3 = new Web3(provider);

//const web3 = new Web3(ganache.provider());
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
 // console.log(accounts[0]);
  console.log('Attempting to deploy from account', accounts[0]);
  result = await new web3.eth.Contract(JSON.parse(compiledAuthentication.interface))
  .deploy({ data: compiledAuthentication.bytecode })
  .send({ from: accounts[0], gas: '1000000' });
  // const result = await new web3.eth.Contract(
  //   JSON.parse(compiledAuthentication.interface)
  // )
  //   .deploy({ data: compiledAuthentication.bytecode })
  //   .send({ gas: '8000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();
