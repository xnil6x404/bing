const axios = require('axios');
const request = require('request');
const { writeFileSync, existsSync } = require('fs-extra');
const { resolve, join } = require("path");
async function refeshAccessToken() {
  const path = join(__dirname, 'token.json');
  if (!existsSync(path)) {
    writeFileSync(path, JSON.stringify({}, null, 4));
  }
  var getToken = await getAccessToken('2058720bcb864dc4bc811ee0b1ffcd61','91d0ec9da7e04912af133ef5795b82c4')
  writeFileSync(path, JSON.stringify({
    token: getToken.access_token
  }, null, 4));
}
async function search(keywords, limit) {
  var result = [];
  try {
    const accessToken = require('./token.json');
    var { data } = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURI(keywords)}&type=track&limit=${limit || 6}&access_token=${accessToken.token}`)
    for(let i of data.tracks.items) {
      var author = {
        id: i.album.artists[0].id,
        name: i.album.artists[0].name,
        type: i.album.artists[0].type,
        uri: i.album.artists[0].uri,
      }
      var dataMusic = {
        type: i.type,
        id: i.id,
        name: i.name,
        duration_ms: i.duration_ms,
        urls: i.external_urls.spotify,
        preview_url: i.preview_url
      }
      result.push({
        author,
        dataMusic
      })
    }
  }
  catch(e) {
    console.log(e)
    await refeshAccessToken()
    return await search(keywords, limit)
  }
  return result
}

async function getAccessToken(client_id, client_secret) {
  var resolveFunc = function () { };
  var returnPromise = new Promise(function (resolve, reject) {
      resolveFunc = resolve;
  });
  var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
          Authorization: 'Basic ' +
              new Buffer.from(client_id + ':' + client_secret).toString('base64')
      },
      form: {
          grant_type: 'client_credentials'
      },
      json: true
  };

  request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
          return resolveFunc(body)
      }
      resolveFunc(false)
  });
  return returnPromise
}

module.exports = {
  search,
  getAccessToken
}
