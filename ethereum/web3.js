import Web3 from 'web3'
//const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
 let web3;
//const ganache =require( 'ganache-cli');
//const web3 = new Web3(ganache.provider());
// //assumption users hava metamask web3 injected
///const web3 = new Web3(window.web3.currentProvider);
//window.ethereum.enable();
// //this is for connect the localhost with metamask
 if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
//  //enable  // We are in the browser and metamask is running.
   web3 = new Web3(window.web3.currentProvider);
   window.ethereum.enable();
  } else {
// //   // We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
     'https://goerli.infura.io/v3/730eec436ea24c709ed6ea431286bb00'
    );
   web3 = new Web3(provider);
   
  }
console.log(web3.eth.getAccounts());
  export default web3;
