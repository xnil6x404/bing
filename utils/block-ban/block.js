module.exports = (ip) => {
    const listIP = require('./data/listIP.json');
    if(listIP.includes(ip)) {
        return true
    }
    else {
        return false
    }
}
