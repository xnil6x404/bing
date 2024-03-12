exports.name = '/images/wallpaper';
const cheerio = require("cheerio")
const axios = require("axios")
const qs = require("qs")
exports.index = async (req, res, next) => {
  const query = req.query.q
  axios.get('https://www.wallpaperflare.com/search?wallpaper='+ query,{
			headers: {
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "_ga=GA1.2.1687805424.1659404793; _gid=GA1.2.207306077.1659404793; __gads=ID=180a8dc84ba486a8-228fe01468d5005b:T=1659404754:RT=1659404754:S=ALNI_MYKyYUVdRZkf9fQHbqZ_pWbxlFS5g; __gpi=UID=0000082771779007:T=1659404754:RT=1659404754:S=ALNI_MbP_5p8zTpiuluWHudHo-RKEAKi0w"
			}
		})
		.then(({ data }) => {
			const $ = cheerio.load(data)
			const result = [];
			$('#gallery > li > figure > a').each(function(a, b) {
				result.push($(b).find('img').attr('data-src'))
			})
			res.jsonp(result)
		})
}