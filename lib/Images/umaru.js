exports.name = '/images/umaru';
exports.index = async(req, res, next) => {
    const fs = require('fs-extra');
    try {
        let dirPath = __dirname + `/data/txt/umaru.txt`;
        var imageList = (fs.readFileSync(dirPath, "utf-8").split(/\r?\n/));
        var randomImage = imageList[Math.floor(Math.random() * imageList.length)].trim();
        res.jsonp({
            data: randomImage,
            count: imageList.length
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}