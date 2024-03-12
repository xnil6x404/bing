const dataBank = require('./data/bank.json')
exports.name = '/bank/check';
exports.index = async(req, res, next) => {
    var some = dataBank.some(i => i.senderID == req.query.ID)
    return res.json({
        status: some
    })
}