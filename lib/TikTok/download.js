exports.name = '/tiktok/download';
const axios = require('axios')
exports.index = async (req, res, next) => {
  var link = req.query.link
  const resp = await axios
    .post('https://www.tikwm.com/api/', {
      url: link,
      count: 12,
      cursor: 0,
      hd: 1
    });
  if (resp.status == 200) {
    const ress = resp.data
    return res.jsonp( ress.data );
  } 
  else{
    return res.jsonp({ error: "đã xảy ra lỗi" });
  }
}