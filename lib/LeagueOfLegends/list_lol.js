exports.name = '/lol/list';
const stringSimilarity = require('string-similarity');
exports.index = async(req, res, next) => {
    const champ_names = require('./data/lollist.json');
    const request = require('request');
    res.jsonp({
        count: champ_names.length,
        champ_names,
        author: 'D-Jukie'
    });
}