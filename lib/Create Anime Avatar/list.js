exports.name = '/taoanhdep/list';
exports.index = async(req, res, next) => {
    const data = require('./data/anime.json');
	var msg = []
	for(var i of data) {
		msg.push({
			ID: i.ID,
			name: i.name,
			colorBg: i.colorBg,
			movie: i.movie
		})
	}
	return res.json({
		anime_List: msg
	})
}