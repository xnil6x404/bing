exports.name = '/game/dhbcv2';
exports.index = async(req, res, next) => {
    const ress = require("./data/dhbc2.json");
    const length1 = ress.doanhinh.length
    const dataGame = ress.doanhinh[Math.floor(Math.random() * length1)]
    res.json({ dataGame })
}