'use strict';
const express = require('express');
var sharp = require('./class.js');
const AWS = require('aws-sdk'); 

AWS.config = new AWS.Config();
AWS.config.accessKeyId = "AKIAJCCKUJIVONZRRWUA";
AWS.config.secretAccessKey = "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";
AWS.config.update({region: 'us-west-2'});

const s3 = new AWS.S3({apiVersion: 'latest'});

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

var temp = { width: 200, height: 200 };	
const regex = /(.*\/)/;
const encoding = /(\.jpg|\.png|\.jpeg|\.gif)/;
const search = ['petite', 'small', 'mobile', 'tablet', 'retina'];

const app = express();
app.get('/*', (req, res) => {
	const path = req.params[0];
	var size = "", variant = "", keySource = "";
	
	const ext = path.substring(path.lastIndexOf('.'));
	const folder = path.substring(0, path.lastIndexOf('/') + 1);
	const segments = path.replace(regex, '').split('-');
	segments[segments.length -1] = segments[segments.length - 1].replace(encoding, '');

	if(search.indexOf(segments[segments.length - 1]) >= 0){
		size = segments.pop(); }
	variant = segments.pop();

	if(segments === undefined || segments.length == 0){
		keySource = folder + variant + ext;
	} else {
		const slug = segments.join('-');
		keySource = folder + slug + '-' + variant + ext; }

	const img = sharp.transform(keySource, size);
	img.then(data => {
        res.writeHead(200, {
            'Content-Type': 'image/jpeg',
            'Content-Length': data.length
     	});

     //    const params = { 
     //        Bucket: 'blacklapel-ember-assets',
     //   		Key: 'assets/' + path,
     //   		Body: data
     //   	};
   		// s3.upload(params, function(err, d){
   		//     if(err) throw err
     //      	console.log(`File uploaded successfully at ${d.Location}`);
   		// });

        return (res.end(data));
	}).catch(err => console.log(err));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);