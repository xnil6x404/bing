exports.name = '/slink';
exports.index = async (req, res, next) => {
  const database = require('./data.json');
  const fs = require('fs');
  const path = require('path').join(__dirname, 'data.json');
  const { id, url } = req.query;
  if(!id && !url) return res.json({ error: 'thiếu dữ liệu!'} );
  if(id) {
    const fLink = database.find(i => i.id == id);
    if(fLink == undefined) {
      return res.sendFile(global._404);
    }
    return res.redirect(fLink.url);
  }
  if(url) {
    if(isValidHttpUrl(url) == false) return res.json({ error: 'dữ liệu nhập vào không phải là một liên kết!'})
    var idUrl = ((Math.random() + 1).toString(36).substring(5)).toUpperCase()
    database.push({
      id: idUrl,
      url: decodeURIComponent(url)
    })
    fs.writeFileSync(path, JSON.stringify(database, null, 2), 'utf-8');
    return res.json({
      status: true,
      url: 'https://docs-api.nguyenhaidang.ml/slink?id=' + idUrl
    })
  }
}
function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}