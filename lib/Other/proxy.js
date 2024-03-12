exports.name = '/proxy';
exports.index = async(req, res, next) => {
    const request = require('request');
    var lct = req.query.location || 'VN'
    var ptc = req.query.protocols || 'socks4'
    if (!lct) return res.jsonp({ error: 'Missing data to launch the program' });
    const options = {
        method: 'GET',
        url: 'https://proxy-orbit1.p.rapidapi.com/v1/',
        qs: { location: lct.toUpperCase(), protocols: ptc },
        headers: {
            'x-rapidapi-host': 'proxy-orbit1.p.rapidapi.com',
            'x-rapidapi-key': 'a012e05802msh4ce48bff26d5c0ap151d85jsn4edde7f89de0',
            useQueryString: true
        }
    };
    request(options, function(error, response, body) {
        if (error) return res.jsonp({ error: 'Your request cannot be processed' })
        var data = JSON.parse(body)
        return res.jsonp({
            data
        })
    });
}