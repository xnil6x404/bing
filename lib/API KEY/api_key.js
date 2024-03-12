const chalkAnimation = require('chalkercli');
const path = require('path');
const fs = require('fs');
exports.name = '/apikey';
exports.index = async(req, res, next) => {
    const path_D = path.join(global.APIKEY);
    if (!fs.existsSync(path_D)) {
        fs.writeFileSync(path_D, '[]', 'utf-8');
    }
    const data_apikey = require(global.APIKEY)
    if (data_apikey.find(i => i.name == req.query.name)) {
        return res.json({
            error: 'You already have the key on the system'
        });
    }
    if (req.query.type == 'register') {
        let name = req.query.name;
        if (!name) return res.json({
            error: 'Missing data to make your request.'
        });
        else {
            if (req.query.apikey == 'JRT_Rosie') {
                var type = 'premium';
                var apikey = 'JrT_Rosie_';
                var request = 'infinite';
            } else {
                var type = 'free';
                var request = 50;
                var apikey = 'SAKI-BIN-';
            }
            const data = require(global.APIKEY)
            var random = '1234567890ABCDXYZPQR';
            var number = 6;
            for (var i = 0; i < number; i++) {
                apikey += random.charAt(Math.floor(Math.random() * random.length));
            }
            data.push({ apikey, name, request, type });
            fs.writeFileSync(path_D, JSON.stringify(data, null, 2), 'utf-8');
            res.json({
                success: 200,
                apikey,
                type,
                message: 'Successfully created apikey!'
            })
        }
    } else if (req.query.type == 'checker') {
        var apikey = req.query.apikey;
        const data = require(global.APIKEY)
        if (!data.find(i => i.apikey == apikey)) {
            return res.json({
                error: 'APIKEY does not exist!'
            })
        } else {
            var APIKEY = data.find(i => i.apikey == apikey);
            return res.json(APIKEY)
        }
    } else {
        return res.json({
            error: 'The command you requested was not found'
        })
    }
}