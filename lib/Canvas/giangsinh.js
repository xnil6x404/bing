exports.name = '/giangsinh';
exports.index = async(req, res, next) => {
    const { loadImage, createCanvas } = require("canvas");
    const request = require('request');
    const fs = require("fs-extra")
    const axios = require("axios")
    let pathImg = __dirname + `/cache/giangsinh.png`;
    const Canvas = require("canvas")
    var name = req.query.text
    if (!name) return res.json({ error: 'thiếu dữ liệu ' })
    if (!fs.existsSync(__dirname + `/cache/SVN-Apple.otf`)) {
        let getfont2 = (await axios.get(`https://drive.google.com/u/0/uc?id=1FbXZVRhTF9cMde9uY28HOCpUpJhHYmfT&export=download`, {
            responseType: "arraybuffer"
        })).data;
        fs.writeFileSync(__dirname + `/cache/SVN-Apple.otf`, Buffer.from(getfont2, "utf-8"));
    };
    let getIMG = (
        await axios.get(encodeURI(`https://lh3.googleusercontent.com/-j7R0DzYOk5Q/YcAF1f2yU4I/AAAAAAAA2lk/rHu-Na8DetArTrE_Fkq1C9mqdmLx8M4oACNcBGAsYHQ/s0/cautuyet.jpg`), {
            responseType: "arraybuffer",
        })
    ).data;
    fs.writeFileSync(pathImg, Buffer.from(getIMG, "utf-8"));
    let baseIMG = await loadImage(pathImg);
    let canvas = createCanvas(baseIMG.width, baseIMG.height);
    let ctx = canvas.getContext("2d");
    Canvas.registerFont(__dirname + `/cache/SVN-Apple.otf`, {
        family: "SVN-Apple"
    });
    ctx.drawImage(baseIMG, 0, 0);
    ctx.shadowOffsetX = -5;
    ctx.shadowOffsetY = 5;
    ctx.shadowColor = "rgba(0,0,0,0.2)";
    ctx.font = "60px SVN-Apple";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.translate(640, 470);
    ctx.rotate(Math.PI / 180 * -7);
    ctx.fillText(name, 0, 0);
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);
    return res.sendFile(pathImg)
}