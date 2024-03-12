exports.name = '/tiktok/trending';
const axios = require('axios')
exports.index = async (req, res, next) => {

 const resp = await axios
          .post('https://www.tikwm.com/api/feed/list', {
            region: 'VN',
            'count': 20,
            hd: 1
          });
  if (resp.status == 200) {
    const ress = resp.data
    return res.jsonp( ress );
  } 
  else{
    return res.jsonp({ error: "đã xảy ra lỗi" });
  }
}