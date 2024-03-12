exports.name = '/fbcover/v3';
exports.index = async (req, ress, next) => {
  module.exports.circle = async (image) => {
    const jimp = require("jimp")
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}
    const { loadImage, createCanvas } = require("canvas");
    const fs = require("fs-extra")
    const axios = require("axios")
    const Canvas = require("canvas")
    let pathBg = __dirname + `/cache/bg.png`;
    let pathAva = __dirname + `/cache/av.png`;
    let pathLine = __dirname + `/cache/li.png`;
    const path = require("path")
    const uid = req.query.uid
    const birthday = req.query.birthday
    const love = req.query.love
    const location = req.query.location
    const hometown = req.query.hometown
    const name = req.query.name
    const follow = req.query.follow
    const gender = req.query.gender
    if(!uid || !name || !love || !location || !hometown || !follow || !gender || !birthday) return ress.json({ error: 'thiếu dữ liệu!'})
    let avt = (await axios.get(encodeURI(`https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`), {
        responseType: "arraybuffer"
    })).data;
    let background = (await axios.get(encodeURI(`https://i.imgur.com/OC7ZYE6.png`), {
        responseType: "arraybuffer"
    })).data;
    let hieuung = (await axios.get(encodeURI(`https://i.imgur.com/OtzbwI8.png`), {
        responseType: "arraybuffer"
    })).data;
    fs.writeFileSync(pathAva, Buffer.from(avt, "utf-8"));
    fs.writeFileSync(pathBg, Buffer.from(background, "utf-8"));
    fs.writeFileSync(pathLine, Buffer.from(hieuung, "utf-8"));
    var avatar = await this.circle(pathAva);

    if (!fs.existsSync(__dirname + `/cache/UTMAvoBold.ttf`)) {
        let getfont2 = (await axios.get(`https://drive.google.com/u/0/uc?id=1DuI-ou9OGEkII7n8odx-A7NIcYz0Xk9o&export=download`, {
            responseType: "arraybuffer"
        })).data;
        fs.writeFileSync(__dirname + `/cache/UTMAvoBold.ttf`, Buffer.from(getfont2, "utf-8"));
    };
    if (!fs.existsSync(__dirname + `/cache/Baloo Regular.ttf`)) {
        let getfont1 = (await axios.get(`https://drive.google.com/u/0/uc?id=1IrxrZxo1ht3jur4ZI5MxH9Ri6HspO6YS&export=download`, {
            responseType: "arraybuffer"
        })).data;
        fs.writeFileSync(__dirname + `/cache/Baloo Regular.ttf`, Buffer.from(getfont1, "utf-8"));
    };
    let baseBg = await loadImage(pathBg);
    let baseAva = await loadImage(avatar);
    let baseLine = await loadImage(pathLine);
    let canvas = createCanvas(baseBg.width, baseBg.height);
    let ctx = canvas.getContext("2d");
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.drawImage(baseBg, 0, 0, canvas.width, canvas.height);
    Canvas.registerFont(__dirname + `/cache/UTMAvoBold.ttf`, {
        family: "UTMAvoBold"
    });
    ctx.strokeStyle = "rgba(255,255,255, 0.2)";
    ctx.lineWidth = 3;
    ctx.textAlign = "center";
    ctx.font = "150px UTMAvoBold";
    ctx.strokeText(name, 220, 131);
    ctx.strokeText(name, 543, 383);
    ctx.strokeText(name, 361, 630);
    ctx.strokeText(name, 211, 857);
    ctx.strokeText(name, 2000, 131);
    ctx.strokeText(name, 2323, 383);
    ctx.strokeText(name, 2141, 630);
    ctx.strokeText(name, 1991, 857);
    ctx.drawImage(baseLine, 0, 0, canvas.width, canvas.height);
    ctx.shadowBlur = 40;
    ctx.drawImage(baseAva, 356, 233, 404, 404);
    ctx.shadowBlur = 0;
    ctx.font = "45px UTMAvoBold";
    ctx.textAlign = "center";
    var l = ctx.measureText(name).width;
    ctx.fillStyle = `#8317d9`

    ctx.transform(1, 0, -0.4, 1, 0, 0)
    ctx.fillRect(1650, 303, canvas.width + l - 2350, 90)
    ctx.transform(1, 0, 0.4, 1, 0, 0);
    Canvas.registerFont(__dirname + `/cache/Baloo Regular.ttf`, {
        family: "Baloo Regular"
    });
    ctx.font = "50px Baloo Regular";
    ctx.textAlign = "left";
    ctx.fillStyle = `#38b6ff`
    ctx.fillText(name.toUpperCase(), 1590, 365);
    ctx.font = "42px Baloo Regular";
    ctx.fillStyle = `#5adfe3`
    ctx.fillText(birthday, 1777, 474 + 3);
    ctx.fillText(gender, 1762, 544 + 3);
    ctx.fillText(follow, 1708, 615 + 3);
    ctx.fillText(love, 1783, 687 + 3);
    ctx.fillText(hometown, 1719, 764 + 3);
    ctx.fillText(location, 1745, 836 + 3);
    ctx.fillText(uid, 1639, 902 + 3);
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathBg, imageBuffer);
    return ress.sendFile(pathBg);
}