const fs = require("fs-extra")
const axios = require("axios")
exports.name = '/vuatiengviet/image';
exports.index = async (req, ress, next) => {
const { loadImage, createCanvas } = require("canvas");
const request = require('request');
const fs = require("fs-extra")
const axios = require("axios")
let pathImg = __dirname + `/cache/vuatiengviet.png`;
const Canvas = require("canvas")
var keyWord = req.query.word;
if(!keyWord) return ress.json({ error: 'thiếu dữ liệu để thực thi lệnh'})
var msg = []
var randomKey = keyWord.split("")
	  randomKey = randomKey.sort(() => Math.random() - 0.5)
for (let key of randomKey) {
	if(key != " ") {
		msg += key + ' / '
	}
}
if (!fs.existsSync(__dirname + `/cache/UTMAvoBold.ttf`)) {
        let getfont2 = (await axios.get(`https://drive.google.com/u/0/uc?id=1DuI-ou9OGEkII7n8odx-A7NIcYz0Xk9o&export=download`, {
            responseType: "arraybuffer"
        })).data;
        fs.writeFileSync(__dirname + `/cache/UTMAvoBold.ttf`, Buffer.from(getfont2, "utf-8"));
    };
let getIMG = (
    await axios.get(encodeURI(`https://i.imgur.com/Tg8wt7C.jpg`), {
      responseType: "arraybuffer",
    })
  ).data;
fs.writeFileSync(pathImg, Buffer.from(getIMG, "utf-8"));
let baseIMG = await loadImage(pathImg);
let canvas = createCanvas(baseIMG.width, baseIMG.height);
let ctx = canvas.getContext("2d");
ctx.drawImage(baseIMG, 0, 0, canvas.width, canvas.height);
Canvas.registerFont(__dirname + `/cache/UTMAvoBold.ttf`, {
        family: "UTMAvoBold"
    });
ctx.fillStyle = `#000000`
ctx.textAlign = "center";
ctx.font = "30px UTMAvoBold";
ctx.fillText(msg.substring(0, msg.length - 2), 520, 651);
const imageBuffer = canvas.toBuffer();
fs.writeFileSync(pathImg, imageBuffer);
return ress.sendFile(pathImg)
}