exports.name = '/twitter/video';
const axios = require('axios')
const qs = require("qs")
const cheerio = require('cheerio')
exports.index = async (req, res, next) => {
const url = req.query.url;
        let config = {
            'URL': url
        }
  axios.post('https://twdown.net/download.php',qs.stringify(config),{
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "cookie": "_ga=GA1.2.1014895379.1658669403; gt=1554103655133229056; external_referer=padhuUp37zjgzgv1mFWxJ12Ozwit7owX|0|8e8t2xd8A2w%3D; _gid=GA1.2.1022855138.1659362200; g_state={i_l:0}; _gat=1"
            }
        })
        .then(({ data }) => {
        const $ = cheerio.load(data)
      res.jsonp({
        desc: $('div:nth-child(1) > div:nth-child(2) > p').text().trim(),
                thumb: $('div:nth-child(1) > img').attr('src'),
                HD: $('tbody > tr:nth-child(1) > td:nth-child(4) > a').attr('href'),
                SD: $('tr:nth-child(2) > td:nth-child(4) > a').attr('href'),
                audio: 'https://twdown.net/' + $('tr:nth-child(4) > td:nth-child(4) > a').attr('href')
      })
        })
}