var axios = require("axios");
var cheerio = require("cheerio");

module.exports = async function(url) {
  var page = await axios({
    url: "https://unshorten.it/",
    withCredentials: true
  });
  var $ = cheerio.load(page.data);
  var token = $("input[name='csrfmiddlewaretoken']")[0].attribs.value;
  var cookies = page.headers["set-cookie"].map(x => x.split(";")[0]).join(";");
  var lurl = await axios({
    url: "https://unshorten.it/main/get_long_url",
    method: "POST",
    headers: {
      'referer': 'https://unshorten.it/',
      'accept-encoding': 'application/json',
      'cookie': cookies
    },
    data: 'short-url=' + encodeURIComponent(url) + '&csrfmiddlewaretoken=' + token
  });
  return lurl.data["long_url"];
}
