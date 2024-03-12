'use strict';

const api = 'sakibin'
const express = require("express");
const axios = require('axios');
const path = require('path');
const helmet = require("helmet");
const server = require("./server.js");
const log = require("../utils/logger");
const checkAPI = require("../utils");
const config = require("../config.json");
const APIKEY = process.cwd() + "/utils/APIKEY.json"
const gptKey = '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'; // Replace with your actual API key
const baseUrl = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions'; // Adjust the URL as needed

const app = express();
const getIP = require('ipware')().get_ip;
const fs = require('fs');
const apiKey = 'SAKIBIN_7932313371';
//const apiKeyCheck = checkAPI(apiKey);
global.checkAPI = checkAPI.check_api_key
global.config = config;
global.APIKEY = APIKEY;
global._404 = process.cwd() + '/public/_404.html';
global.home = process.cwd() + '/public/home.html';
//global.css = process.cwd() + '/public/styles.css';
global.docs = process.cwd() + '/public/docs.html';
//global.css = process.cwd() + '/public/style.css';
global.css = process.cwd() + '/public/main.js';
global.css = process.cwd() + '/public/mark.png';

const { v4: uuidv4 } = require('uuid');
const baseCache = path.join(__dirname, 'cache');
const baseCtx = path.join(__dirname, 'ctx');
const imgTimestamp = {};
var cors = require('cors'),
  secure = require('ssl-express-www');
var mainrouter = require('../routes/main'),
  apirouter = require('../routes/api')
app.enable('trust proxy');
app.set("json spaces", 2)
app.use(cors())
app.use(secure)
app.use(express.static("public"))

app.use('/', mainrouter);
app.use('/api', apirouter);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/cache', express.static(baseCache));
app.use('/ctx', express.static(baseCtx));
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
  var ipInfo = getIP(req);
  var block = require("../utils/block-ban/block.js")(ipInfo.clientIp)
  if (block == true) return
  var limit = require("../utils/block-ban/limit-request.js")(ipInfo.clientIp)
  var type = global.config.ADMIN.includes(ipInfo.clientIp) ? 'ADMIN' : 'IP'
  log(`${type}: ${ipInfo.clientIp} - Requested to path: ${decodeURIComponent(req.url)}`, 'STATUS');
  next();
});
app.use("/", server);
app.set("json spaces", 4);
app.use((error, req, res, next) => {
  res.status(error.status).json({
    message: error.message
  });
});
app.set('port', (process.env.PORT || 8888));
app.get('/', function(request, response) {
  response.sendFile(global.home);
}).listen(app.get('port'));
app.get('/styles.css', function(request, response) {
  response.sendFile(global.css);
})
app.get('/docs', function(request, response) {
  response.sendFile(global.docs);
})
const port = app.get('port');
log(`SAKIBIN API is running, server is listening on ${port}`, 'HOST UPTIME');
app.post('/upcode', function(req, res) {
  var code = req.body.code;
  var id = ((Math.random() + 1).toString(36).substring(2)).toUpperCase()
  fs.writeFile(`${__dirname}/public/codeStorage/database/_${id}.js`,
    code,
    "utf-8",
    function(err) {
      if (err) return res.json({
        status: false,
        url: 'Cant upload your code!'
      })
      return res.json({
        status: true,
        url: 'https://docs-api.nguyenhaidang.ml/upcode/raw/?id=' + id
      })
    }
  );
});
app.get('/download', async (req, res,) => {
  try {
    const imageUrl = req.query.url;
    const response = await axios.get(imageUrl, { responseType: 'stream' });
    const cacheDirectory = path.join(__dirname, 'cache');
    if (!fs.existsSync(cacheDirectory)) {
      fs.mkdirSync(cacheDirectory);
    } const imageFileName = path.join(cacheDirectory, 'downloaded-image.jpg');
    const writer = fs.createWriteStream(imageFileName); response.data.pipe(writer);
    writer.on('finish', () => {
      res.download(imageFileName, 'downloaded-image.jpg', (err) => {
        if (err) {
          console.error('Error sending file:', err);
          res.status(500).end();
        } else {
          console.log('Image downloaded and sent successfully.');
        }
      });
    });
  } catch (error) {
    console.error('Error downloading image:', error);
    res.status(500).end();
  }
});
//const express = require('express');
const FormData = require('form-data');
const http = require('https');

//const app = express();
//const port = 3000; // Set your desired port
const YOUR_ENTERED_API_KEY = 'BSUAAkjwwFTz5Q1ruH8RHlScJP2O4RPN'; // Replace with your actual API key

app.get('/upscale', (req, res) => {
  try {
    const url = req.query.url;

    if (!url) {
      return res.status(400).json({ error: 'Missing image URL' });
    }

    const form = new FormData();
    form.append('upscale_factor', 'x2');
    form.append('image_url', url);

    const options = {
      method: 'POST',
      hostname: 'api.picsart.io',
      path: '/tools/1.0/upscale',
      headers: {
        accept: 'application/json',
        'x-picsart-api-key': YOUR_ENTERED_API_KEY,
        ...form.getHeaders()
      }
    };

    const req = http.request(options, (response) => {
      const chunks = [];

      response.on('data', (chunk) => {
        chunks.push(chunk);
      });

      response.on('end', () => {
        const body = Buffer.concat(chunks);
        res.json(JSON.parse(body.toString()));
      });
    });

    req.on('error', (error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });

    form.pipe(req);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


