exports.name = '/facebook/info';
const axios = require('axios')
exports.index = async (req, res, next) => {
  const axios = require("axios");
axios.get(`https://graph.facebook.com/${req.query.uid}?fields=id,is_verified,cover,work,hometown,username,link,name,locale,location,website,birthday,gender,relationship_status,quotes,subscribers.limit(0)&access_token=EAAGNO4a7r2wBO0uO3ztPIxdSP3T2sswddD09c7XY6N1ZAewjQiOiBVaxEJmwt3jThRZAxFg3E5ZBQmW8youAbYOhvMcUnztPEyPuBZAx1Xz95xsfCFuJMZCQZALdMfkCyXBJH5ZCHFNbwhQzujSvFavBZBxlgZBPXEKpNNNaMY8KJVia89TwijZBZB5XgLL3wZDZD`,{
        headers: {
          "cookie":"sb=h4oXZfjL7fJ9HfixFsxkqoDH;datr=h4oXZZfMSzxO6FlvyF6neQL7;c_user=100079667622979;m_page_voice=100079667622979",
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
          "accept": "application/json, text/plain, /"
        }
      }).then(resp => {
  return res.json(resp.data)
  var dj = {
    uid: resp.data.id,
    birthday: resp.data.birthday,
    gender: resp.data.gender,
    relationship_status: resp.data.relationship_status,
    quotes: resp.data.quotes,
    follower: resp.data.subscribers.summary.total_count,
    username: resp.data.username,
    link: resp.data.link,
    name:resp.data.name,
    tichxanh: resp.data.is_verified,
    cover : resp.data.cover,
    work: resp.data.work,
    hometown: resp.data.hometown,
    locale: resp.data.locale,
    location: resp.data.location,
    avtlink: `https://graph.facebook.com/${resp.data.id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`
  }
  res.json(dj)
}).catch(e =>{
  console.log(e)
  res.json({error: e})
})
}