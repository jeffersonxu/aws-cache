'use strict'
var redis = require("redis");

class Cache{
	constructor(port, host, endpoint){
		this.endpoint = endpoint;
		this.client = redis.createClient(port, host);
	}
	connected(){
		this.client.on("error", function(err){
			console.log(err);
		});
		this.client.on("connect", function () {
		  console.log("Connected: ", this.client);
		});
	}
	set(key, value){
		this.client.set(key, value, redis.print);
	}
	get(key){
		this.client.get(key, function(err, reply) {
			if (err) {
			    console.log(err.toString());
			} else {
			    console.log('Reply: ' + reply);
			    return reply;
			}
		});
	}
}

module.exports = Cache;