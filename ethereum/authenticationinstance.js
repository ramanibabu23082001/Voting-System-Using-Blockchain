import web3 from './web3'
import Authentication from  './build/Authentication.json'

const instance = new web3.eth.Contract(
  JSON.parse(Authentication.interface),
  '0x42ba4b6fD3594856ffB4203dD0ABd0b417B344Af'
);

export default instance;
