exports.name = '/facebook/video';
'use strict';
const axios = require('axios')
exports.index = async (req, res, next) => {
 var url = req.query.url
  var axios = require("axios");
  var data = {
    "sec-fetch-user": "?1",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-site": "none",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "cache-control": "max-age=0",
    authority: "www.facebook.com",
    "upgrade-insecure-requests": "1",
    "accept-language": "en-GB,en;q=0.9,tr-TR;q=0.8,tr;q=0.7,en-US;q=0.6",
    "sec-ch-ua": '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    cookie: "datr=el8aZY-rwmiyoaQ6Ezhq-5iS;sb=el8aZZOlksdhrY5U86-_x5Vd;ps_l=0;ps_n=0;vpd=v1%3B680x360x2;c_user=61551417599375;xs=40%3A7SW5pfCx24NYUA%3A2%3A1709318063%3A-1%3A-1;m_page_voice=61551417599375;fr=07Gekl6GAP4j46Nlv.AWUtNY0VOiOGaWzQ5tYXtlZUOWA.Bl1jZM..AAA.0.0.Bl6dfc.AWX6WA_Do94;locale=bn_IN;usida=eyJ2ZXIiOjEsImlkIjoiQXNhNnpzOGprM3Y5ZiIsInRpbWUiOjE3MTAxNzU0MDB9;cppo=1;wd=1024x1934;presence=EDvF3EtimeF1710175468EuserFA261551417599375A2EstateFDutF0CEchF_7bCC;wl_cbv=v2%3Bclient_version%3A2431%3Btimestamp%3A1710178188;"
  };
  /**
   * @param {string} callbackId
   * @return {?}
   */
  var wrap = function getValue(callbackId) {
    return JSON.parse('{"text": "' + callbackId + '"}').text;
  };
  return new Promise(function (resolve) {
     if (!url || !url.trim()) {
       return res.jsonp("Missing facebook url");
     }
     if (!url.includes("facebook.com")) {
       return res.jsonp("Please enter a valid facebook video!");
  }
    axios.get(url, {
      headers: data
    }).then(function (rawResponse) {
      var data = rawResponse.data;
      var nodes = data.match(/"playable_url":"(.*?)"/);
      var match = data.match(/"playable_url_quality_hd":"(.*?)"/);
      var object = data.match(/"preferred_thumbnail":{"image":{"uri":"(.*?)"/);
      if (nodes && nodes[1]) {
        var result = {
          url: url,
          sd: wrap(nodes[1]),
          hd: match && match[1] ? wrap(match[1]) : "",
          thumbnail: object && object[1] ? wrap(object[1]) : ""
        };
        res.jsonp(result);
      } else {
       res.jsonp("Cookies die so videos in the group cannot be downloaded!");
      }
    });
  });
}