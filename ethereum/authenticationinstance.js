import web3 from './web3'
import Authentication from  './build/Authentication.json'

const instance = new web3.eth.Contract(
  JSON.parse(Authentication.interface),
  '0xd1Bf162DF87e8C9F257BA690f3A8b75320Be9AD8'
);

export default instance;
