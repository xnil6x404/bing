const fs = require('fs');
const path = require('path');
exports.name = '/uploadimg';
exports.index = async(req, res, next) => {
    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }
    const data = require('./images/image.json');
    const path_D = path.join(__dirname, 'images', 'image.json');
    if (!fs.existsSync(path_D)) { fs.writeFileSync(path_D, '[]', 'utf-8'); }
    if (req.query.type == 'upload') {
        let link = req.query.link;
        if (!link) return res.json({ error: 'Thiếu dữ liệu để thực hiện yêu cầu cho bạn.' });
        if (!link.indexOf("https://i.imgur.com") == 0) return res.json({ error: 'Hiện tại hệ thống chỉ nhận link imgur' });

        if (validURL(link) == false) return res.json({ error: 'Dữ liệu bạn nhập vào không phải là một liên kết' });
        if (data.images.includes(link)) {
            return res.json({ error: 'Link đã tổn tại trên hệ thống' });
        }
        data.images.push(link);
        fs.writeFileSync(path_D, JSON.stringify(data, null, 4), 'utf8');
        return res.json({
            success: 200,
            link: link
        })
    }
    if (req.query.type == 'get') {
        var image = data.images[Math.floor(Math.random() * data.images.length)]
        return res.json({
            count: data.images.length,
            link: image
        })
    }
}