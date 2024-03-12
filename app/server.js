const router = require("express").Router();
const log = require("../utils/logger");
const { readdirSync } = require('fs-extra');
const path = require('path');
try {
    var i, j, n = 0;
    let srcPath = path.join(process.cwd(), "/lib/");
    const hosting = readdirSync(srcPath).filter((file) => file.endsWith(".js"));
    for (i of hosting) {
        var { index, name } = require(srcPath + i);
        router.get(name, index);
        n++
    }
    const getDirs = readdirSync(srcPath).filter((file) => !file.endsWith(".js") && !file.endsWith(".json"));
    for (var dir of getDirs) {
        fileName = readdirSync(path.join(process.cwd(), '/lib/' + dir + '/')).filter((file) => file.endsWith(".js") && file !== 'main.js');
        for (j of fileName) {
            var { index, name } = require(path.join(process.cwd(), '/lib/' + dir + '/') + j);
            router.get(name, index);
            n++
        }
    }
    log(`Loaded successfully ${n} file`, 'LOAD');
} catch (e) {
    console.log(e);
}
module.exports = router;



