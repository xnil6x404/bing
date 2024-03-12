const request = require('request');
const path = require('path');
const axios = require('axios');
exports.name = '/blink';
exports.index = async(req, res, next) => {
    const GIFEncoder = require('gifencoder');
    const { createCanvas, loadImage, Canvas } = require('canvas');
    const fs = require('fs');
    var link = req.query.id
    var delay = req.query.delay || 500
    if (!link) return res.json({ error: 'thiếu dữ liệu để khởi chạy chương trình ' });
    var content = link.split(',')
    const encoder = new GIFEncoder(500, 500);
    encoder.start();
    // use node-canvas
    const canvas = createCanvas(500, 500);
    const ctx = canvas.getContext('2d');
    for (let id of content) {
        encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
        encoder.setDelay(delay); // frame delay in ms
        encoder.setQuality(10); // image quality. 10 is default.
        try {
            var pathAVT = (__dirname + `/cache/${Date.now()+10000}.png`)
            var avtUser = (await axios.get(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
            fs.writeFileSync(pathAVT, Buffer.from(avtUser, 'utf-8'));
            let baseImage = await loadImage(pathAVT);
            ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
            encoder.addFrame(ctx);
            fs.unlinkSync(pathAVT)
        } catch (e) { continue }
    }
    encoder.finish();
    const path = __dirname + '/cache/abc.gif'
    const buf = encoder.out.getData();
    fs.writeFile(path, buf, function(err) {
        if (err) return res.json({ error: 'Gặp lỗi khi khởi chạy chương trình' });
    });
    setTimeout(function() { res.sendFile(path) }, 1000);
}