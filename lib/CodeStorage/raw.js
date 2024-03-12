exports.name = '/upcode/raw';
exports.index = async (req, res, next) => {
  const fs = require('fs')
  const { id } = req.query;
  if(!id) return res.sendFile(global._404);
  try {
    const data = __dirname + '/database/_' + id + '.js'
    const check = fs.readFileSync(data)
    return res.sendFile(data)
  }
  catch(e) {
    console.log(e)
    return res.sendFile(global._404);
  }
}