'use strict'
var redis = require("redis");

class Cache{
	constructor(port, host, endpoint){
		this.endpoint = endpoint;
		this.client = redis.createClient(port, host);
		this.client.on("error", function(err){
			console.log(err);
		});
		this.client.on("connect", function () {
			console.log("Connected to " host + ":" + port + "\n");
		});
	}
	connected(){
		return this.client.connected;
	}
	set(key, value){
		this.client.set(key, value, redis.print);
		console.log(key + " successfully set to " + value);
	}
	get(key){
		this.client.get(key, function(err, reply) {
			if (err) {
			    console.log(err.toString());
			} else {
				if(reply == null){
					console.log(key + " doesn't exist. Proceed with GET");
					//data = GET
					//this.set(key, data);
				}
			    console.log(reply);
			}
		});
	}
}

module.exports = Cache;