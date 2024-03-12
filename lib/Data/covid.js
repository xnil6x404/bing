exports.name = '/covid';
exports.index = async(req, res, next) => {
    const axios = require('axios');
    const request = require("request");
    var link = req.query.country
    return request(encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${link}`), (err, response, body) => {
        var retrieve = JSON.parse(body);
        var text = '';
        retrieve[0].forEach(item => (item[0]) ? text += item[0] : '');
        var fromLang = (retrieve[2] === retrieve[8][0][0]) ? retrieve[2] : retrieve[8][0][0]
        var options = {
            method: 'GET',
            url: 'https://covid-193.p.rapidapi.com/statistics',
            params: { country: text.toUpperCase() },
            headers: {
                'x-rapidapi-host': 'covid-193.p.rapidapi.com',
                'x-rapidapi-key': 'a012e05802msh4ce48bff26d5c0ap151d85jsn4edde7f89de0'
            }
        };
        axios.request(options).then(function(response) {
            const dataa = response.data
            const info = dataa.response
            const i = info[0]
            const country = i.country
            const continent = i.continent
            const population = i.population
            const a = i.cases
            const b = i.deaths
            data = {
                quocgia: country,
                danso: population,
                dangdieutri: a.active,
                ca_nhiem_moi: a.new,
                hoiphuc: a.recovered,
                ca_tu_vong_moi: b.new,
                total: a.total,
                tong_ca_tu_vong: b.total
            }
            return res.jsonp({ data });
        }).catch(function(error) {
            return res.jsonp({ error: 'không tìm thấy thông tin quốc gia' });
        });
    });

}