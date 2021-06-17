import web3 from './web3'
import ElectionFactory from  './build/ElectionFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(ElectionFactory.interface),
  '0xf3C9E98C9c63c2607aCA26985fe5091c80Bd7e3c'
  //'0xE4577c98aB8854193472254B5BCB02d8BA506268'
);
export default instance;
 //'0xA26473338cEA7d76EBcF07272F90b6335b097506'localhost
 //'0x863066027eb0fe298912faa3B9Dc05Ffd72fe77F'previous