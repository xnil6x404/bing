exports.name = '/game/csgo_random';
const axios = require('axios')
exports.index = async (req, res, next) => {
try{
  const file = require('./cache/csgo_random.json')
 
  const l = file[Math.floor(Math.random() * file.length)];
  res.json(l)
} catch(e){
  res.json({error: "đã xảy ra lỗi"})
}

}