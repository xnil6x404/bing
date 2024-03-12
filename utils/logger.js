const chalk = require('chalk');
module.exports = (data, type) => {
    var color = ["\x1b[33m", "\x1b[34m", "\x1b[35m", '\x1b[36m', '\x1b[32m'];
    var more = color[Math.floor(Math.random() * color.length)];
    console.log(more + `[ ${type} ] -> ` + data);
}
module.exports.banner = (data) => {
	const rdcl = ['#FF0000', '#00FF00', '#0000FF', 'FE063A', 'magenta', 'magentaBright']
	const color = chalk[rdcl[Math.floor(Math.random() * rdcl.length)]]
	console.log(color(data));
}