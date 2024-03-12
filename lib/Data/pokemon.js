exports.name = '/pokemon/search';
const stringSimilarity = require('string-similarity');
exports.index = async(req, res, next) => {
    const poke = require('./data/pokemon/pokemon.json');
    const list = require('./data/pokemon/listName.json');
    const request = require('request');
    var namePoke = req.query.name
    if (!namePoke) return res.jsonp({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });
    var checker = stringSimilarity.findBestMatch(namePoke.charAt(0).toUpperCase() + namePoke.slice(1), list)
    if (checker.bestMatch.rating >= 1) s = checker.bestMatch.target;
    var search = checker.bestMatch.target;
    var find = poke.find(info => info.name.english == search)
    return request(encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=vi&dt=t&q=${find.description}`), (err, response, body) => {
        var retrieve = JSON.parse(body);
        var text = '';
        retrieve[0].forEach(item => (item[0]) ? text += item[0] : '');
        var fromLang = (retrieve[2] === retrieve[8][0][0]) ? retrieve[2] : retrieve[8][0][0]
        res.jsonp({
            pokemon: {
                id: find.id,
                name: find.name.english,
                type: find.type,
                base: find.base,
                species: find.species,
                description: text,
                evolution: find.evolution,
                profile: find.profile,
                image: find.hires
            },
            author: 'D-Jukie'
        })
    })
}