import { KeyboardReturn } from '@material-ui/icons';

var QRCode = require('qrcode');
var QrCode = require('qrcode-reader');
async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const data = req.body;
  const { id } = data;
		QRCode.toDataURL(id, function (err, url) {
			console.log(url);
			var im = url.split(",")[1];
			var img = new Buffer(im, 'base64');
            console.log("qr");
	 	res.writeHead(200, {
				'Content-Type': 'image/png',
				'Content-Length': img.length,
				'Content-Disposition': 'attachment; filename="Voter_QR.png"'
			});
				
		})
	
}

export default handler;


