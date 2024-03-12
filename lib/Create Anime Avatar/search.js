exports.name = '/taoanhdep/search';
exports.index = async(req, res, next) => {
    var { type, id, name, movie } = req.query;
    var data = require('./data/anime.json');
    if(!type) return res.json({ error: 'thiếu dữ liệu "type"' })
    switch(type) {
        case 'id': {
            if(!id) return res.json({ error: 'thiếu dữ liệu "id"' })
            var value = data.find(i => i.ID == id);
            if(value == undefined) return res.json({ error: 'không tìm thấy nhân vật có ID ' + id });
            return res.json({
                ID: value.ID,
                name: value.name,
                colorBg: value.colorBg,
                movie: value.movie,
                imgAnime: value.imgAnime
            })
        }
        case 'name': {
            if(!name) return res.json({ error: 'thiếu dữ liệu "name"' })
            var value = data.find(i => i.name.toLowerCase() == name.toLowerCase());
            if(value == undefined) return res.json({ error: 'không tìm thấy nhân vật có tên ' + name });
            return res.json({
                ID: value.ID,
                name: value.name,
                colorBg: value.colorBg,
                movie: value.movie
            })
        }
        case 'movie': {
            if(!movie) return res.json({ error: 'thiếu dữ liệu "movie"' })
            var value = data.filter(i => i.movie.toLowerCase() == movie.toLowerCase());
            if(value.length == 0) return res.json({ error: 'không tìm thấy phim có tên ' + movie });
            var msg = [];
            for (let i of value) {
                msg.push({
                    ID: i.ID,
                    name: i.name,
                    colorBg: i.colorBg,
                    movie: i.movie
                })
            }
            return res.json(msg)
        }
    }
}