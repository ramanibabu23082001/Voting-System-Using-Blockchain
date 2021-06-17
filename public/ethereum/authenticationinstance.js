import web3 from './web3'
import Authentication from  './build/Authentication.json'

const instance = new web3.eth.Contract(
  JSON.parse(Authentication.interface),
  '0xc69d7c94b3C532B2026b9751fd368C9E60c72F66'
);

export default instance;
