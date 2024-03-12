const dataBank = require('./data/bank.json')
const { join } = require("path");
const pathData = join(__dirname, "cache", "bank.json");
exports.name = '/bank/find';
exports.index = async(req, res, next) => {
	const { readdirSync, readFileSync, writeFileSync, existsSync, copySync } = require('fs-extra');

	const type = req.query.type;
	const ID = req.query.ID;
	const STK = req.query.STK;
	const name = req.query.name;
	if(!type || (!ID && !STK && !name)) return res.json({ status: false, message: 'Missing data!'})
	switch(type) {
		case 'ID': {
			const findSenderID = dataBank.find(i => i.senderID == ID)
			if(findSenderID == undefined) {
				return res.json({
					status: false,
					message: 'No account found for this ID!'
				})
			}
			else {
				return res.json({
					status: true,
					message: {
						name: findSenderID.name,
						senderID: findSenderID.senderID,
						data: {
							money: findSenderID.data.money,
							STK: findSenderID.data.STK,
							debt: findSenderID.data.debt
						}
					}
				})
			}
			break;
		}
		case 'STK': {
			const findSTK = dataBank.find(i => i.data.STK == STK)
			if(findSTK == undefined) {
				return res.json({
					status: false,
					message: 'STK does not exist on the system!'
				})
			}
			else {
				return res.json({
					status: true,
					message: {
						name: findSTK.name,
						senderID: findSTK.senderID,
						data: {
							money: findSTK.data.money,
							STK: findSTK.data.STK,
							debt: findSTK.data.debt
						}
					}
				})
			}
			break;
		}
		case 'name': {
			const findName = dataBank.filter(i => i.name == name)
			if(findName.length == 0) {
				return res.json({
					status: false,
					message: 'No account found for this name!'
				})
			}
			else {
				var data = [];
				for(let i of findName) {
					data.push({
						name: i.name,
						senderID: i.senderID,
						data: {
							money: i.data.money,
							STK: i.data.STK,
							debt: i.data.debt
						}
					})

				}
				return res.json({
					status: true,
					message: {
						data: data
					}
				})
			}
			break;
		}
		default: {
			return res.json({
				status: false,
				message: 'Invalid search method!'
			})
		}
	}
}