exports.name = '/game/dovui';
exports.index = async(req, res, next) => {
const resp = require("./data/dovui.json");
const length = resp.length
return res.json({ 
	author: 'D-Jukie',
	data: resp[Math.floor(Math.random() * length)]
 })
}