exports.name = '/tiki';
exports.index = async(req, res, next) => {
    try {
        var text = req.query.text;
        if (!text) return res.jsonp({ error: 'Thiếu dữ liệu để khởi chạy chương trình tạo ảnh.' });
        const { loadImage, createCanvas } = require("canvas");
        const request = require('request');
        const fs = require("fs-extra")
        const axios = require("axios")
        let pathImg = __dirname + `/cache/tiki.png`;
        let background = (
            await axios.get(encodeURI(
                `https://2.bp.blogspot.com/-C1Brj2ntUhM/XtOmlT2tmgI/AAAAAAAAe6c/4DUr5vHILGMvl1QJFGAYwpLhpX9m4SFygCNcBGAsYHQ/s1600/tiki.jpg?fbclid=IwAR2w5Ka2Bx_4tBGiujr1RLByPmkFVguMaSnYik_ioktbM7oXq-HapkaC_Rc`), { responseType: "arraybuffer" })
        ).data;
        fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));


        /*-----------------download----------------------*/
        if (!fs.existsSync(__dirname + `/cache/SVN-Arial Bold.ttf`)) {
            let getfont = (await axios.get(`https://drive.google.com/u/0/uc?id=1WKXarqTN1zoV3aPGxQMKS_YQmRJYMcsu&export=download`, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/cache/SVN-Arial Bold.ttf`, Buffer.from(getfont, "utf-8"));
        };
        /*---------------------------------------------*/
        const Canvas = require("canvas")
        let baseImage = await loadImage(pathImg);
        let canvas = createCanvas(baseImage.width, baseImage.height);
        let ctx = canvas.getContext("2d");
        ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
        Canvas.registerFont(__dirname + `/cache/SVN-Arial Bold.ttf`, {
            family: "SVN-Arial Bold"
        });
        ctx.font = `55px SVN-Arial Bold`;
        ctx.fillStyle = "#ffc903";
        ctx.textAlign = "start";
        ctx.fillText(text.toUpperCase(), 626, 427);
        ctx.beginPath();
        const imageBuffer = canvas.toBuffer();
        fs.writeFileSync(pathImg, imageBuffer);
        res.sendFile(pathImg);
        fs.unlinkSync(pathImg);
    } catch (e) {}
}