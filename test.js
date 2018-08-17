const express = require('express');
const Cache = require('./cache.js');

let test = new Cache(6379, 'blacklapel-test.0f6gsj.ng.0001.use2.cache.amazonaws.com', 'test');
const app = express();
app.get('/*', (req, res) => {
	res.send('Hello world\n');
	console.log(req.params[0]);

	test.connected();
	test.set("test key", "test value");
	let data = test.get("test key");
	if(data === null){
		console.log('wow it be null');
	}
	else{
		console.log(data);
	}
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);