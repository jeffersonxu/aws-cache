const sharp = require('sharp');
const AWS = require('aws-sdk'); 

AWS.config = new AWS.Config();
AWS.config.accessKeyId = "AKIAJCCKUJIVONZRRWUA";
AWS.config.secretAccessKey = "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";
AWS.config.update({region: 'us-west-2'});

const s3 = new AWS.S3({apiVersion: 'latest'});
const standard = { petite: 100, small: 300, mobile: 640, tablet: 1024, retina: 2500 };

module.exports = {
	transform: (key, size, keepAspectRatio = true) => {
		const params = { 
			Bucket: 'blacklapel-ember-assets',
			Key: 'assets/' + key
		};
		return new Promise((res, rej) => { 
			s3.getObject(params, (err, data) => {
				if (err){
					rej(err);
				} else {
					if (data['Body']){
						const img = sharp(data['Body'])
							.resize((typeof size == 'string') ? standard[size] : size.width, size.height);
						if (typeof size === 'object' && keepAspectRatio)
							img.max();
						img.toBuffer().then(data => res(data));		
					} else {
						rej("Error: Body of image does not exist");
					}
				}	
			});    
		});
	}
}