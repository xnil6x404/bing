exports.name = '/hentaiz/data';
exports.index = async(req, res, next) => {
    let dirPath = __dirname + `/data/data.json`;
    return res.sendFile(dirPath)
}