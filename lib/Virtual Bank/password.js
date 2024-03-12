const dataBank = require('./data/bank.json')
const { join } = require("path");
const pathData = join(__dirname, 'data', "bank.json");
exports.name = '/bank/password';
exports.index = async(req, res, next) => {
	var { writeFileSync} = require('fs-extra');

	var type = req.query.bka
	var senderID = req.query.dka
	var newPassword = req.query.fka

	if(!type || !senderID) return res.json({ status: false, message: 'Missing data!'})
	var findTk = dataBank.find(i => i.senderID == senderID)
	if(!findTk) {
		return res.json({
			status: false,
			message: 'Your account was not found!'
		})
	}
	switch(type) {
		case 'get': {
			return res.json({
				status: true,
				message: {
					noti: 'Your password!',
					name: findTk.name,
					STK: findTk.data.STK,
					password: findTk.data.password
				}
			})
		}
		case 'recovery': {
			if(!newPassword) return res.json({ status: false, message: 'Please enter new password!'})
			findTk.data.password = newPassword
			writeFileSync(pathData, JSON.stringify(dataBank, null, 4), "utf-8");	
			return res.json({
				status: true,
				message: {
					noti: 'Password change successful!',
					name: findTk.name,
					STK: findTk.data.STK,
					password: findTk.data.password
				}
			})
		}
		default: {
			return res.json({ status: false, message: 'the method you selected is not available' });
		}
	}
}