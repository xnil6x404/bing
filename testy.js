var GIFEncoder = require('gifencoder');
var Canvas = require('canvas');
var fs = require('fs');

var encoder = new GIFEncoder(320, 240);

encoder.createReadStream().pipe(fs.createWriteStream('rankup.gif'));

encoder.start();
encoder.setRepeat(0);   
encoder.setDelay(500);  
encoder.setQuality(10); 

var canvas = new Canvas(320, 240);
var ctx = canvas.getContext('2d');

// blue rectangle frame
ctx.fillStyle = '#0000ff';
ctx.fillRect(0, 0, 320, 240);
encoder.addFrame(ctx);

// image frame
var data = fs.readFileSync(__dirname + '/profile.jpg');
var img = new Canvas.Image; 
img.src = data;
ctx.drawImage(img, 0, 0, 320, 240);
encoder.addFrame(ctx);

encoder.finish();