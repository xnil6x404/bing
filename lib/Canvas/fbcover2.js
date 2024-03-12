exports.name = '/fbcover/v2';
exports.index = async(req, res, next) => {
    const { loadImage, createCanvas } = require("canvas");
    const request = require('request');
    const fs = require("fs-extra")
    const axios = require("axios")
    let pathImg = __dirname + `/cache/fbcover22.png`;
    let pathAva = __dirname + `/cache/fbcover222.png`;
    let pathLine = __dirname + `/cache/fbcover2222.png`;
    const path = require("path")
    const Canvas = require("canvas")
    var avtAnimee = require('./data/anime.json')

    var tenchinh = req.query.name;
    var id = req.query.id
    var tenphu = (req.query.subname).split("").join(String.fromCharCode(8200))
    var colorr = req.query.color || 'no'
    if (!tenchinh || !tenphu || !id) return res.json({ error: 'thiếu dữ liệu' })
    if (colorr.toLowerCase() == "no") var colorr = avtAnimee[id].colorBg
    let avtAnime = (
        await axios.get(encodeURI(
            `${avtAnimee[id].imgAnime}`), { responseType: "arraybuffer" })
    ).data;
    let background = (
        await axios.get(encodeURI(`https://lh3.googleusercontent.com/-p0IHqcx8eWE/YXZN2izzTrI/AAAAAAAAym8/T-hqrJ2IFooUfHPeVTbiwu047RkmxGLzgCNcBGAsYHQ/s0/layer2.jpg`), {
            responseType: "arraybuffer",
        })
    ).data;
    let hieuung = (
        await axios.get(encodeURI(`https://lh3.googleusercontent.com/-F8w1tQRZ9s0/YXZZmKaylRI/AAAAAAAAynI/HBoYISaw-LE2z8QOE39OGwTUiFjHUH6xgCNcBGAsYHQ/s0/layer4.png`), {
            responseType: "arraybuffer",
        })
    ).data;
    fs.writeFileSync(pathAva, Buffer.from(avtAnime, "utf-8"));
    fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
    fs.writeFileSync(pathLine, Buffer.from(hieuung, "utf-8"));
    /*-----------------download----------------------*/
    if (!fs.existsSync(__dirname + `/cache/SVN-BigNoodleTitling.otf`)) {
        let getfont2 = (await axios.get(`https://drive.google.com/u/0/uc?id=1uCXXgyepedb9xwlqMsMsvH48D6wwCmUn&export=download`, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname + `/cache/SVN-BigNoodleTitling.otf`, Buffer.from(getfont2, "utf-8"));
    };

    let baseImage = await loadImage(pathImg);
    let baseAva = await loadImage(pathAva);
    let baseLine = await loadImage(pathLine);
    let canvas = createCanvas(baseImage.width, baseImage.height);
    let ctx = canvas.getContext("2d");
    ctx.drawImage(baseImage, 0, 0, baseImage.width, baseImage.height);
    ctx.fillStyle = colorr;
    ctx.filter = "grayscale(1)"
    ctx.fillRect(0, 164, canvas.width, 633)
    ctx.drawImage(baseLine, 0, 0, baseImage.width, baseImage.height);
    ctx.globalAlpha = 0.5
    ctx.drawImage(baseAva, 0, -320, canvas.width, canvas.width)
    ctx.beginPath();
    ctx.globalAlpha = 1
    ctx.transform(1, 0, -0.2, 1, 0, 0)
    Canvas.registerFont(__dirname + `/cache/SVN-BigNoodleTitling.otf`, {
        family: "SVN-BigNoodleTitling"
    });
    ctx.font = `italic 200px SVN-BigNoodleTitling`;
    ctx.fillStyle = `#FFFFFF`
    ctx.textAlign = "end";
    ctx.globalAlpha = 0.8
    ctx.fillText(tenchinh.toUpperCase(), 1215, 535);
    Canvas.registerFont(__dirname + `/cache/SVN-BigNoodleTitling.otf`, {
        family: "SVN-BigNoodleTitling"
    });
    ctx.font = `60px SVN-BigNoodleTitling`;
    ctx.fillStyle = `#FFFFFF`
    ctx.textAlign = "end";
    ctx.globalAlpha = 1
    var l = ctx.measureText(tenphu).width;
    ctx.fillRect(1500, 164, 150, 633)
    ctx.fillRect(canvas.width - l - 540, 580, l + 50, 75)
    ctx.fillStyle = colorr
    ctx.fillText(tenphu.toUpperCase(), 1195, 640);
    ctx.fillStyle = `#FFFFFF`
    ctx.globalAlpha = 0.5
    ctx.fillRect(1300, 164, 150, 633)
    ctx.globalAlpha = 1
    ctx.transform(1, 0, 0.2, 1, 0, 0)
    ctx.filter = "grayscale(0)"
    ctx.drawImage(baseAva, 1010, 97, 700, 700)
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);
    fs.removeSync(pathAva);
    fs.removeSync(pathLine);
    return res.sendFile(pathImg);
}