exports.name = '/uptimerobot/create';
exports.index = async (req, res, next) => {
    var name = req.query.name || Date.now();
var url = req.query.url
	if(!url) return res.json({
		error: 'thiếu url!'
	})
    var request = require("request");
          
var options = { method: 'POST',
  url: 'https://api.uptimerobot.com/v2/newMonitor',
  headers:
   { 'content-type': 'application/x-www-form-urlencoded',
     'cache-control': 'no-cache' },
  form:
   { api_key: 'u1376899-824406bb41797129b9e16e23',
     format: 'json',
     type: '1',
     url: url,
     friendly_name: name } };
          
request(options, function (error, response, body) {
  if (error) return res.json({ error })
if(JSON.parse(body).stat == 'fail') return res.json({ error: 'lỗi, màn hình này đã tồn tại!' })
var data = JSON.parse(body).monitor
return res.json({
	data
})
});
}