exports.name = '/mail10p/check';
exports.index = async(req, res, next) => {
    var email = req.query.id_mail
    if (!email) return res.jsonp({ error: 'Thiếu dữ liệu' })
    var keyAPi = ['3ef4a90946msh06d585e2e04f717p1843e6jsn12f270d55668', 'a012e05802msh4ce48bff26d5c0ap151d85jsn4edde7f89de0']
    var keyRandom = keyAPi[Math.floor(Math.random() * keyAPi.length)];
    const request = require('request');
    const options = {
        method: 'GET',
        url: `https://privatix-temp-mail-v1.p.rapidapi.com/request/one_mail/id/${email}/`,
        headers: {
            'x-rapidapi-host': 'privatix-temp-mail-v1.p.rapidapi.com',
            'x-rapidapi-key': keyRandom,
            useQueryString: true
        }
    };

    request(options, function(error, response, body) {
        if (error) return res.jsonp({ error: 'không tìm thấy id mail này' })
        const data = JSON.parse(body)
        res.json({
            data: {
                createdAt: data.createdAt.milliseconds,
                mail_id: data.mail_id,
                mail_from: data.mail_from,
                subject: data.mail_subject,
                mail_text: data.mail_text,
                mail_timestamp: data.mail_timestamp
            }
        })
    });
}