exports.name = '/hentaiz/data1';
exports.index = async(req, res, next) => {
    let dirPath = __dirname + `/data/donggop.json`;
    return res.sendFile(dirPath)
}