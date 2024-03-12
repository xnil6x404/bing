exports.name = '/random/useragent';
exports.index = async(req, res, next) => {
    const data = require("./data/useragent.json");
    const dataGame = data[Math.floor(Math.random() * data.length)]
    return res.json(dataGame)
}