exports.name = '/taoanhdep/data';
exports.index = async(req, res, next) => {
    let dirPath = __dirname + `/data/anime.json`;
    return res.sendFile(dirPath)
}