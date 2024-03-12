/*const axios = require('axios');
const useragent = require('../Other/data/useragent.json')
async function findID(url) {
  var unshortener = require("unshorten.it");
  const basicReg = /tiktok\.com(.*)\/video\/(\d+)/gm;
  if(url.indexOf('vt.tiktok.com') !== 0 || url.indexOf('vm.tiktok.com') !== 0) {
    linkO = await unshortener(url)
  }
  const basicParsed = basicReg.exec(linkO);
  if (basicParsed && basicParsed.length > 2) {
    return basicParsed[2]
  }
  return undefined;
}

const searchVideo = async (keywords) => {
  var headers = {
    "User-Agent": (useragent[Math.floor(Math.random() * useragent.length)]).userAgent,
    "cookie": "ttwid=1%7CeOpcPTY3-8lyRjvsIiGAVojUypU4QiKHFvn958N_j-U%7C1653022888%7C59ef905a8c35e69da62434fca41825476724ef619701aa16584f094e45fd0848"
  };
  var response = await axios(`https://m.tiktok.com/api/search/general/full/?keyword=${encodeURI(keywords)}`, {
    headers: headers,
  });
  var data = await response.data
  var getData = data.data
  var result = []
  for(let data of getData) {
    if(data.type !== 1) continue
    var format =  {
      id: data.item.id,
      desc: data.item.desc,
      createTime: data.item.createTime,
      stats: data.item.stats,
      video: data.item.video,
      author: data.item.author,
      music: data.item.music,
      challenges: data.item.challenges
    }
    result.push(format)
  }
  return result
};

const getData = async (url) => {
  var id = await findID(url);
  var headers = {
    "User-Agent": (useragent[Math.floor(Math.random() * useragent.length)]).userAgent,
    "cookie": "ttwid=1%7CeOpcPTY3-8lyRjvsIiGAVojUypU4QiKHFvn958N_j-U%7C1653022888%7C59ef905a8c35e69da62434fca41825476724ef619701aa16584f094e45fd0848"
  };
  var response = await axios.get('https://api-m.tiktok.com/aweme/v1/aweme/detail/?aweme_id=' + id, {
    headers: headers,
  });
  var data = await response.data
  var dataAweme = data.aweme_detail
  return {
    statusCode: data.status_code,
    itemData: {
      id: dataAweme.aweme_id,
      aweme_id: dataAweme.video.bit_rate[0].play_addr.uri,
      desc: dataAweme.desc,
      create_time: dataAweme.create_time,
      statistics: dataAweme.statistics,
      music: {
        id: dataAweme.music.id,
        title: dataAweme.music.title,
        author: dataAweme.music.author,
        play_url: dataAweme.music.play_url.uri,
        duration: dataAweme.music.duration
      },
      video: {
        duration: dataAweme.video.duration,
        dynamic_cover: dataAweme.video.dynamic_cover,
        width: dataAweme.video.bit_rate[0].play_addr.width,
        height: dataAweme.video.bit_rate[0].play_addr.height,
        ratio: dataAweme.video.ratio,
        no_watermark: {
          hd: {
            bit_rate: dataAweme.video.bit_rate[0].bit_rate,
            data_size: dataAweme.video.bit_rate[0].play_addr.data_size,
            url: dataAweme.video.bit_rate[0].play_addr.url_list[0]
          },
          sd: {
            bit_rate: dataAweme.video.bit_rate[1].bit_rate,
            data_size: dataAweme.video.bit_rate[1].play_addr.data_size,
            url: dataAweme.video.bit_rate[1].play_addr.url_list[0]
          }
        },
        video_watermark: {
          hd: {
            data_size: dataAweme.video.download_suffix_logo_addr.data_size,
            url: dataAweme.video.download_suffix_logo_addr.url_list[0]
          },
          sd: {
            data_size: dataAweme.video.download_addr.data_size,
            url: dataAweme.video.download_addr.url_list[0]
          }
        }
      }
    }
  }
};
const getInfoUser = async (username) => {
  var headers = {
    "User-Agent": (useragent[Math.floor(Math.random() * useragent.length)]).userAgent,
    "cookie": require('./Cookie.json')[0]
  };
  var { data } = await axios.get(`https://www.tiktok.com/node/share/user/@${username}?aid=1988`, {
    headers: headers,
  });
  return {
    statusCode: data.statusCode,
    userInfo: {
      user: data.userInfo.user,
      stats: data.userInfo.stats
    }
  }
}

module.exports = {
  getData,
  searchVideo,
  getInfoUser
}*/
const axios = require('axios');
const headers = {
  "User-Agent":
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:99.0) Gecko/20100101 Firefox/99.0",
  "cookie": "ttwid=1%7CeOpcPTY3-8lyRjvsIiGAVojUypU4QiKHFvn958N_j-U%7C1653022888%7C59ef905a8c35e69da62434fca41825476724ef619701aa16584f094e45fd0848"
};
async function findID(url) {
  var unshortener = require("unshorten.it");
  const basicReg = /tiktok\.com(.*)\/video\/(\d+)/gm;
  if(url.indexOf('vt.tiktok.com') !== 0 || url.indexOf('vm.tiktok.com') !== 0) {
    linkO = await unshortener(url)
  }
  const basicParsed = basicReg.exec(linkO);
  if (basicParsed && basicParsed.length > 2) {
    return basicParsed[2]
  }
  return undefined;
}

const searchVideo = async (keywords) => {
  var response = await axios(`https://m.tiktok.com/api/search/general/full/?keyword=${encodeURI(keywords)}`, {
    headers: headers,
  });
  var data = await response.data
  var getData = data.data
  var result = []
  for(let data of getData) {
    if(data.type !== 1) continue
    var format =  {
      id: data.item.id,
      desc: data.item.desc,
      createTime: data.item.createTime,
      stats: data.item.stats,
      video: data.item.video,
      author: data.item.author,
      music: data.item.music,
      challenges: data.item.challenges
    }
    result.push(format)
  }
  return result
};

const getData = async (url) => {
  var id = url
  if(url.indexOf('https://') !== -1) {
    var id = await findID(url);
  }
  var response = await axios.get('https://api19-core-useast5.us.tiktokv.com/aweme/v1/feed/?aweme_id=' + id, {
    headers: headers,
  });
  var data = await response.data
  var dataAweme = data.aweme_list[0]
  return {
    statusCode: data.status_code,
    itemData: {
      id: dataAweme.aweme_id ? dataAweme.aweme_id: null,
      aweme_id: dataAweme.video.bit_rate[0].play_addr.uri,
      desc: dataAweme.desc,
      create_time: dataAweme.create_time,
      statistics: dataAweme.statistics,
      music: {
        id: dataAweme.music.id,
        title: dataAweme.music.title,
        author: dataAweme.music.author,
        play_url: dataAweme.music.play_url.uri,
        duration: dataAweme.music.duration
      },
      video: {
        duration: dataAweme.video.duration,
        dynamic_cover: dataAweme.video.dynamic_cover,
        width: dataAweme.video.bit_rate[0].play_addr.width,
        height: dataAweme.video.bit_rate[0].play_addr.height,
        ratio: dataAweme.video.ratio,
        no_watermark: {
          hd: {
            url: dataAweme.video.bit_rate[0].play_addr.url_list[0]
          },
          sd: {
            url: dataAweme.video.bit_rate[1] ? dataAweme.video.bit_rate[1].play_addr.url_list[0] : null
          }
        },
        video_watermark: {
          hd: {
            url: dataAweme.video.download_suffix_logo_addr ? dataAweme.video.download_suffix_logo_addr.url_list[0] : null
          },
          sd: {
            url: dataAweme.video.download_addr ? dataAweme.video.download_addr.url_list[0] : null
          }
        }
      }
    }
  }
};
const getInfoUser = async (username) => {
  var { data } = await axios.get(`https://www.tiktok.com/api/user/detail/?abTestVersion=%5Bobject%20Object%5D&aid=1988&appType=t&app_language=vi-VN&app_name=tiktok_web&battery_info=1&browser_language=vi-VN&browser_name=Mozilla&browser_online=true&browser_platform=Win32&browser_version=5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F108.0.0.0%20Safari%2F537.36&channel=tiktok_web&cookie_enabled=true&device_id=7174769051570718209&device_platform=web_pc&focus_state=true&from_page=user&history_len=9&is_fullscreen=false&is_page_visible=true&language=vi-VN&os=windows&priority_region=&referer=&region=VN&screen_height=1080&screen_width=1920&secUid=&sgOpen=false&tz_name=Etc%2FGMT-7&uniqueId=${us}&webcast_language=vi-VN&msToken=gtvYNJC5dg9ba5kDUXwvcdgH2ggzaj98ETgWCN01X0PLAAZDjO-H0d5Fz-fSBL3w6dM8QBxph7kc5MWNXzW2erw7UhhOHftEzGLCreSupoMVMY6pFW0WrIkEwtNq9VWLUwQmVVIueQYb-kUnyg==&X-Bogus=DFSzswVuB8UANJZZSdKC3YT8gyYB`, {
    headers: headers,
  });
  return {
    statusCode: data.statusCode,
    userInfo: {
      user: data.userInfo.user,
      stats: data.userInfo.stats
    }
  }
}

module.exports = {
  getData,
  searchVideo,
  getInfoUser
}
