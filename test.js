const express = require('express');
const Cache = require('./cache.js');

//Insert port, host, and endpoint here
let redis = new Cache(6379, 'blacklapel-test.0f6gsj.ng.0001.use2.cache.amazonaws.com', 'test');

const app = express();
app.get('/*', (req, res) => {
	if(req.params[0] !== 'favicon.ico'){
		redis.set(req.params[0], req.params[0] + " test data");
		redis.get(req.params[0]);
	}
	res.send("Testing bananas");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);