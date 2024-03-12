const fs = require('fs');
const path = require('path');
exports.name = '/fbcover/v1';
exports.index = async(req, res, next) => {
    module.exports.circle = async(image) => {
        const jimp = require("jimp")
        image = await jimp.read(image);
        image.circle();
        return await image.getBufferAsync("image/png");
    }
    const { loadImage, createCanvas } = require("canvas");
    const request = require('request');
    const fs = require("fs-extra")
    const axios = require("axios")
    let pathImg = __dirname + `/cache/fbcover1.png`;
    let pathAva = __dirname + `/cache/fbcover2.png`;
    let pathLine = __dirname + `/cache/fbcover3.png`;
    const path = require("path")
    const Canvas = require("canvas")
    const __root = path.resolve(__dirname, "cache");
    var tenchinh = req.query.name
    var color = req.query.color || 'no'
    if (color.toLowerCase() == "no") var color = `#ffffff`
    var address = req.query.address
    var email = req.query.email
    var subname = req.query.subname
    var phoneNumber = req.query.sdt
    var uid = req.query.uid
    if (!address || !tenchinh || !email || !subname || !phoneNumber || !uid) return res.json({ error: 'thiếu dữ liệu để thực thi lệnh' });
    var name = tenchinh.toUpperCase()
        //=================CONFIG IMG=============//
    let avtAnime = (
        await axios.get(encodeURI(
            `https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`), { responseType: "arraybuffer" })
    ).data;
    let background = (
        await axios.get(encodeURI(`https://1.bp.blogspot.com/-ZyXHJE2S3ew/YSdA8Guah-I/AAAAAAAAwtQ/udZEj3sXhQkwh5Qn8jwfjRwesrGoY90cwCNcBGAsYHQ/s0/bg.jpg`), {
            responseType: "arraybuffer",
        })
    ).data;
    let hieuung = (
        await axios.get(encodeURI(`https://1.bp.blogspot.com/-zl3qntcfDhY/YSdEQNehJJI/AAAAAAAAwtY/C17yMRMBjGstL_Cq6STfSYyBy-mwjkdQwCNcBGAsYHQ/s0/mask.png`), {
            responseType: "arraybuffer",
        })
    ).data;
    fs.writeFileSync(pathAva, Buffer.from(avtAnime, "utf-8"));
    fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
    fs.writeFileSync(pathLine, Buffer.from(hieuung, "utf-8"));
    var avatar = await this.circle(pathAva);
    //=================DOWNLOAD FONTS=============//
    if (!fs.existsSync(__dirname + `/cache/UTMAvoBold.ttf`)) {
        let getfont2 = (await axios.get(`https://drive.google.com/u/0/uc?id=1DuI-ou9OGEkII7n8odx-A7NIcYz0Xk9o&export=download`, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname + `/cache/UTMAvoBold.ttf`, Buffer.from(getfont2, "utf-8"));
    };
    //=================DRAW BANNER=============//
    let baseImage = await loadImage(pathImg);
    let baseAva = await loadImage(avatar);
    let baseLine = await loadImage(pathLine);
    let canvas = createCanvas(baseImage.width, baseImage.height);
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    Canvas.registerFont(__dirname + `/cache/UTMAvoBold.ttf`, { family: "UTMAvoBold" });
    ctx.strokeStyle = "rgba(255,255,255, 0.2)";
    ctx.lineWidth = 3;
    ctx.font = "100px UTMAvoBold";
    ctx.strokeText(name.toUpperCase(), 30, 100);
    ctx.strokeText(name.toUpperCase(), 130, 200);
    ctx.textAlign = "right";
    ctx.strokeText(name.toUpperCase(), canvas.width - 30, canvas.height - 30);
    ctx.strokeText(name.toUpperCase(), canvas.width - 130, canvas.height - 130);
    ctx.fillStyle = `#ffffff`
    ctx.font = "55px UTMAvoBold";
    // ctx.shadowColor = '#fff';
    // ctx.shadowBlur = 40;
    // ctx.shadowOffsetX = 0;
    // ctx.shadowOffsetY = 0;
    ctx.fillText(name.toUpperCase(), 680, 270);
    ctx.font = "40px UTMAvoBold";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "right";
    ctx.fillText(subname.toUpperCase(), 680, 320);
    ctx.font = "23px UTMAvoBold";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "start";
    ctx.fillText(phoneNumber.toUpperCase(), 1350, 252);
    ctx.fillText(email.toUpperCase(), 1350, 332);
    ctx.fillText(address.toUpperCase(), 1350, 410);
    ctx.globalCompositeOperation = "destination-out";
    ctx.drawImage(baseLine, 0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(baseAva, 824, 180, 285, 285);
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);
    return res.sendFile(pathImg);
}