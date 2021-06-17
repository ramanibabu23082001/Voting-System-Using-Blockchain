import web3 from './web3'
import Authentication from  './build/Authentication.json'

const instance = new web3.eth.Contract(
  JSON.parse(Authentication.interface),
  //'0xE890D376332e3998c199Cf9ac164fE182DE62f68'
   '0xedB83c3a75d4D80e60f76fF9cC3C66bD335FcBbB'
);

export default instance;
