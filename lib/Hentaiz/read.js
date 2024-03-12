exports.name = '/hentaiz/read';
exports.index = async(req, res, next) => {
	const data = require('./data/data.json');

	var id = req.query.id;
	var chap = parseInt(req.query.chapter);
	if(!id) return res.json({ error: 'thiếu "id" truyện cần đọc' });
	if(!chap || isNaN(chap)) return res.json({ error: 'thiếu "chapter" truyện cần đọc' });

	var info = data.find(i => i.ID == id);
	if(info == undefined) return res.json({ error: 'không tìm thấy ID này!' });
	var image = info.data[chap-1]
	if(image == undefined) return res.json({ error: 'không tìm thấy chapter này!' });
	var total_chapters = info.data.length
	return res.json({
		error: 0,
		name: info.name,
		total_chapters: total_chapters,
		chapters: chap,
		image: image
	})
}