exports.name = '/taoanhdep/random';
exports.index = async(req, res, next) => {
  const data = require('./data/anime.json');
  var random = data[Math.floor(Math.random() * data.length)];

	return res.json({
		random
	})
}