exports.name = '/images/twitter';
exports.index = async(req, res, next) => {
    const fs = require('fs-extra');
    try {
        const girl = require('./data/json/tw.json');
        var image = girl[Math.floor(Math.random() * girl.length)].trim();
        res.jsonp({
            data: image,
            count: girl.length
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}