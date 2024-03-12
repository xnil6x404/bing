exports.name = '/tiktok';
exports.index = async (req, res, next) => {
    var app = require('./main.js');
    var { url, search, username } = req.query
    if(!url && !search && !username) {
      return res.json({
            error: true
        })
    }
    try {
        if (url) {
            var data = await app.getData(url)
            if(data == false) {
              return res.json({
                error: true
              })
            }
            return res.json(data)
        }
        if (search) {
            var data = await app.searchVideo(search)
            if(data == false) {
              return res.json({
                error: true
              })
            }
            return res.json(data)
        }
        if (username) {
            var data = await app.getInfoUser(username)
            if(data == false) {
              return res.json({
                error: true
              })
            }
            return res.json(data)
        }
    } catch (e) {
        return res.json({
            error: true
        })
    }
}
