 const chalkAnimation = require('chalkercli');
let str = String.raw`
SAKIBIN SERVER Loading...
`;
let logo = String.raw`████████████████████████████`;
                             
const karaoke = chalkAnimation.karaoke(str);
const rainbow = chalkAnimation.rainbow(logo);
setTimeout(async() => {
    await karaoke.start()
    await rainbow.start()
    console.clear()
}, 1000);

setTimeout(() => {
    karaoke.stop()
    rainbow.stop()
    require('./app/main.js')
}, 7000);
