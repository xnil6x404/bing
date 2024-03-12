exports.name = '/hentaiz/list';
exports.index = async(req, res, next) => {
	const data = require('./data/data.json');

	const list = []
	for(let i of data) {
		var ID = i.ID
		var name = i.name;
		var author = i.author;
		var total_chapters = i.data.length
		list.push({
			ID,
			name,
			author,
			description: i.des,
			total_chapters
		})
	}
	return res.json(list)
}