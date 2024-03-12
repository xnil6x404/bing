exports.name = '/mail10p/get';
exports.index = async(req, res, next) => {
    var email = req.query.mail
    if (!email) return res.jsonp({ error: 'thiếu dữ liệu' })
    const request = require('request');
    var md5 = require('md5');
    var keyAPi = ['3ef4a90946msh06d585e2e04f717p1843e6jsn12f270d55668', 'a012e05802msh4ce48bff26d5c0ap151d85jsn4edde7f89de0']
    var keyRandom = keyAPi[Math.floor(Math.random() * keyAPi.length)];
    const options = {
        method: 'GET',
        url: `https://privatix-temp-mail-v1.p.rapidapi.com/request/mail/id/${md5(email)}/`,
        headers: {
            'x-rapidapi-host': 'privatix-temp-mail-v1.p.rapidapi.com',
            'x-rapidapi-key': keyRandom,
            useQueryString: true
        }
    };
    request(options, function(error, response, body) {
        if (error) return res.jsonp({ error: 'email này chưa có bất cứ nội dung gì, vui lòng gửi thư về mail này và thử lại sau' })
        const data = JSON.parse(body)
        res.json({
            data: {
                createdAt: data[0].createdAt.milliseconds,
                mail_id: data[0].mail_id,
                mail_from: data[0].mail_from,
                subject: data[0].mail_subject,
                mail_text: data[0].mail_text,
                mail_timestamp: data[0].mail_timestamp
            }
        })
    });
}