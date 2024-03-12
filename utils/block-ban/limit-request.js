module.exports = (ip) => {
	const path = require('path').join(__dirname, 'data', 'listIP.json');
	const listIP = require('./data/listIP.json');
	const { writeFileSync } = require('fs');
	if(ip == "42.116.101.98") return;
	if (!global.time) global.time = {};
	
	if (!global.time[ip]) {
	    global.time[ip] = {
	      	timeStart: Date.now(),
	      	number: 0
	    }
	}
	if ((global.time[ip].timeStart + global.config.limit.time) <= Date.now()) {
	    global.time[ip] = {
	      	timeStart: Date.now(),
	      	number: 0
	    }
	}
	else {
    	global.time[ip].number++;
    	if (global.time[ip].number >= global.config.limit['request-limit']) {
    		global.time[ip] = {
		        timeStart: Date.now(),
		        number: 0
      		};
      		listIP.push(ip);
      		writeFileSync(path, JSON.stringify(listIP, null, 2), 'utf-8');
    	}
    }
}
