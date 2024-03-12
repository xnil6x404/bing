exports.name = '/soundcloud';
exports.index = async (req, res, next) => {
    var app = require('./main.js');
    var { search, limit, url } = req.query
    if(!search && !url) {
        return res.json({
            error: true
        })
    }
    try {
        if (search) {
            var data = await app.search(search, limit)
            return res.json(data)
        }
        if (url) {
            var data = await app.getData(url)
            return res.json(data)
        }
    } catch (e) {
        return res.json({
            error: true
        })
    }
}
