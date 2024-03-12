exports.name = '/youtube';
exports.index = async (req, res, next) => {
    var app = require('./main.js');
    var {
        search,
        GetChannelById,
        GetVideoDetails,
        GetVideoId,
        downloadVideo,
        GetPlaylistData,
        GetSuggestData
    } = req.query
    try {
        if (search) {
            var data = await app.GetListByKeyword((search))
            return res.json(data)
        }
        if (GetVideoDetails) {
            var data = await app.GetVideoDetails(GetVideoDetails)
            return res.json(data)
        }
        if (GetVideoId) {
            var data = await app.GetVideoId(GetVideoId)
            return res.json({
                id: data
            })
        }
        if (downloadVideo) {
            var data = await app.downloadVideo(downloadVideo)
            return res.json(data)
        }
    } catch (e) {
        return res.json({
            error: true
        })
    }
}
