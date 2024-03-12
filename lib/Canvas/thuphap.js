exports.name = '/thuphap';
exports.index = async(req, res, next) => {
    var id = req.query.id;
    var sodong = req.query.sodong;
    var dong1 = req.query.dong_1;
    var dong2 = req.query.dong_2;
    var dong3 = req.query.dong_3;
    if (!id || !sodong || !dong1) return res.jsonp({ error: 'thiếu dữ liệu để khởi chạy chương trình tạo ảnh.' });
    try {
        const { loadImage, createCanvas } = require("canvas");
        const request = require('request');
        const fs = require("fs-extra")
        const axios = require("axios")
        let pathImg = __dirname + `/cache/aaa.png`;
        const path = require("path")
        const Canvas = require("canvas")
        const __root = path.resolve(__dirname, "cache");
        /*------------------------Background-----------------------*/
        var dsCover = [{
                    tpCover: "https://lh3.googleusercontent.com/-nUwoTGWnfGA/YZjFyVXf7MI/AAAAAAAA1Ug/XX9QE_4WbFMQZaIJrpkDzvoUzg7JkYPbACNcBGAsYHQ/s0/thuphap1.jpg",

                    tpColor: "#222222"
                },
                {
                    tpCover: "https://lh3.googleusercontent.com/-2ZPI8b5CSv4/YZj-PpDjwKI/AAAAAAAA1U4/UIj7lGXgAAsTDuwQjpZu8WXyLxMUR-S7ACNcBGAsYHQ/s0/thuphap2.jpg",

                    tpColor: "#48413a"
                },
                {
                    tpCover: "https://lh3.googleusercontent.com/-mUDbRYZ8Cv8/YZkAOAkVIFI/AAAAAAAA1VA/9MtWRZzAqFc0D3I8iORn3bj0f2sRP6bHQCNcBGAsYHQ/s0/thuphap3.jpg",

                    tpColor: "#c75a53"
                },
                {
                    tpCover: "https://lh3.googleusercontent.com/-pZyh72jJKbo/YZkA0ss2V7I/AAAAAAAA1VI/juO1Wc2Ee24yKDlBDvhoMdMmivKlYeypgCNcBGAsYHQ/s0/thuphap4.jpg",

                    tpColor: "#747757"
                },
            ]
            /*--------------------------------------------------*/
        var numBackground = parseInt(id)
        let background = (
            await axios.get(encodeURI(dsCover[numBackground - 1].tpCover), {
                responseType: "arraybuffer",
            })
        ).data;
        fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
        /*-----------------download fonts----------------------*/
        if (!fs.existsSync(__dirname + `/cache/UTM ThuPhap Thien An.ttf`)) {
            let getfont2 = (await axios.get(`https://drive.google.com/u/0/uc?id=1z_WTixiFx_LD99o2Vf9XSzaNyDxPaKcS&export=download`, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(__dirname + `/cache/UTM ThuPhap Thien An.ttf`, Buffer.from(getfont2, "utf-8"));
        };

        let baseImage = await loadImage(pathImg);
        let canvas = createCanvas(baseImage.width, baseImage.height);
        let ctx = canvas.getContext("2d");
        ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
        Canvas.registerFont(__dirname + `/cache/UTM ThuPhap Thien An.ttf`, {
            family: "UTM ThuPhap Thien An"
        });
        ctx.textAlign = "center";
        ctx.fillStyle = dsCover[id].tpColor;
        var q = dong1
        var p = dong2
        var n = dong3
        if (sodong == '1') {
            var m = 150 - ctx.measureText(q).width;
            if (m < 30) { m = 30 }
            if (m > 90) { m = 90 }
            ctx.font = m + "px UTM ThuPhap Thien An";
            ctx.fillText(q, canvas.width / 2, canvas.height / 2 + 25);
        }
        if (sodong == '2') {
            var m = 140 - ctx.measureText(q).width;
            if (m < 30) { m = 30 }
            if (m > 90) { m = 90 }
            ctx.font = m + "px UTM ThuPhap Thien An";
            ctx.fillText(q, canvas.width / 2, canvas.height / 2 - 95);
            ctx.fillText(p, canvas.width / 2, canvas.height / 2 + 110);
        }
        if (sodong == '3') {
            var m = 130 - ctx.measureText(q).width;
            if (m < 30) { m = 30 }
            if (m > 90) { m = 90 }
            ctx.font = m + "px UTM ThuPhap Thien An";
            ctx.fillText(q, canvas.width / 2, canvas.height / 2 - 145);
            ctx.fillText(p, canvas.width / 2, canvas.height / 2);
            ctx.fillText(n, canvas.width / 2, canvas.height / 2 + 155);
        }
        const imageBuffer = canvas.toBuffer();
        fs.writeFileSync(pathImg, imageBuffer);
        res.sendFile(pathImg);
    } catch (error) {
        console.log(error)
        res.json({ error: error });
    }
}