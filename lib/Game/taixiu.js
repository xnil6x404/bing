exports.name = '/game/v2/taixiu';
exports.index = async(req, res, next) => {
var images = ['https://i.imgur.com/6gxyDgx.jpg', 'https://i.imgur.com/3mAifz1.jpg', 'https://i.imgur.com/etWAB9I.jpg', 'https://i.imgur.com/vplFgB1.jpg', 'https://i.imgur.com/BVCSxm3.jpg', 'https://i.imgur.com/PvF2gOz.jpg']
    const result = {}
    result.author = "Citnut"
    res.header("Content-type", "application/json; charset=utf-8")
    const mylink = "/game/v2"
    let bet = req.query.method
    const methodmap = {
        "tai": "tài",
        "xiu": "xỉu",
        "chan": "chẵn",
        "le": "lẻ",
        "so": "số",
        "bobacuthe": "bộ ba cụ thể",
        "bobabatki": "bộ ba bất kì",
        "tongdiem": "tổng điểm",
        "bodoidongnhat": "bộ đôi đồng nhất",
        "bodoichinhxac": "bộ đôi chính xác"
    }
    const gamemap = {
        "status": "api đang trong quá trình thử nghiệm còn nhiều chức năng chưa hoàn thiện",
        "method": {
            "xiu": 'Cược Xỉu: Sẽ thắng cược khi tổng số điểm của 3 xúc xắc là từ 4 đến 10. Trừ trường hợp đặc biệt khi kết quả của xúc xắc là "Bộ Ba Bất Kì"',
            "tai": 'Cược Tài: Sẽ thắng cược khi tổng số điểm của 3 xúc xắc là từ 11 đến 17. Trừ trường hợp đặc biệt khi kết quả của xúc xắc là "Bộ Ba Bất Kì"',
            "le": 'Cược Lẻ: Sẽ thắng cược khi tổng số điểm của 3 xúc xắc là 5,7,9,11,13,15,17 Trừ trường hợp đặc biệt khi kết quả của xúc xắc là "Bộ Ba Bất Kì"',
            "chan": 'Cược Chẵn: Sẽ thắng cược khi tổng số điểm của 3 xúc xắc là 4,6,8,10,12,14,16. Trừ trường hợp đặc biệt khi kết quả của xúc xắc là "Bộ Ba Bất Kì"',
            "so": "Cược số: thắng cược khi kết quả của 1 trong 3 xúc xắc hiển thị đúng con số mà người chơi đã chọn",
            "bobacuthe": "Cược Bộ Ba Cụ Thể: Sẽ thắng cược khi cả ba con xúc xắc hiển thị cùng một số mà người chơi đã chọn.",
            "bobabatki": "Cược Bộ Ba Bất Kỳ: Sẽ thắng cược khi cả ba con xúc xắc hiển thị cùng một số. (nằm từ bộ 1 đến bộ 6 bất kỳ)",
            "tongdiem": "Cược Tổng Số Điểm Cụ Thể: Sẽ thắng cược khi cả ba con xúc xắc hiển thị chính xác tổng số điểm mà người chơi đã chọn",
            "bodoidongnhat": "Cược đôi Đồng nhất Sẽ thắng cược khi 2 trong ba con xúc sắc hiển thị 1 đôi. (nằm từ đôi 1 đến đôi 6)",
            "bodoichinhxac": "Cược đôi chính xác Sẽ thắng cược khi 2 trong ba con xúc xắc hiển thị chính xác cặp đôi mà người chơi đã chọn."
        },
        "value": "số bất kì từ 1 đến 6 nếu cược số, từ 111 đến 666 nếu cược bộ, từ 11 đến 66 nếu cược đôi, từ 3 đến 18 nếu cược tổng",
        "hd sử dụng": `${mylink}/taixiu?method={method}`,
        "sử dụng value": `${mylink}/taixiu?method={method}&value={value}t`,
        "Ví dụ": `/game/v2/taixiu?method=xiu&value=10`,
        "Test": `https://API.kadeeruwu.repl.co/game/v2/taixiu?method=xiu&value=10`
    }
    if (!Object.keys(methodmap).includes(bet)) { res.send(JSON.stringify(gamemap, null, 2)) }

    let dice = {}
    let diceface = [1, 2, 3, 4, 5, 6]
    let tai = [11, 12, 13, 14, 15, 16, 17]
    let xiu = [4, 5, 6, 7, 8, 9, 10]
    result["người chơi"] = {}
    result.ketqua = {}
    async function taixiu() {
        dice.one = await diceface[Math.floor(Math.random() * diceface.length)]
        dice.two = await diceface[Math.floor(Math.random() * diceface.length)]
        dice.three = await diceface[Math.floor(Math.random() * diceface.length)]

        dice.total = await dice.one + dice.two + dice.three
        dice["bộ"] = `${dice.one}${dice.two}${dice.three}`
        dice["tên bộ"] = "không rõ"
        dice["chất"] = "không rõ"

        if (dice.total % 2 == 0) { dice["chất"] = "chẵn" } else { dice["chất"] = "lẻ" }
    } // `${}`

    await taixiu()
    if (dice.one == dice.two && dice.two == dice.three) { dice["tên bộ"] = "bộ ba bất kì" } else
    if (dice.one == dice.two || dice.two == dice.three || dice.three == dice.one) { dice["tên bộ"] = "bộ đôi đồng nhất" }
    var images_1 = images[dice.one - 1]
	var images_2 = images[dice.two - 1]
	var images_3 = images[dice.three - 1]
    result.images = [
        images_1,
        images_2,
        images_3
    ]
    switch (bet) {
        case "tai":
            result.ketqua.total = "lose"
            result["người chơi"]["chất"] = methodmap[bet]
            if (tai.includes(dice.total) && dice["tên bộ"] != "bộ ba bất kì") {
                result.ketqua.total = "win"
                result["nhà cái"] = methodmap["tai"]
            } else { result["nhà cái"] = methodmap["xiu"] }
            result["mở bát"] = dice
            res.send(JSON.stringify(result, null, 2))
            break
        case "xiu":
            result.ketqua.total = "lose"
            result["người chơi"]["chất"] = methodmap[bet]
            if (xiu.includes(dice.total) && dice["tên bộ"] != "bộ ba bất kì") {
                result.ketqua.total = "win"
                result["nhà cái"] = methodmap["xiu"]
            } else { result["nhà cái"] = methodmap["tai"] }
            result["mở bát"] = dice
            res.send(JSON.stringify(result, null, 2))
            break
        case "chan":
            result.ketqua.total = "lose"
            result["người chơi"]["chất"] = methodmap[bet]
            if (dice["chất"] == "chẵn" && dice["tên bộ"] != "bộ ba bất kì") {
                result.ketqua.total = "win"
                result["nhà cái"] = methodmap["chan"]
            } else { result["nhà cái"] = methodmap["le"] }
            result["mở bát"] = dice
            res.send(JSON.stringify(result, null, 2))
            break
        case "le":
            result.ketqua.total = "lose"
            result["người chơi"]["chất"] = methodmap[bet]
            if (dice["chất"] == "lẻ" && dice["tên bộ"] != "bộ ba bất kì") {
                result.ketqua.total = "win"
                result["nhà cái"] = methodmap["le"]
            } else { result["nhà cái"] = methodmap["chan"] }
            result["mở bát"] = dice
            res.send(JSON.stringify(result, null, 2))
            break
        case "so":
            result.ketqua.total = "lose"
            result["người chơi"].total = req.query.value
            if (`${dice["bộ"]}`.includes(`${req.query.value}`)) { result.ketqua.total = "win" }
            if (!diceface.includes(Number(req.query.value)) || `${req.query.value}`.length != 1) { res.send(JSON.stringify(gamemap, null, 2)) } else {
                result["mở bát"] = dice
                res.send(JSON.stringify(result, null, 2))
            }
            break
        case "bobacuthe":
            result.ketqua.total = "lose"
            result["người chơi"]["bộ"] = req.query.value
            result["người chơi"]["tên bộ"] = methodmap[bet]
            if (`${dice["bộ"]}` == `${req.query.value}`) { result.ketqua.total = "win" }
            if (111 > Number(req.query.value) || Number(req.query.value) > 666 || `${req.query.value}`.length != 3) { res.send(JSON.stringify(gamemap, null, 2)) } else {
                result["mở bát"] = dice
                res.send(JSON.stringify(result, null, 2))
            }
            break
        case "bobabatki":
            result.ketqua.total = "lose"
            result["người chơi"]["bộ"] = req.query.value
            result["người chơi"]["tên bộ"] = methodmap[bet]
            if (`${dice["bộ"]}` == `${req.query.value}` && dice["tên bộ"] == "bộ ba bất kì") { result.ketqua.total = "win" }
            if (111 > Number(req.query.value) || Number(req.query.value) > 666 || `${req.query.value}`.length != 3) { res.send(JSON.stringify(gamemap, null, 2)) } else {
                result["mở bát"] = dice
                res.send(JSON.stringify(result, null, 2))
            }
            break
        case "tongdiem":
            result.ketqua.total = "lose"
            result["người chơi"].total = req.query.value
            if (`${dice.total}` == `${req.query.value}`) { result.ketqua.total = "win" }
            if (3 > Number(req.query.value) || Number(req.query.value) > 18) { res.send(JSON.stringify(gamemap, null, 2)) } else {
                result["mở bát"] = dice
                res.send(JSON.stringify(result, null, 2))
            }
            break
        case "bodoidongnhat":
            result.ketqua = { one: `${dice.one}${dice.two}`, two: `${dice.two}${dice.three}`, three: `${dice.three}${dice.one}` }
            result["người chơi"].total = req.query.value
            result["người chơi"]["tên bộ"] = methodmap[bet]
            if (Object.values(result.ketqua).includes(`${req.query.value}`)) { result.ketqua.total = "win" } else { result.ketqua.total = "lose" }
            if (11 > Number(req.query.value) || Number(req.query.value) > 66 || Number(req.query.value) % 11 != 0) { res.send(JSON.stringify(gamemap, null, 2)) } else {
                result["mở bát"] = dice
                res.send(JSON.stringify(result, null, 2))
            }
            break
        case "bodoichinhxac":
            result.ketqua = { one: `${dice.one}${dice.two}`, two: `${dice.two}${dice.three}`, three: `${dice.three}${dice.one}` }
            result["người chơi"].total = req.query.value
            result["người chơi"]["tên bộ"] = methodmap[bet]
            if (Object.values(result.ketqua).includes(`${req.query.value}`)) { result.ketqua.total = "win" } else { result.ketqua.total = "lose" }
            if (11 > Number(req.query.value) || Number(req.query.value) > 66) { res.send(JSON.stringify(gamemap, null, 2)) } else {
                result["mở bát"] = dice
                res.send(JSON.stringify(result, null, 2))
            }
            break
        default:
            break
    }
    console.table(result)
}