exports.name = '/cfsdata';
exports.index = async (req, res, next) => {
	const request = require('request');
	let path = __dirname + `/cfs.json`;
	return res.sendFile(path)
}