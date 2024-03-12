exports.name = '/game/vuatiengviet';
exports.index = async(req, ress, next) => {
    try {
        const data = require('./data/datawords.json');
	const rdWords = data[Math.floor(Math.random() * data.length)]
        ress.json({
            keyword: rdWords.text,
            author: 'D-Jukie'
        })
    } catch (error) {

    }
}