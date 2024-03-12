__path = process.cwd()

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__path + '/views/sakibin.html')
})

router.get('/login', (req, res) => {
    res.sendFile(__path + '/views/login.html')
})

module.exports = router
