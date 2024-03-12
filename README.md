# DISME API - DOCS

### [Live DEMO](https://Docs-API.rosie-04.repl.co))

### 1. API KEY
Code
```js
var axios = require('axios');

//Tạo API KEY FREE
var name = 'D-Jukie';
axios.get(`https://Docs-API.rosie-04.repl.co/apikey?type=register&name=${name}`)
    .then(function (response) {
        console.log(response.apikey)
    })
    .catch(function (error) {
        console.log(error);
    });

//Tạo API KEY PREMIUM
var name = 'D-Jukie';
axios.get(`https://Docs-API.rosie-04.repl.co/apikey?type=register&name=${name}&apikey=JRT_Rosie`)
    .then(function (response) {
        console.log(response.apikey)
    })
    .catch(function (error) {
        console.log(error);
    });

//Kiểm tra API KEY
var apikey = 'DismeFREE_B8UaHy6tfaAd';
axios.get(`https://Docs-API.rosie-04.repl.co/apikey?type=checker&apikey=${apikey}`)
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    });
```
Response 
```json
//Tạo API KEY
{
    "success": 200,
    "apikey": "DismeFREE_9490049871",
    "type": "free",
    "message": "Tạo apikey premium thành công!"
}

//Kiểm tra API KEY
{
    "apikey": "DismeFREE_9490049871",
    "name": "D-Jukie",
    "request": 50,
    "type": "free"
}
```
```js
//Gán APIKEY vào API (dán phía dưới exports.index = async (req, res, next) => {...)

var apikey = req.query.apikey;
if(global.checkAPI(apikey).error == 1) {
    return res.json(global.checkAPI(apikey))
}
```

Error 
```json
{
    "error": "Bạn đã có key trên hệ thống"
}
```

### 2. Blink
Code
```js
var axios = require('axios');

var idFacebook = '100033478361032,100022113516016';
var delay = 500
axios.get(`https://Docs-API.rosie-04.repl.co/blink?id=${idFacebook}&delay=${delay}`)
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    });
```
Response 
![Phản hồi về GIF có ảnh đại diện tất cả ID phía trên.]
Error 
```json
{
    "error": "thiếu dữ liệu để khởi chạy chương trình "
}
```

### 3. Tạo ảnh bìa V-1
Code
```js
var axios = require('axios');

var name = 'Nguyễn Hải Đăng',
    color = 'no',
    address = 'TPHCM',
    email = 'dangz123456789z@gmail.com',
    subname = 'J-JRT',
    numberphone = '0396049649',
    uid = '100033478361032'
axios.get(`https://Docs-API.rosie-04.repl.co/fbcover/v1?name=${name}&color=${color}&address=${address}&email=${email}&subname=${subname}&sdt=${numberphone}&uid=${uid}`)
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    });
```

Response 
![Phản hồi về ảnh với những thông tin phía trên.](https://i.imgur.com/Axb5Tti.png)

Error 
```json
{
    "error": "thiếu dữ liệu để thực thi lệnh"
}
```
### 3. Tạo ảnh bìa V-2
Code
```js
var axios = require('axios');

var name = 'Nguyễn Hải Đăng',
    color = 'no',
    subname = 'J-JRT',
    uid = '100033478361032'
axios.get(`https://Docs-API.rosie-04.repl.co/fbcover/v2?name=${name}&color=${color}&subname=${subname}&uid=${uid}`)
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    });
```

Response 
![Phản hồi về ảnh với những thông tin phía trên.](https://i.imgur.com/Xq70c8B.png)

Error 
```json
{
    "error": "thiếu dữ liệu"
}
```
### 4. Tạo ảnh bìa V-3
Code
```js
var axios = require('axios');

var uid = '100033478361032',
    birthday = '26/02',
    love = 'Hà Nhung',
    location = 'TPHCM',
    hometown = 'Hà Nội',
    name = 'Phạm Văn Diện',
    follow = '37086',
    gender = 'Nam'
axios.get(`https://Docs-API.rosie-04.repl.co/fbcover/v3?name=${name}&birthday=${birthday}&love=${love}&location=${location}&hometown=${hometown}&follow=${follow}&gender=${gender}&uid=${uid}`)
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    });
```

Response 
![Phản hồi về ảnh với những thông tin phía trên.](https://i.imgur.com/oP9g2DC.png)

Error 
```json
{
    "error": "thiếu dữ liệu!"
}
```
### 5. Lưu trữ code
Code
```js
var axios = require('axios');

var code = String.raw`
console.log("Hello World")
`
axios.post('https://Docs-API.rosie-04.repl.co/upcode', {code: code}).
    then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    });
```
Response 
```json
{
  "status": true,
  "url": "https://Docs-API.rosie-04.repl.co/upcode/raw/?id=6GF1SYTOMG"
}
```
Error 
```json
{
   "status": false,
   "url": "Không thể up code của bạn lên!"
}
```
### 6. TikTok
Code
```js
var axios = require('axios');

var keyword = 'Sơn Tùng',
    username = 'dang_quy04',
    url = 'https://www.tiktok.com/@dang_quy04/video/7103902434774371611'
//tìm kiếm video theo từ khóa
axios.get('https://Docs-API.rosie-04.repl.co/tiktok?search=' + keyword).
    then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    });
//lấy thông tin người dùng qua username
axios.get('https://Docs-API.rosie-04.repl.co/tiktok?username=' + username).
    then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    });
//Lấy thông tin video thông qua url
axios.get('https://Docs-API.rosie-04.repl.co/tiktok?url=' + url).
    then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    });
```
Response 
```json
//search
[
    {
        "id": "7102091877247241498",
        "desc": "Theo thời gian những hạt mưa như nặng thêm... #odaycobannoibuon #nangamxadan #sontungmtp #sontung",
        "createTime": 1653584624,
        "stats": {
            "diggCount": 677700,
            "shareCount": 3863,
            "commentCount": 4152,
            "playCount": 4500000
        },
        "video": {
            "id": "7102091877247241498",
            "height": 1024,
            "width": 576,
            "duration": 58,
            "ratio": "720p",
            "cover": "https://p16-sign-va.tiktokcdn.com/obj/tos-useast2a-p-0037-aiso/c598ba9465254e5fa844a8d7bf37f6f0_1653584639?x-expires=1654488000&x-signature=aOOF4YOienyMpVxTq3rlNLiE46k%3D",
            "originCover": "https://p16-sign-va.tiktokcdn.com/obj/tos-useast2a-p-0037-aiso/53a1fdfb508243839143b27283fba03e_1653584637?x-expires=1654488000&x-signature=Dt7PzK63SvATtMNYcTEZtY%2FQgrM%3D",
            "dynamicCover": "https://p16-sign-va.tiktokcdn.com/obj/tos-useast2a-p-0037-aiso/6f5fe3d147d047a0b18d5cf704fd2478_1653584636?x-expires=1654488000&x-signature=3x06PIp8y%2FfYV9au2tuGQfW%2Bi%2Fs%3D",
            "playAddr": "https://v16-webapp.tiktok.com/5345501a4da110d2e846dd73061377bf/629d8575/video/tos/useast2a/tos-useast2a-pve-0037-aiso/636e4db2cbbf46878be2e77562b26b12/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=1830&bt=915&btag=80000&cs=0&ds=3&ft=eXd.6H-qMyq8Zwgtiwe2NLcZLl7Gb&mime_type=video_mp4&qs=0&rc=ODk4aWQ4ZTQ4OGk8NjVkOkBpMzU3bDc6ZjN1ZDMzZjgzM0BjYjIvXi80XjIxNTM2MDRiYSNjLmxecjRvMTRgLS1kL2Nzcw%3D%3D&l=202206052240270101902080430882D201",
            "downloadAddr": "https://v16-webapp.tiktok.com/5345501a4da110d2e846dd73061377bf/629d8575/video/tos/useast2a/tos-useast2a-pve-0037-aiso/636e4db2cbbf46878be2e77562b26b12/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=1830&bt=915&btag=80000&cs=0&ds=3&ft=eXd.6H-qMyq8Zwgtiwe2NLcZLl7Gb&mime_type=video_mp4&qs=0&rc=ODk4aWQ4ZTQ4OGk8NjVkOkBpMzU3bDc6ZjN1ZDMzZjgzM0BjYjIvXi80XjIxNTM2MDRiYSNjLmxecjRvMTRgLS1kL2Nzcw%3D%3D&l=202206052240270101902080430882D201",
            "shareCover": [
                "",
                "https://p16-sign-va.tiktokcdn.com/tos-useast2a-p-0037-aiso/53a1fdfb508243839143b27283fba03e_1653584637~tplv-tiktok-play.jpeg?x-expires=1655071200&x-signature=VkFj%2FBdQbZQs0XS9e7CkYSCx5LE%3D",
                "https://p16-sign-va.tiktokcdn.com/tos-useast2a-p-0037-aiso/53a1fdfb508243839143b27283fba03e_1653584637~tplv-tiktokx-share-play.jpeg?x-expires=1655071200&x-signature=UNflNnvl3R6HCox3iO5w%2FsaspVk%3D"
            ],
            "reflowCover": "https://p16-sign-va.tiktokcdn.com/obj/tos-maliva-p-0068/5843380202d342462b43652f2dcb4c48?x-expires=1654488000&x-signature=bJtW0skMx4crONhPHEY5DG6JzSM%3D",
            "bitrate": 937752,
            "encodedType": "normal",
            "format": "mp4",
            "videoQuality": "normal",
            "encodeUserTag": ""
        },
        "author": {
            "id": "7101130976637813762",
            "uniqueId": "hoangkha3107",
            "nickname": "Ở Đây Có Bán Nỗi Buồn 😊",
            "avatarThumb": "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/44d4a9a4c54ff52ef04ee5d12f5cb9ea~c5_100x100.jpeg?x-expires=1654639200&x-signature=2mWfJ%2BpEufgHAkkX%2FMHQe90hO64%3D",
            "avatarMedium": "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/44d4a9a4c54ff52ef04ee5d12f5cb9ea~c5_720x720.jpeg?x-expires=1654639200&x-signature=iOyZWGEfCsIDGqTZGnKccZlJdN0%3D",
            "avatarLarger": "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/44d4a9a4c54ff52ef04ee5d12f5cb9ea~c5_1080x1080.jpeg?x-expires=1654639200&x-signature=IQO7St7TquG5KzKJObNfd1lp0Tk%3D",
            "signature": "✉️ hoangkha3107vn@gmail.com",
            "verified": false,
            "secUid": "MS4wLjABAAAANeWNJTaVSUuQjBULhHAsHmxXHEQ0bYQ8pPgDj4odqCk0xhaoIwYQEcCqgOIEQ8pr",
            "secret": false,
            "ftc": false,
            "relation": 0,
            "openFavorite": false,
            "commentSetting": 0,
            "duetSetting": 0,
            "stitchSetting": 0,
            "privateAccount": false
        },
        "music": {
            "id": "7098911068403108610",
            "title": "nhạc nền - Spring Studio",
            "playUrl": "https://sf16-ies-music-sg.tiktokcdn.com/obj/tiktok-obj/7098911037642132226.mp3",
            "coverThumb": "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/a0a265c65723c32bf272111f332845d8~c5_100x100.jpeg?x-expires=1654639200&x-signature=oVzGM1%2BiDfT3LPdhBSYgKobG%2Bho%3D",
            "coverMedium": "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/a0a265c65723c32bf272111f332845d8~c5_720x720.jpeg?x-expires=1654639200&x-signature=bQXlx76QJ7cJkGQivtw0kuCS0FQ%3D",
            "coverLarge": "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/a0a265c65723c32bf272111f332845d8~c5_1080x1080.jpeg?x-expires=1654639200&x-signature=buw8H6PDxbYX4bnFddAwCUV7tV4%3D",
            "authorName": "Spring Studio",
            "original": true,
            "duration": 69,
            "album": ""
        },/*...*/
```
```json
//lấy thông tin người dùng qua username
{
    "statusCode": 0,
    "userInfo": {
        "user": {
            "id": "6715940146467832834",
            "shortId": "",
            "uniqueId": "dang_quy04",
            "nickname": "Đăng_Quý04  🦖",
            "avatarLarger": "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/e3d801b944e1ceb74712337b2e3ea1d0~c5_1080x1080.jpeg?x-expires=1654639200&x-signature=Mn2vwcAiJDjmLdLSbJf7JM2JlD0%3D",
            "avatarMedium": "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/e3d801b944e1ceb74712337b2e3ea1d0~c5_720x720.jpeg?x-expires=1654639200&x-signature=pjuy31dRHgiXHaH4PSj3HEVAuNo%3D",
            "avatarThumb": "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/e3d801b944e1ceb74712337b2e3ea1d0~c5_100x100.jpeg?x-expires=1654639200&x-signature=qo7aO2cSffEDpyJ8cUOIsOKmmG4%3D",
            "signature": "Fb: Nguyễn Đăng Quý(boss)\n10k fl thẳng tiến❤️",
            "verified": false,
            "secUid": "MS4wLjABAAAAB_hpg7-qgnTQuWVY5dZuMGMobqi8x0sV_6qgFFEfVIthxGVMlYXVt9itjvOASB0B",
            "ftc": false,
            "relation": 0,
            "openFavorite": false,
            "bioLink": {
                "link": "https://www.facebook.com/profile.php?id=100047688340890",
                "risk": 0
            },
            "commentSetting": 0,
            "duetSetting": 0,
            "stitchSetting": 1,
            "privateAccount": false,
            "secret": false,
            "isADVirtual": false,
            "roomId": ""
        },
        "stats": {
            "followerCount": 6581,
            "followingCount": 616,
            "heart": 103100,
            "heartCount": 103100,
            "videoCount": 207,
            "diggCount": 0
        }
    }
}
```
```json
//Lấy thông tin video thông qua url
{
    "statusCode": 0,
    "itemData": {
        "id": "7103902434774371611",
        "aweme_id": "v0f025gc0000cab22rjc77u48gmmhss0",
        "desc": "Ny ông nào vào nhận đi chứ tui bất lực quả này rồi😂😂 học với hành#VaCaiKet #xuhuongtiktok #xuhuong #idolface #tiktok #dang_quy04 🦖",
        "create_time": 1654006177,
        "statistics": {
            "whatsapp_share_count": 0,
            "comment_count": 334,
            "digg_count": 49711,
            "download_count": 146,
            "play_count": 516782,
            "forward_count": 0,
            "aweme_id": "7103902434774371611",
            "share_count": 77,
            "lose_count": 0,
            "lose_comment_count": 0,
            "collect_count": 426
        },
        "music": {
            "id": 7099796060881243000,
            "title": "Đánh Rơi Người Yêu",
            "author": "DJ ATOM",
            "play_url": "https://sf16-ies-music.tiktokcdn.com/obj/ies-music-aiso/7099796066991721242.mp3",
            "duration": 50
        },
        "video": {
            "duration": 20431,
            "dynamic_cover": {
                "uri": "tos-useast2a-p-0037-aiso/333a7190197844b78e086704e3b2e50e_1654006179",
                "url_list": [
                    "https://p16-sign-va.tiktokcdn.com/obj/tos-useast2a-p-0037-aiso/333a7190197844b78e086704e3b2e50e_1654006179?x-expires=1654488000&x-signature=mKHdeB8JWwoI8uoC1ZXSJfqYNQI%3D"
                ],
                "width": 720,
                "height": 720
            },
            "width": 576,
            "height": 1024,
            "ratio": "540p",
            "no_watermark": {
                "hd": {
                    "bit_rate": 2198192,
                    "data_size": 5613910,
                    "url": "https://v16m-default.akamaized.net/e5513363ec2c1ca025b3990b2fd06911/629d8632/video/tos/useast2a/tos-useast2a-pve-0037c001-aiso/4ea4c95c3eae4870b71e6c6441e831cc/?a=0&ch=0&cr=0&dr=0&lr=all&cd=0%7C0%7C0%7C0&cv=1&br=4292&bt=2146&btag=80000&cs=0&ds=6&ft=ArCXsBnZqS2mo0PpfrbfkVQxGFt5HKJ&mime_type=video_mp4&qs=0&rc=NGRnOGZoNTs5NjxoO2ZlaUBpM3Zwajc6ZnU1ZDMzZjgzM0A0YDItMDYwNmIxYS80Yi5fYSNwZWo1cjRnL19gLS1kL2Nzcw%3D%3D&l=202206052244140101920561030D8290FF"
                },
                "sd": {
                    "bit_rate": 1088774,
                    "data_size": 2780593,
                    "url": "https://v16m-default.akamaized.net/0321ce41e81d36137d9725668914e118/629d8632/video/tos/useast2a/tos-useast2a-pve-0037-aiso/b773493a34674d9a869959208551bd5d/?a=0&ch=0&cr=0&dr=0&lr=all&cd=0%7C0%7C0%7C0&cv=1&br=2126&bt=1063&btag=80000&cs=0&ds=6&ft=ArCXsBnZqS2mo0PpfrbfkVQxGFt5HKJ&mime_type=video_mp4&qs=4&rc=PGhlNTtlaDNkMzpmNGZoaUBpM3Zwajc6ZnU1ZDMzZjgzM0BgNl8zYjAzX2ExM182YzIzYSNwZWo1cjRnL19gLS1kL2Nzcw%3D%3D&l=202206052244140101920561030D8290FF"
                }
            },
            "video_watermark": {
                "hd": {
                    "data_size": 6012634,
                    "url": "https://v16m-default.akamaized.net/8714745ce10533e2b2a273dad78550cb/629d8632/video/tos/useast2a/tos-useast2a-pve-0037-aiso/b3cd86af1b5b4e8286241c65a566483b/?a=0&ch=0&cr=0&dr=0&lr=all&cd=0%7C0%7C0%7C0&cv=1&br=3860&bt=1930&btag=80000&cs=0&ds=3&ft=ArCXsBnZqS2mo0PpfrbfkVQxGFt5HKJ&mime_type=video_mp4&qs=0&rc=NDw6MzllO2c7NjRmNTk3Z0BpM3Zwajc6ZnU1ZDMzZjgzM0AvXy8zYGFgX2ExNl82MWBeYSNwZWo1cjRnL19gLS1kL2Nzcw%3D%3D&l=202206052244140101920561030D8290FF"
                },
                "sd": {
                    "data_size": 6012634,
                    "url": "https://v16m-default.akamaized.net/8714745ce10533e2b2a273dad78550cb/629d8632/video/tos/useast2a/tos-useast2a-pve-0037-aiso/b3cd86af1b5b4e8286241c65a566483b/?a=0&ch=0&cr=0&dr=0&lr=all&cd=0%7C0%7C0%7C0&cv=1&br=3860&bt=1930&btag=80000&cs=0&ds=3&ft=ArCXsBnZqS2mo0PpfrbfkVQxGFt5HKJ&mime_type=video_mp4&qs=0&rc=NDw6MzllO2c7NjRmNTk3Z0BpM3Zwajc6ZnU1ZDMzZjgzM0AvXy8zYGFgX2ExNl82MWBeYSNwZWo1cjRnL19gLS1kL2Nzcw%3D%3D&l=202206052244140101920561030D8290FF"
                }
            }
        }
    }
}
```
Error 
```json
{
    "error": true
}
```
## Support

- Facebook(https://www.facebook.com/NHD.JRT.262/)
