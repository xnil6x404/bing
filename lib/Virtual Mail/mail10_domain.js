exports.name = '/mail10p/domain';
exports.index = async(req, res, next) => {
    const request = require('request');
    var domain = "@mailkept.com\n@promail1.net\n@rcmails.com\n@relxv.com\n@folllo.com\n@fortuna7.com\n@invecra.com\n@linodg.com\n@awiners.com\n@subcaro.com"
    res.json({
        domain: domain
    })
}