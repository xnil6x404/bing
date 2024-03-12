exports.name = '/hentaiz/info';
exports.index = async(req, res, next) => {
	const data = require('./data/data.json');
	var id = req.query.id;
	if(!id) return res.json({ error: 'thiếu "id" truyện cần tìm' })
	var info = data.find(i => i.ID == id);
	if(info == undefined) return res.json({ error: 'không tìm thấy ID này!' });
	var ID = info.ID
	var name = info.name;
	var author = info.author;
	var total_chapters = info.data.length
	return res.json({
		ID,
		name,
		author,
		description: info.des,
		total_chapters
	})
}