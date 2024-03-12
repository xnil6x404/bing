exports.name = '/game/taixiu';
exports.index = async(req, res, next) => {
    var images = ['https://i.imgur.com/6gxyDgx.jpg', 'https://i.imgur.com/3mAifz1.jpg', 'https://i.imgur.com/etWAB9I.jpg', 'https://i.imgur.com/vplFgB1.jpg', 'https://i.imgur.com/BVCSxm3.jpg', 'https://i.imgur.com/PvF2gOz.jpg'],
        random_1 = Math.floor(Math.random() * 6) + 1,
        random_2 = Math.floor(Math.random() * 6) + 1,
        random_3 = Math.floor(Math.random() * 6) + 1,
        total = random_1 + random_2 + random_3
    if(total >= 4 && total <= 10) { var result = 'xỉu' }
    else if(total >= 11 && total <= 17) { var result = 'tài'}
    else { var result = false }
    try {
        return res.json({ 
            total: total,
            result: result,
            gif: 'https://i.imgur.com/cnoG4td.gif',
            images: [
                images[random_1-1],
                images[random_2-1],
                images[random_3-1]
            ],
            author: 'D-Jukie'
        })
    } catch(e) {
        res.json({ 
            error: 'Đã xảy ra lỗi với yêu cầu của bạn!'
        })
        return console.log(e)
    }
}
