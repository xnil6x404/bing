const axios = require('axios');
async function getData(url) {
    var { data: i } = await axios.get(`https://api-v2.soundcloud.com/resolve?url=${url}&client_id=Xv2CIP4jdKen9hzn6i2OjvYFyGEHt5kZ`);
    var result = await format(i)
    var author = {
        avatar_url: i.user.avatar_url,
        full_name: i.user.full_name,
        id: i.user.id,
        type: i.user.kind,
        permalink_url: i.user.permalink_url,
        username: i.user.username,
        follow: i.user.followers_count,
        description: i.user.description
    }
    var dataMusic = {
        title: i.title,
        downloadable: i.downloadable,
        likes_count: i.likes_count,
        comment_count: i.comment_count,
        permalink_url: i.permalink_url,
        genre: i.genre,
        description: i.description,
        duration: i.duration,
        id: i.id,
        display_date: i.display_date,
        linkDownload: []
    }
    for (let i of result) {
        var getLink = await axios(i.url)
        i.url = getLink.data.url
        dataMusic.linkDownload.push(i)
    }
    return {
        author,
        dataMusic
    }
}

function format(data) {
    const result = [];
    data.media.transcodings.forEach((format) => {
        if (format.format.protocol === 'progressive') {
            format.url = `${format.url}?client_id=Xv2CIP4jdKen9hzn6i2OjvYFyGEHt5kZ`
            result.push(format);
        }
    });
    return result;
}
async function search(keywords, limit) {
    var { data } = await axios.get(`https://api-v2.soundcloud.com/search/tracks?q=${encodeURI(keywords)}&client_id=Xv2CIP4jdKen9hzn6i2OjvYFyGEHt5kZ&limit=${limit || 10}`);
    var result = [];
    for (let i of data.collection) {
        var author = {
            avatar_url: i.user.avatar_url,
            full_name: i.user.full_name,
            id: i.user.id,
            type: i.user.kind,
            permalink_url: i.user.permalink_url,
            username: i.user.username,
            follow: i.user.followers_count,
            description: i.user.description
        }
        var dataMusic = {
            title: i.title,
            downloadable: i.downloadable,
            likes_count: i.likes_count,
            comment_count: i.comment_count,
            permalink_url: i.permalink_url,
            genre: i.genre,
            description: i.description,
            duration: i.duration,
            id: i.id,
            display_date: i.display_date,
        }
        result.push({
            author,
            dataMusic
        })
    }
    return result
}
module.exports = {
    getData,
    search
}