exports.name = '/taoanhdep/avatarwibu/';
exports.index = async(req, res, next) => {
    const fs = require('fs-extra');
    const { loadImage, createCanvas } = require("canvas");
    const request = require('request');
    const path = require('path');
    const data_anime = require('./data/anime.json');
    const axios = require('axios');
    const Canvas = require('canvas');
    let pathImg = __dirname + `/cache/avatarwibu/avatar_1.png`;
    let pathAva = __dirname + `/cache/avatarwibu/avatar_2.png`;
    let pathLine = __dirname + `/cache/avatarwibu/avatar_3.png`;
    var id = req.query.id;
    var chu_nen = req.query.chu_nen;
    var chu_ky = req.query.chu_ky;
    var coo = req.query.color;
    if (!id || !chu_nen || !chu_ky) return res.jsonp({ error: 'thiếu dữ liệu để khởi chạy chương trình tạo ảnh.' });

    if (id < 0 || id > 882) return res.jsonp({ error: 'không tìm thấy ID nhân vật' });

    try {
        if (!coo) {
            var colorr = data_anime;
            var color = colorr[id].colorBg;
        } else {
            var color = req.query.color;
        }
        var avtAnimee = data_anime;
        let avtAnime = (
            await axios.get(encodeURI(`${avtAnimee[id].imgAnime}`), { responseType: "arraybuffer" })).data;
        let line = (await axios.get(encodeURI(
            `https://1.bp.blogspot.com/-5SECGn_32Co/YQkQ-ZyDSPI/AAAAAAAAv1o/nZYKV0s_UPY41XlfWfNIX0HbVoRLhnlogCNcBGAsYHQ/s0/line.png`), { responseType: "arraybuffer" })).data;
        let background = (await axios.get(encodeURI(`https://i.imgur.com/j8FVO1W.jpg`), { responseType: "arraybuffer" })).data;
        fs.writeFileSync(pathAva, Buffer.from(avtAnime, "utf-8"));
        fs.writeFileSync(pathLine, Buffer.from(line, "utf-8"));
        fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
        if (!fs.existsSync(__dirname + `/cache/MTD William Letter.otf`)) {
            let getfont = (await axios.get(`https://drive.google.com/u/0/uc?id=1HsVzLw3LOsKfIeuCm9VlTuN_9zqucOni&export=download`, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/cache/MTD William Letter.otf`, Buffer.from(getfont, "utf-8"));
        };
        if (!fs.existsSync(__dirname + `/cache/SteelfishRg-Regular.otf`)) {
            let getfont2 = (await axios.get(`https://drive.google.com/u/0/uc?id=1SZD5VXMnXQTBYzHG834pHnfyt7B2tfRF&export=download`, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/cache/SteelfishRg-Regular.otf`, Buffer.from(getfont2, "utf-8"));
        };
        let baseImage = await loadImage(pathImg);
        let baseAva = await loadImage(pathAva);
        let baseLine = await loadImage(pathLine);
        let canvas = createCanvas(baseImage.width, baseImage.height);
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = color
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        Canvas.registerFont(__dirname + `/cache/SteelfishRg-Regular.otf`, {
            family: "SteelfishRg-Regular"
        });
        ctx.font = `430px SteelfishRg-Regular`;
        ctx.textAlign = "center";
        ctx.fillStyle = "rgb(255 255 255 / 70%)"
        ctx.globalAlpha = 0.7
        ctx.fillText(chu_nen.toUpperCase(), canvas.width / 2, 1350)
        ctx.globalAlpha = 1
        ctx.strokeStyle = "white"
        ctx.lineWidth = 7
        ctx.textAlign = "center"
        ctx.strokeText(chu_nen.toUpperCase(), canvas.width / 2, 900)
        ctx.strokeText(chu_nen.toUpperCase(), canvas.width / 2, 1800)
        ctx.drawImage(baseAva, 0, 0, 2000, 2000);
        ctx.drawImage(baseLine, 0, 0, canvas.width, canvas.height)
        Canvas.registerFont(__dirname + `/cache/MTD William Letter.otf`, {
            family: "MTD William Letter"
        });
        ctx.font = `300px MTD William Letter`;
        ctx.fillStyle = `#FFFFFF`
        ctx.textAlign = "center";
        ctx.fillText(chu_ky, canvas.width / 2, 350);
        ctx.beginPath();
        const imageBuffer = canvas.toBuffer();
        fs.writeFileSync(pathImg, imageBuffer);
        res.sendFile(pathImg);
    } catch (error) {
        res.jsonp({ error: 'không thể xử lí yêu cầu của bạn' });
    }
}