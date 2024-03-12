exports.name = '/cfs';
exports.index = async (req, res, next) => {
    const request = require('request');
    var message = req.query.message;
    var senderID = req.query.senderID;
    var name = req.query.name;
    const data = require('./cfs.json');
    const fs = require('fs');
    const path = require('path');
    const path_Write = path.join(__dirname, 'cfs.json');
    const moment = require("moment-timezone");
    const time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss DD/MM/YYYY");
    data.push({
        name: name,
        senderID: senderID,
        message: message,
        react: 0,
        time: time
    })
    fs.writeFileSync(path_Write, JSON.stringify(data, null, 2), 'utf-8');
    return res.json({
        name: name,
        senderID: senderID,
        content: message,
        time: time
    })
}