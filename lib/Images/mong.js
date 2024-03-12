exports.name = '/images/mong';
exports.index = async(req, res, next) => {
    const fs = require('fs-extra');
    try {
        const girl = require('./data/json/mong.json');
        var image = girl[Math.floor(Math.random() * girl.length)].trim();
        res.jsonp({
            data: image,
            count: girl.length
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}