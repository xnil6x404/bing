const dataBank = require('./data/bank.json')
const { join } = require("path");
const pathData = join(__dirname, 'data', "bank.json");
exports.name = '/bank/get';
exports.index = async(req, res, next) => {
	var { readdirSync, readFileSync, writeFileSync, existsSync, copySync } = require('fs-extra');

	var senderID = req.query.ID
	var money = req.query.money
	var password = req.query.password

	if(!senderID || !money || !password) return res.json({ status: false, message: 'Thiếu dữ liệu!'})
	var findTk = dataBank.find(i => i.senderID == senderID)
	if(!findTk) {
		return res.json({
			status: false,
			message: 'Your account was not found!'
		})
	}
	if(password !== findTk.data.password) {
		return res.json({
			status: false,
			message: 'Wrong password'
		})
	}
	else {
		var moneyG = findTk.data.money
		if(moneyG < money) {
			return res.json({
				status: false,
				message: 'The balance is not enough to make the transaction!'
			})
		}
		findTk.data.money = findTk.data.money - parseInt(money)
		writeFileSync(pathData, JSON.stringify(dataBank, null, 4), "utf-8");	
		return res.json({
			status: true,
			message: {
				noti: 'Withdraw money successfully!',
				name: findTk.name,
				money: `${moneyG} - ${money} = ${moneyG - parseInt(money)}`
			}
		})
	}
}