__path = process.cwd()

var express = require('express');
const axios = require('axios');
const { exec } = require('child_process');
const DIG = require('discord-image-generation');
const canvafy = require("canvafy");
const fs = require('fs');
const qs = require('qs');
const FormData = require('form-data');
const stream = require('stream');
const alip = require("../slib/listdl")
const textto = require('soundoftext-js')
const googleIt = require('google-it')
const { shortText } = require("limit-text-js")
const Canvas = require('canvas');
const TinyURL = require('tinyurl');
var isUrl = require("is-url")
const BitlyClient = require('bitly').BitlyClient
//const canvasGif = require('canvas-gif')
//const sdk = require('api')('@picsartfordevelopers/v1.0#11wm1w0lnsym3a6');
const apiKey = 'BSUAAkjwwFTz5Q1ruH8RHlScJP2O4RPN';
const { convertStringToNumber } = require('convert-string-to-number');
const { check_api_key } = require('../utils/index'); // Make sure to provide the correct path
var cheerio = require('cheerio');
var request = require('request');
var router  = express.Router();
const zrapi = require("zrapi");
const saki = require("nayan-photo-api")
const isImageURL = require('image-url-validator').default
//const { fetchJson, runtime, getBuffer } = require('../slib/myfunc')
const Canvacord = require("canvacord");
const isNumber = require('is-number');
const { fetchJson, runtime, getBuffer } = require('../slib/myfunc')
const credentials = {
    clientId: '8a04e36d88654f4b96d8ae564d929bf8',
    clientSecret: '10807fefa89646edb640b3faeaf83567'
};
async function getAccessToken() {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const data = qs.stringify({ grant_type: 'client_credentials' });

    const headers = {
        'Authorization': 'Basic ' + Buffer.from(`${credentials.clientId}:${credentials.clientSecret}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    try {
        const response = await axios.post(tokenUrl, data, { headers });
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error);
    }
}
async function searchTrack(keyword, token) {
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(keyword)}&type=track&limit=1`;
    const headers = {
        'Authorization': `Bearer ${token}`
    };

    try {
        const response = await axios.get(searchUrl, { headers });
        return response.data.tracks.items[0];
    } catch (error) {
        console.error('Error searching for track:', error);
    }
}

const gptKey = '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';
const gptbUrl = 'https://api.openai.com/v1/chat/completions';
const fetch = require('node-fetch');
//const express = require('express');
const { RsnChat } = require('rsnchat');
const rsnchat = new RsnChat('rsnai_oCtOzqgxfNkzREd7PzI31F0p');
router.get('/spotify', async (req, res) => {
    const keyword = req.query.keyword;

    if (!keyword) {
        return res.status(400).send('Keyword is required');
    }

    try {
        const token = await getAccessToken();
        if (token) {
            const track = await searchTrack(keyword, token);
            if (track) {
                res.json({
                    trackName: track.name,
                    artist: track.artists.map(artist => artist.name).join(', '),
                    album: track.album.name,
                    previewUrl: track.preview_url
                });
            } else {
                res.status(404).send('No track found for the given keyword.');
            }
        } else {
            res.status(500).send('Unable to obtain access token.');
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/allai', async (req, res) => {
  try {
    const prompt = req.query.prompt || 'Hello, what is your name?';
    const aiType = req.query.aiType || 'gpt';
    const response = await rsnchat[aiType](prompt);

    res.json({ message: response.message });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).send('Error generating response');
  }
});
router.get('/prodia', async (req, res) => {
  try {
    const prompt = req.query.prompt;
    const negativePrompt = req.query.negative_prompt || 'blurry, bad quality';
    const model = req.query.model || 'anythingv3_0-pruned.ckpt [2700c435]';

    const response = await rsnchat.prodia(prompt, negativePrompt, model);

    if (response.success) {
      // Redirect to the generated image URL
      res.redirect(response.imageUrl);
    } else {
      res.status(500).send('Error generating image');
    }
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).send('Error generating image');
  }
});
router.get('/bard', async (req, res) => {
  try {
    const prompt = req.query.prompt || 'Hello, what is your name?';

    const response = await rsnchat.bard(prompt);

    res.json({ message: response.message });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).send('Error generating response');
  }
});

router.get("/letfile", (req, res) => {
  const filePath = req.query.file;
  
  // Check if filePath is provided
  if (!filePath) {
    return res.status(400).send("File path not provided.");
  }

  // Check if the requested file type is allowed
  const allowedExtensions = ['.js', '.json', '.png'];
  const fileExtension = path.extname(filePath);
  if (!allowedExtensions.includes(fileExtension)) {
    return res.status(400).send("File type not supported.");
  }

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found.");
  }

  // Set appropriate content type based on file type
  let contentType = '';
  if (fileExtension === '.js') {
    contentType = 'application/javascript';
  } else if (fileExtension === '.json') {
    contentType = 'application/json';
  } else if (fileExtension === '.png') {
    contentType = 'image/png';
  }

  // Set headers and send the file
  res.set({
    'Content-Type': contentType,
    'Content-Disposition': `attachment; filename="${path.basename(filePath)}"`
  });
  res.sendFile(filePath);
});


router.get('/gpt4', async (req, res) => {
  try {
    const prompt = req.query.prompt || 'Hello, what is your name?';

    const response = await rsnchat.openchat(prompt);

    res.json({ message: response.message });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).send('Error generating response');
  }
});
router.get('/upscale', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: 'Missing image URL' });
    }

    const formData = new FormData();
    formData.append('upscale_factor', 'x4');
    formData.append('format', 'JPG');
    formData.append('image_url', url);

    const apiUrl = 'https://api.picsart.io/tools/1.0/upscale';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'X-Picsart-API-Key': 'BSUAAkjwwFTz5Q1ruH8RHlScJP2O4RPN'
      },
      body: formData
    };

    const response = await fetch(apiUrl, options);
    const json = await response.json();

    res.json(json);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/blackbox', async (req, res, next) => {
 const apiKey = req.query.apikey;
  const apiKeyCheck = check_api_key(apiKey);
  if (apiKeyCheck.error === 1) {
    return res.status(403).json({ error: apiKeyCheck.msg });
  }
  const query = req.query.prompt;
  const url = 'https://useblackbox.io/chat-request-v4';
  const data = {
    textInput: query,
    allMessages: [{user: query}],
    stream: '',
    clickedContinue: false,
  };
  axios.post(url, data)
    .then(response => {
      const message = response.data.response[0][0];
      res.json({ message });
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred.' });
    });
});
router.get('/gpt', async (req, res, next) => {
  const message = req.query.msg;
  if (!message) {
    return res.status(400).json({ error: 'Please provide a message in endpoint ex: gpt?msg=hi' });
  }
  try {
    const response = await axios.post(
      gptbUrl,
      {
        prompt: message,
        max_tokens: 7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${gptKey}`,
        },
      }
    );
    const gptResponse = response.data.choices[0] ? response.data.choices[0].text : null;
    if (gptResponse) {
      res.json({ message: gptResponse });
    } else {
      res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});
router.get('/textpro', async (req, res, next) => {
  const apiKey = req.query.apikey;
  const apiKeyCheck = check_api_key(apiKey);
  if (apiKeyCheck.error === 1) {
    return res.status(403).json({ error: apiKeyCheck.msg });
  }
  if (!req.query.text || !req.query.number) {
    return res.status(400).json({ error: 'Missing text or number parameters' });
  }

if (!req.query.text) return 
if (!req.query.number) return 
if (req.query.number == "1"){ var urlpro = "https://textpro.me/create-sunset-light-text-effects-online-for-free-1124.html"} 
if (req.query.number == "2"){ var urlpro = "https://textpro.me/create-naruto-logo-style-text-effect-online-1125.html"}
if (req.query.number == "3"){ var urlpro = "https://textpro.me/eroded-metal-text-effect-834.html"}
if (req.query.number == "4"){ var urlpro = "https://textpro.me/bronze-glitter-text-effect-835.html"}
if (req.query.number == "5"){ var urlpro = "https://textpro.me/silver-glitter-text-effect-837.html"}
if (req.query.number == "6"){ var urlpro = "https://textpro.me/purple-glitter-text-effect-840.html"}
if (req.query.number == "7"){ var urlpro = "https://textpro.me/blue-glitter-text-effect-841.html"}
if (req.query.number == "8"){ var urlpro = "https://textpro.me/hexa-golden-text-effect-842.html"}
if (req.query.number == "9"){ var urlpro = "https://textpro.me/hot-metal-text-effect-843.html"}
if (req.query.number == "10"){ var urlpro = "https://textpro.me/purple-gem-text-effect-853.html"}
if (req.query.number == "11"){ var urlpro = "https://textpro.me/metal-rainbow-text-effect-854.html"}
if (req.query.number == "12"){ var urlpro = "https://textpro.me/sci-fi-text-effect-855.html"}
if (req.query.number == "13"){ var urlpro = "https://textpro.me/wood-text-effect-856.html"}
if (req.query.number == "14"){ var urlpro = "https://textpro.me/bagel-text-effect-857.html"}
if (req.query.number == "15"){ var urlpro = "https://textpro.me/biscuit-text-effect-858.html"}
if (req.query.number == "16"){ var urlpro = "https://textpro.me/abstra-gold-text-effect-859.html"}
if (req.query.number == "17"){ var urlpro = "https://textpro.me/rusty-metal-text-effect-860.html"}
if (req.query.number == "18"){ var urlpro = "https://textpro.me/fruit-juice-text-effect-861.html"}
if (req.query.number == "19"){ var urlpro = "https://textpro.me/ice-cold-text-effect-862.html"}
if (req.query.number == "20"){ var urlpro = "https://textpro.me/marble-text-effect-863.html"}
if (req.query.number == "21"){ var urlpro = "https://textpro.me/horror-gift-text-effect-866.html"}
if (req.query.number == "22"){ var urlpro = "https://textpro.me/plastic-bag-drug-text-effect-867.html"}
if (req.query.number == "23"){ var urlpro = "https://textpro.me/honey-text-effect-868.html"}
if (req.query.number == "24"){ var urlpro = "https://textpro.me/chrismast-gift-text-effect-869.html"} 
if (req.query.number == "25"){ var urlpro = "https://textpro.me/break-wall-text-effect-871.html"}
if (req.query.number == "26"){ var urlpro = "https://textpro.me/dropwater-text-effect-872.html"}
if (req.query.number == "27"){ var urlpro = "https://textpro.me/free-advanced-glow-text-effect-873.html"}
if (req.query.number == "28"){ var urlpro = "https://textpro.me/green-neon-text-effect-874.html"}
if (req.query.number == "29"){ var urlpro = "https://textpro.me/bokeh-text-effect-876.html"}
if (req.query.number == "30"){ var urlpro = "https://textpro.me/deluxe-silver-text-effect-970.html"}
if (req.query.number == "31"){ var urlpro = "https://textpro.me/road-warning-text-effect-878.html"}
if (req.query.number == "32"){ var urlpro = "https://textpro.me/neon-text-effect-online-879.html"}
if (req.query.number == "33"){ var urlpro = "https://textpro.me/3d-box-text-effect-online-880.html"}
if (req.query.number == "34"){ var urlpro = "https://textpro.me/create-thunder-text-effect-online-881.html"}
if (req.query.number == "35"){ var urlpro = "https://textpro.me/neon-light-text-effect-online-882.html"}
if (req.query.number == "36"){ var urlpro = "https://textpro.me/horror-blood-text-effect-online-883.html"}
if (req.query.number == "37"){ var urlpro = "https://textpro.me/matrix-style-text-effect-online-884.html"}
if (req.query.number == "38"){ var urlpro = "https://textpro.me/bread-text-effect-online-887.html"}
if (req.query.number == "39"){ var urlpro = "https://textpro.me/koi-fish-text-effect-online-888.html"}
if (req.query.number == "40"){ var urlpro = "https://textpro.me/strawberry-text-effect-online-889.html"}
if (req.query.number == "41"){ var urlpro = "https://textpro.me/chocolate-cake-text-effect-890.html"}
if (req.query.number == "42"){ var urlpro = "https://textpro.me/decorative-glass-text-effect-891.html"}
if (req.query.number == "43"){ var urlpro = "https://textpro.me/purple-glass-text-effect-online-892.html"}
if (req.query.number == "44"){ var urlpro = "https://textpro.me/cyan-sparkling-jewelry-text-effect-893.html"}
if (req.query.number == "45"){ var urlpro = "https://textpro.me/red-sparkling-jewelry-text-effect-894.html"}
if (req.query.number == "46"){ var urlpro = "https://textpro.me/toxic-text-effect-online-901.html"}
if (req.query.number == "47"){ var urlpro = "https://textpro.me/rainbow-equalizer-text-effect-902.html"} 
if (req.query.number == "48"){ var urlpro = "https://textpro.me/robot-r2-d2-text-effect-903.html"}
if (req.query.number == "49"){ var urlpro = "https://textpro.me/captain-america-text-effect-905.html"}
if (req.query.number == "50"){ var urlpro = "https://textpro.me/purple-shiny-glass-text-effect-906.html"}
if (req.query.number == "51"){ var urlpro = "https://textpro.me/blue-glass-text-effect-908.html"}
if (req.query.number == "52"){ var urlpro = "https://textpro.me/orange-glass-text-effect-911.html"}
if (req.query.number == "53"){ var urlpro = "https://textpro.me/yellow-glass-text-effect-913.html"}
if (req.query.number == "54"){ var urlpro = "https://textpro.me/lava-text-effect-online-914.html"}
if (req.query.number == "55"){ var urlpro = "https://textpro.me/rock-text-effect-online-915.html"}
if (req.query.number == "56"){ var urlpro = "https://textpro.me/peridot-stone-text-effect-916.html"}
if (req.query.number == "57"){ var urlpro = "https://textpro.me/decorate-purple-text-effect-917.html"}
if (req.query.number == "58"){ var urlpro = "https://textpro.me/denim-text-effect-online-919.html"}
if (req.query.number == "59"){ var urlpro = "https://textpro.me/steel-text-effect-online-921.html"}
if (req.query.number == "60"){ var urlpro = "https://textpro.me/gold-foil-balloon-text-effect-922.html"}
if (req.query.number == "61"){ var urlpro = "https://textpro.me/green-foil-balloon-text-effect-925.html"} 
if (req.query.number == "62"){ var urlpro = "https://textpro.me/purple-foil-balloon-text-effect-927.html"}
if (req.query.number == "63"){ var urlpro = "https://textpro.me/skeleton-text-effect-online-929.html"}
if (req.query.number == "64"){ var urlpro = "https://textpro.me/firework-sparkle-text-effect-930.html"}
if (req.query.number == "65"){ var urlpro = "https://textpro.me/natural-leaves-text-effect-931.html"}
if (req.query.number == "66"){ var urlpro = "https://textpro.me/wicker-text-effect-online-932.html"}
if (req.query.number == "67"){ var urlpro = "https://textpro.me/create-logo-joker-online-934.html"}
if (req.query.number == "68"){ var urlpro = "https://textpro.me/create-wolf-logo-galaxy-online-936.html"}
if (req.query.number == "69"){ var urlpro = "https://textpro.me/create-lion-logo-mascot-online-938.html"}
if (req.query.number == "70"){ var urlpro = "https://textpro.me/metal-dark-gold-text-effect-online-939.html"}
if (req.query.number == "71"){ var urlpro = "https://textpro.me/halloween-fire-text-effect-940.html"}
if (req.query.number == "72"){ var urlpro = "https://textpro.me/blood-text-on-the-frosted-glass-941.html"}
if (req.query.number == "73"){ var urlpro = "https://textpro.me/xmas-cards-3d-online-942.html"}
if (req.query.number == "74"){ var urlpro = "https://textpro.me/text-logo-3d-metal-galaxy-943.html"}
if (req.query.number == "75"){ var urlpro = "https://textpro.me/text-logo-3d-metal-gold-944.html"}
if (req.query.number == "76"){ var urlpro = "https://textpro.me/text-logo-3d-metal-rose-gold-945.html"}
if (req.query.number == "77"){ var urlpro = "https://textpro.me/text-logo-3d-metal-silver-946.html"}
if (req.query.number == "78"){ var urlpro = "https://textpro.me/happ-new-year-card-firework-gif-959.html"}
if (req.query.number == "79"){ var urlpro = "https://textpro.me/new-year-cards-3d-by-name-960.html"}
if (req.query.number == "80"){ var urlpro = "https://textpro.me/neon-text-effect-online-963.html"}
if (req.query.number == "81"){ var urlpro = "https://textpro.me/deluxe-gold-text-effect-966.html"}
if (req.query.number == "82"){ var urlpro = "https://textpro.me/glossy-carbon-text-effect-965.html"}
if (req.query.number == "83"){ var urlpro = "https://textpro.me/holographic-3d-text-effect-975.html"}
if (req.query.number == "84"){ var urlpro = "https://textpro.me/minion-text-effect-3d-online-978.html"} 
if (req.query.number == "85"){ var urlpro = "https://textpro.me/1917-style-text-effect-online-980.html"}
if (req.query.number == "86"){ var urlpro = "https://textpro.me/neon-light-text-effect-with-galaxy-style-981.html"}
if (req.query.number == "87"){ var urlpro = "https://textpro.me/metal-dark-gold-text-effect-984.html"}
if (req.query.number == "88"){ var urlpro = "https://textpro.me/create-3d-glue-text-effect-with-realistic-style-986.html"}
if (req.query.number == "89"){ var urlpro = "https://textpro.me/create-a-summery-sand-writing-text-effect-988.html"}
if (req.query.number == "90"){ var urlpro = "https://textpro.me/sand-engraved-3d-text-effect-989.html"}
if (req.query.number == "91"){ var urlpro = "https://textpro.me/sand-writing-text-effect-online-990.html"}
if (req.query.number == "92"){ var urlpro = "https://textpro.me/write-in-sand-summer-beach-free-online-991.html"}
if (req.query.number == "93"){ var urlpro = "https://textpro.me/create-a-cloud-text-effect-in-the-sky-online-997.html"}
if (req.query.number == "94"){ var urlpro = "https://textpro.me/create-a-christmas-holiday-snow-text-effect-1007.html"}
if (req.query.number == "95"){ var urlpro = "https://textpro.me/create-wonderful-graffiti-art-text-effect-1011.html"}
if (req.query.number == "96"){ var urlpro = "https://textpro.me/3d-underwater-text-effect-generator-online-1013.html"}
if (req.query.number == "97"){ var urlpro = "https://textpro.me/create-a-free-online-watercolor-text-effect-1017.html"}
if (req.query.number == "98"){ var urlpro = "https://textpro.me/online-multicolor-3d-paper-cut-text-effect-1016.html"}
if (req.query.number == "99"){ var urlpro = "https://textpro.me/create-a-3d-glossy-metal-text-effect-1019.html"}
if (req.query.number == "100"){ var urlpro = "https://textpro.me/online-3d-gradient-text-effect-generator-1020.html"}
if (req.query.number == "101"){ var urlpro = "https://textpro.me/create-art-paper-cut-text-effect-online-1022.html"}
if (req.query.number == "102"){ var urlpro = "https://textpro.me/broken-glass-text-effect-free-online-1023.html"}
if (req.query.number == "103"){ var urlpro = "https://textpro.me/create-embossed-text-effect-on-cracked-surface-1024.html"}
if (req.query.number == "104"){ var urlpro = "https://textpro.me/create-harry-potter-text-effect-1025.html"}
if (req.query.number == "105"){ var urlpro = "https://textpro.me/create-impressive-glitch-text-effects-online-1027.html"}
if (req.query.number == "106"){ var urlpro = "https://textpro.me/create-3d-neon-light-text-effect-online-1028.html"}
if (req.query.number == "107"){ var urlpro = "https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html"} 
if (req.query.number == "108"){ var urlpro = "https://textpro.me/online-thunder-text-effect-generator-1031.html"}
if (req.query.number == "109"){ var urlpro = "https://textpro.me/create-berry-text-effect-online-free-1033.html"}
if (req.query.number == "110"){ var urlpro = "https://textpro.me/create-a-transformer-text-effect-online-1035.html"}
if (req.query.number == "111"){ var urlpro = "https://textpro.me/create-green-horror-style-text-effect-online-1036.html"}
if (req.query.number == "112"){ var urlpro = "https://textpro.me/free-advanced-glow-text-effect-873.html"}
if (req.query.number == "113"){ var urlpro = "https://textpro.me/neon-text-effect-online-963.html"}
if (req.query.number == "114"){ var urlpro = "https://textpro.me/create-a-christmas-holiday-snow-text-effect-1007.html"}
if (req.query.number == "115"){ var urlpro = "https://textpro.me/3d-christmas-text-effect-by-name-1055.html"}
if (req.query.number == "116"){ var urlpro = "https://textpro.me/create-christmas-candy-cane-text-effect-1056.html"}
if (req.query.number == "117"){ var urlpro = "https://textpro.me/christmas-tree-text-effect-online-free-1057.html"}
if (req.query.number == "118"){ var urlpro = "https://textpro.me/chrismast-gift-text-effect-869.html"}
if (req.query.number == "119"){ var urlpro = "https://textpro.me/road-warning-text-effect-878.html"}
if (req.query.number == "120"){ var urlpro = "https://textpro.me/horror-blood-text-effect-online-883.html"}
if (req.query.number == "121"){ var urlpro = "https://textpro.me/create-3d-sci-fi-text-effect-online-1050.html"} 
if (req.query.number == "122"){ var urlpro = "https://textpro.me/create-3d-sci-fi-text-effect-online-1060.html"}
if (req.query.number == "123"){ var urlpro = "https://textpro.me/online-3d-gradient-text-effect-generator-1020.html"}
if (req.query.number == "124"){ var urlpro = "https://textpro.me/plastic-bag-drug-text-effect-867.html"}
if (req.query.number == "125"){ var urlpro = "https://textpro.me/create-space-text-effects-online-free-1042.html"}
if (req.query.number == "126"){ var urlpro = "https://textpro.me/robot-r2-d2-text-effect-903.html"}
if (req.query.number == "127"){ var urlpro = "https://textpro.me/peridot-stone-text-effect-916.html"}
if (req.query.number == "128"){ var urlpro = "https://textpro.me/gold-foil-balloon-text-effect-922.html"}
if (req.query.number == "129"){ var urlpro = "https://textpro.me/green-foil-balloon-text-effect-925.html"}
if (req.query.number == "130"){ var urlpro = "https://textpro.me/koi-fish-text-effect-online-888.html"}
if (req.query.number == "131"){ var urlpro = "https://textpro.me/neon-light-text-effect-with-galaxy-style-981.html"}
if (req.query.number == "132"){ var urlpro = "https://textpro.me/create-wolf-logo-galaxy-online-936.html"}
if (req.query.number == "133"){ var urlpro = "https://textpro.me/text-logo-3d-metal-silver-946.html"}
if (req.query.number == "134"){ var urlpro = "https://textpro.me/create-a-summery-sand-writing-text-effect-988.html"}
if (req.query.number == "135"){ var urlpro = "https://textpro.me/sand-engraved-3d-text-effect-989.html"}
if (req.query.number == "136"){ var urlpro = "https://textpro.me/blue-gem-text-effect-830.html"}
if (req.query.number == "137"){ var urlpro = "https://textpro.me/biscuit-text-effect-858.html"}
if (req.query.number == "138"){ var urlpro = "https://textpro.me/chocolate-cake-text-effect-890.html"}
if (req.query.number == "139"){ var urlpro = "https://textpro.me/pink-candy-text-effect-832.html"}
if (req.query.number == "140"){ var urlpro = "https://textpro.me/honey-text-effect-868.html"}
if (req.query.number == "141"){ var urlpro = "https://textpro.me/bagel-text-effect-857.html"}
if (req.query.number == "142"){ var urlpro = "https://textpro.me/strawberry-text-effect-online-889.html"}
if (req.query.number == "143"){ var urlpro = "https://textpro.me/bread-text-effect-online-887.html"}
if (req.query.number == "144"){ var urlpro = "https://textpro.me/create-a-3d-orange-juice-text-effect-online-1084.html"} 
if (req.query.number == "145"){ var urlpro = "https://textpro.me/create-berry-text-effect-online-free-1033.html"}
if (req.query.number == "146"){ var urlpro = "https://textpro.me/eroded-metal-text-effect-834.html"}
if (req.query.number == "147"){ var urlpro = "https://textpro.me/bronze-glitter-text-effect-835.html"}
if (req.query.number == "148"){ var urlpro = "https://textpro.me/marble-text-effect-863.html"}
if (req.query.number == "149"){ var urlpro = "https://textpro.me/hexa-golden-text-effect-842.html"}
if (req.query.number == "150"){ var urlpro = "https://textpro.me/purple-glitter-text-effect-840.html"}
if (req.query.number == "151"){ var urlpro = "https://textpro.me/cyan-sparkling-jewelry-text-effect-893.html"}
if (req.query.number == "152"){ var urlpro = "https://textpro.me/orange-jewelry-text-effect-847.html"}
if (req.query.number == "153"){ var urlpro = "https://textpro.me/red-sparkling-jewelry-text-effect-894.html"}
if (req.query.number == "154"){ var urlpro = "https://textpro.me/abstra-gold-text-effect-859.html"}
if (req.query.number == "155"){ var urlpro = "https://textpro.me/silver-glitter-text-effect-837.html"}
if (req.query.number == "156"){ var urlpro = "https://textpro.me/gold-glitter-text-effect-836.html"}
if (req.query.number == "157"){ var urlpro = "https://textpro.me/blue-glitter-text-effect-841.html"}
if (req.query.number == "158"){ var urlpro = "https://textpro.me/purple-gem-text-effect-853.html"}
if (req.query.number == "159"){ var urlpro = "https://textpro.me/sci-fi-text-effect-855.html"}
if (req.query.number == "160"){ var urlpro = "https://textpro.me/create-3d-sci-fi-text-effect-online-1050.html"}
if (req.query.number == "161"){ var urlpro = "https://textpro.me/create-science-fiction-text-effect-online-free-1038.html"}
if (req.query.number == "162"){ var urlpro = "https://textpro.me/fruit-juice-text-effect-861.html"}
if (req.query.number == "163"){ var urlpro = "https://textpro.me/3d-steel-text-effect-877.html"}
if (req.query.number == "164"){ var urlpro = "https://textpro.me/3d-box-text-effect-online-880.html"}
if (req.query.number == "165"){ var urlpro = "https://textpro.me/3d-gradient-text-effect-online-free-1002.html"}
if (req.query.number == "166"){ var urlpro = "https://textpro.me/3d-rainbow-color-calligraphy-text-effect-1049.html"}
if (req.query.number == "167"){ var urlpro = "https://textpro.me/matrix-style-text-effect-online-884.html"} 
if (req.query.number == "168"){ var urlpro = "https://textpro.me/create-neon-light-blackpink-logo-text-effect-online-1081.html"}
if (req.query.number == "169"){ var urlpro = "https://textpro.me/green-neon-text-effect-874.html"}
if (req.query.number == "170"){ var urlpro = "https://textpro.me/create-a-glitch-text-effect-online-free-1026.html"}
if (req.query.number == "171"){ var urlpro = "https://textpro.me/online-thunder-text-effect-generator-1031.html"}
if (req.query.number == "172"){ var urlpro = "https://textpro.me/create-impressive-glitch-text-effects-online-1027.html"}
if (req.query.number == "173"){ var urlpro = "https://textpro.me/text-logo-3d-metal-galaxy-943.html"}
if (req.query.number == "174"){ var urlpro = "https://textpro.me/create-a-rusted-metal-text-effect-online-1087.html"}
if (req.query.number == "175"){ var urlpro = "https://textpro.me/free-creative-3d-golden-text-effect-online-1075.html"}
if (req.query.number == "176"){ var urlpro = "https://textpro.me/create-a-3d-luxury-metallic-text-effect-for-free-1071.html"}
if (req.query.number == "177"){ var urlpro = "https://textpro.me/deluxe-gold-text-effect-966.html"}
if (req.query.number == "178"){ var urlpro = "https://textpro.me/text-logo-3d-metal-silver-946.html"}
if (req.query.number == "179"){ var urlpro = "https://textpro.me/metal-rainbow-text-effect-854.html"}
if (req.query.number == "180"){ var urlpro = "https://textpro.me/text-logo-3d-metal-rose-gold-945.html"}
if (req.query.number == "181"){ var urlpro = "https://textpro.me/party-text-effect-with-the-night-event-theme-1105.html"}
  if (req.query.number == "182"){ var urlpro = "https://textpro.me/party-text-effect-with-the-night-event-theme-1105.html"}

  saki.textpro(urlpro, [req.query.text])
  .then((data) => { 
  var requestSettings = {
      url: data,
      method: 'GET',
      encoding: null
   };
   request(requestSettings, function(error, response, body) {
      res.set('Content-Type', 'image/png');
      res.send(body);
   });
   })
})  
/* image maker by Sakibin */
router.get('/maker/emojimix', async (req, res, next) => {
 const apiKey = req.query.apikey;
  const apiKeyCheck = check_api_key(apiKey);
  if (apiKeyCheck.error === 1) {
    return res.status(403).json({ error: apiKeyCheck.msg });
  }
  var emoji1 = req.query.emoji1
  var emoji2 = req.query.emoji2
  if (!emoji1) return res.json({ status: false, creator: `${creator}`, message: "[!] SAKIBIN parameter emoji1" })
  if (!emoji2) return res.json({ status: false, creator: `${creator}`, message: "[!] Sakibin parameter emoji2" })


  let data = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
  let jadi = data.results[Math.floor(Math.random() * data.results.length)]
  if (!jadi) return res.json(loghandler.notfound)
  for (let ress of data.results) {
    resul = await getBuffer(ress.url)
    res.set({ 'Content-Type': 'image/png' })
    res.send(resul)
  }
})
router.get('/maker/circle', async (req, res) => {
  const apiKey = req.query.apikey;
  const apiKeyCheck = check_api_key(apiKey);
  if (apiKeyCheck.error === 1) {
    return res.status(403).json({ error: apiKeyCheck.msg });
  }
  var text = req.query.url
  if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
  var img = await isImageURL(text)
  if (!img) return res.json({ status: false, creator: 'Sakibin', message: "[!] Check url image" })

  const hasil = await Canvacord.Canvas.circle(text);
  res.set({ 'Content-Type': 'image/png' })
  res.send(hasil)

})
router.get('/maker/beautiful', async (req, res) => {
            const apiKey = req.query.apikey;
            const apiKeyCheck = check_api_key(apiKey);
            if (apiKeyCheck.error === 1) {
              return res.status(403).json({ error: apiKeyCheck.msg });
            }

            var text = req.query.url
            if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
            var img = await isImageURL(text)
            if (!img) return res.json({ status: false, creator: 'Alip', message: "[!] cek kembali url image" })

            const hasil = await canvafy.Image.delete(text);
            res.set({ 'Content-Type': 'image/png' })
            res.send(hasil)

          })
router.get('/maker/jail', async (req, res) => {
  const apiKey = req.query.apikey;
  const apiKeyCheck = check_api_key(apiKey);
  if (apiKeyCheck.error === 1) {
    return res.status(403).json({ error: apiKeyCheck.msg });
  }

  var text = req.query.url
  if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
  var img = await isImageURL(text)
  if (!img) return res.json({ status: false, creator: 'Alip', message: "[!] cek kembali url image" })

  const hasil = await new DIG.Jail().getImage(text);
  res.set({ 'Content-Type': 'image/png' })
  res.send(hasil)

})
router.get('/maker/rankcard', async (req, res) => {
  const avatar= "https://i.imgur.com/V42C9yt.jpg";
  const userName = req.query.name;
  const hasil = await new canvafy.Rank()
    .setAvatar(avatar)
    .setBackground("image", "https://i.ibb.co/VYPJ91q/Pics-Art-24-03-04-23-02-16-628.png")
    .setUsername(userName)
    .setBorder("#fff")
    .setStatus("online")
    .setBarColor("#0080ff") .setRankColor({text:"#fff",number:"#fff"})
    .setLevel(2)
    .setRank(1)
    .setCurrentXp(30)
    .setRequiredXp(200)
    .build();
  res.set({ 'Content-Type': 'image/png' })
  res.send(hasil)

})
router.get('/maker/topuser', async (req, res) => {
  const message = req.query.msg;
  const hasil = await new canvafy.Top()
.setOpacity(0.6)
.setScoreMessage(message) //(Preferred Option)
.setabbreviateNumber(false) //(Preferred Option)
.setBackground("image", "https://i.ibb.co/Xkwb2kH/Pics-Art-24-03-06-21-34-15-505.png") //(Preferred Option)
.setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#f7c716', secondRank: '#9e9e9e', thirdRank: '#94610f' }) //(Preferred Option)
.setUsersData([
{ top: 1, avatar: "https://i.imgur.com/V42C9yt.jpg", tag: "Sakibin#0005", score: 5555 },
{ top: 2, avatar: "https://i.imgur.com/V42C9yt.jpg", tag: "Lulushu#1337", score: 1337 },
{ top: 3, avatar: "https://i.imgur.com/V42C9yt.jpg", tag: "Approval.#0001", score: 1054 },
{ top: 4, avatar: "https://i.imgur.com/V42C9yt.jpg", tag: "luhux#1937", score: 903 },
{ top: 5, avatar: "https://i.imgur.com/V42C9yt.jpg", tag: "Deleted User#0000", score: 0 },
{ top: 6, avatar: "https://i.imgur.com/V42C9yt.jpg", tag: "Deleted User#0000", score: 0 },
{ top: 7, avatar: "https://i.imgur.com/V42C9yt.jpg", tag: "Deleted User#0000", score: 0 },
{ top: 8, avatar: "https://i.imgur.com/V42C9yt.jpg", tag: "Deleted User#0000", score: 0 },
{ top: 9, avatar: "https://i.imgur.com/V42C9yt.jpg", tag: "Deleted User#0000", score: 0 },
{ top: 10, avatar: "https://i.imgur.com/V42C9yt.jpg", tag: "Deleted User#0000", score: 0 },
])
.build();
  res.set({ 'Content-Type': 'image/png' })
  res.send(hasil)

})
router.get('/maker/blur', async (req, res) => {
            const apiKey = req.query.apikey;
            const apiKeyCheck = check_api_key(apiKey);
            if (apiKeyCheck.error === 1) {
              return res.status(403).json({ error: apiKeyCheck.msg });
            }
            var text = req.query.url
            if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
            var img = await isImageURL(text)
            if (!img) return res.json({ status: false, creator: 'Alip', message: "[!] cek kembali url image" })

            const hasil = await Canvacord.Canvas.blur(text)
            res.set({ 'Content-Type': 'image/png' })
            res.send(hasil)

          })

router.get('/maker/darkness', async (req, res) => {
            const apiKey = req.query.apikey;
            const apiKeyCheck = check_api_key(apiKey);
            if (apiKeyCheck.error === 1) {
              return res.status(403).json({ error: apiKeyCheck.msg });
            }

            var text = req.query.url
            var no = req.query.no
            if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
            if (!no) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter no" })

            var img = await isImageURL(text)
            var n = isNumber(no)
            if (!img) return res.json({ status: false, creator: 'Alip', message: "[!] cek kembali url image" })
            if (!n) return res.json({ status: false, creator: 'Alip', message: "[!] parameter no nombor sahaja" })


            const hasil = await Canvacord.Canvas.darkness(text, shortText(no, 3))
            res.set({ 'Content-Type': 'image/png' })
            res.send(hasil)

          })

router.get('/maker/facepalm', async (req, res) => {
 const apiKey = req.query.apikey;
  const apiKeyCheck = check_api_key(apiKey);
  if (apiKeyCheck.error === 1) {
    return res.status(403).json({ error: apiKeyCheck.msg });
  }
            var text = req.query.url
            if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
            var img = await isImageURL(text)
            if (!img) return res.json({ status: false, creator: 'Alip', message: "[!] cek kembali url image" })

            const hasil = await Canvacord.Canvas.facepalm(text)
            res.set({ 'Content-Type': 'image/png' })
            res.send(hasil)

          })

router.get('/maker/invert', async (req, res) => {
            const apiKey = req.query.apikey;
            const apiKeyCheck = check_api_key(apiKey);
            if (apiKeyCheck.error === 1) {
              return res.status(403).json({ error: apiKeyCheck.msg });
            }

            var text = req.query.url
            if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
            var img = await isImageURL(text)
            if (!img) return res.json({ status: false, creator: 'Alip', message: "[!] cek kembali url image" })

            const hasil = await Canvacord.Canvas.invert(text)
            res.set({ 'Content-Type': 'image/png' })
            res.send(hasil)

          })

          router.get('/maker/pixelate', async (req, res) => {
            const apiKey = req.query.apikey;
            const apiKeyCheck = check_api_key(apiKey);
            if (apiKeyCheck.error === 1) {
              return res.status(403).json({ error: apiKeyCheck.msg });
            }

            var text = req.query.url
            var no = req.query.no
            if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
            if (!no) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter no" })

            var img = await isImageURL(text)
            var n = isNumber(no)
            if (!img) return res.json({ status: false, creator: 'Alip', message: "[!] cek kembali url image" })
            if (!n) return res.json({ status: false, creator: 'Alip', message: "[!] parameter no nombor sahaja" })


            const hasil = await Canvacord.Canvas.pixelate(text, convertStringToNumber(no))
            res.set({ 'Content-Type': 'image/png' })
            res.send(hasil)

          })


          router.get('/maker/rainbow', async (req, res) => {
            const apiKey = req.query.apikey;
            const apiKeyCheck = check_api_key(apiKey);
            if (apiKeyCheck.error === 1) {
              return res.status(403).json({ error: apiKeyCheck.msg });
            }

            var text = req.query.url
            if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
            var img = await isImageURL(text)
            if (!img) return res.json({ status: false, creator: 'Alip', message: "[!] cek kembali url image" })

            const hasil = await Canvacord.Canvas.rainbow(text)
            res.set({ 'Content-Type': 'image/png' })
            res.send(hasil)

          })

          router.get('/maker/resize', async (req, res) => {
            const apiKey = req.query.apikey;
            const apiKeyCheck = check_api_key(apiKey);
            if (apiKeyCheck.error === 1) {
              return res.status(403).json({ error: apiKeyCheck.msg });
            }

            var text = req.query.url
            var width = req.query.width
            var height = req.query.height

            if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
            if (!width) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter width" })
            if (!height) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter height" })

            let w = width
            let h = height
            if (w > 1000) { w = "1000" }
            if (h > 1000) { h = "1000" }

            var img = await isImageURL(text)
            var wid = isNumber(width)
            var hei = isNumber(height)
            if (!img) return res.json({ status: false, creator: 'Alip', message: "[!] cek kembali url image" })
            if (!wid) return res.json({ status: false, creator: 'Alip', message: "[!] parameter width nombor sahaja" })
            if (!hei) return res.json({ status: false, creator: 'Alip', message: "[!] parameter height nombor sahaja" })

            const hasil = await Canvacord.Canvas.resize(text, convertStringToNumber(w), convertStringToNumber(h))
            res.set({ 'Content-Type': 'image/png' })
            res.send(hasil)

          })

          router.get('/maker/trigger', async (req, res) => {
            const apiKey = req.query.apikey;
            const apiKeyCheck = check_api_key(apiKey);
            if (apiKeyCheck.error === 1) {
              return res.status(403).json({ error: apiKeyCheck.msg });
            }

            var text = req.query.url
            if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
            var img = await isImageURL(text)
            if (!img) return res.json({ status: false, creator: 'Alip', message: "[!] cek kembali url image" })

            const hasil = await Canvacord.Canvas.trigger(text)
            res.set({ 'Content-Type': 'gif' })
            res.send(hasil)

          })

          router.get('/maker/wanted', async (req, res) => {
            const apiKey = req.query.apikey;
            const apiKeyCheck = check_api_key(apiKey);
            if (apiKeyCheck.error === 1) {
              return res.status(403).json({ error: apiKeyCheck.msg });
            }

            var text = req.query.url
            if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
            var img = await isImageURL(text)
            if (!img) return res.json({ status: false, creator: 'Alip', message: "[!] cek kembali url image" })

            const hasil = await Canvacord.Canvas.wanted(text)
            res.set({ 'Content-Type': 'image/png' })
            res.send(hasil)

          })

          router.get('/maker/wasted', async (req, res) => {
            const apiKey = req.query.apikey;
            const apiKeyCheck = check_api_key(apiKey);
            if (apiKeyCheck.error === 1) {
              return res.status(403).json({ error: apiKeyCheck.msg });
            }

            var text = req.query.url
            if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
            var img = await isImageURL(text)
            if (!img) return res.json({ status: false, creator: 'Alip', message: "[!] cek kembali url image" })

            const hasil = await Canvacord.Canvas.wasted(text)
            res.set({ 'Content-Type': 'image/png' })
            res.send(hasil)

          })

          router.get('/maker/attp', async (req, res) => {
            const apiKey = req.query.apikey;
            const apiKeyCheck = check_api_key(apiKey);
            if (apiKeyCheck.error === 1) {
              return res.status(403).json({ error: apiKeyCheck.msg });
            }

            var text = req.query.text
            if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })

            const file = "./asset/image/attp.gif"

            let length = text.length

            var font = 90
            if (length > 12) { font = 68 }
            if (length > 15) { font = 58 }
            if (length > 18) { font = 55 }
            if (length > 19) { font = 50 }
            if (length > 22) { font = 48 }
            if (length > 24) { font = 38 }
            if (length > 27) { font = 35 }
            if (length > 30) { font = 30 }
            if (length > 35) { font = 26 }
            if (length > 39) { font = 25 }
            if (length > 40) { font = 20 }
            if (length > 49) { font = 10 }
            Canvas.registerFont('./asset/font/SF-Pro.ttf', { family: 'SF-Pro' })
            canvasGif(
              file,
              (ctx, width, height, totalFrames, currentFrame) => {

                var couler = ["#ff0000", "#ffe100", "#33ff00", "#00ffcc", "#0033ff", "#9500ff", "#ff00ff"]
                let jadi = couler[Math.floor(Math.random() * couler.length)]


                function drawStroked(text, x, y) {
                  ctx.font = `${font}px SF-Pro`
                  ctx.strokeStyle = 'black'
                  ctx.lineWidth = 3
                  ctx.textAlign = 'center'
                  ctx.strokeText(text, x, y)
                  ctx.fillStyle = jadi
                  ctx.fillText(text, x, y)
                }

                drawStroked(text, 290, 300)

              },
              {
                coalesce: false, // whether the gif should be coalesced first (requires graphicsmagick), default: false
                delay: 0, // the delay between each frame in ms, default: 0
                repeat: 0, // how many times the GIF should repeat, default: 0 (runs forever)
                algorithm: 'neuquant', // the algorithm the encoder should use, default: 'neuquant',
                optimiser: false, // whether the encoder should use the in-built optimiser, default: false,
                fps: 7, // the amount of frames to render per second, default: 60
                quality: 1, // the quality of the gif, a value between 1 and 100, default: 100
              }
            ).then((buffer) => {
              res.set({ 'Content-Type': 'gif' })
              res.send(buffer)

            })


            router.get('/maker/ttp', async (req, res) => {
              var text = req.query.text
              if (!text) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })

              Canvas.registerFont('./asset/font/SF-Pro.ttf', { family: 'SF-Pro' })
              let length = text.length

              var font = 90
              if (length > 12) { font = 68 }
              if (length > 15) { font = 58 }
              if (length > 18) { font = 55 }
              if (length > 19) { font = 50 }
              if (length > 22) { font = 48 }
              if (length > 24) { font = 38 }
              if (length > 27) { font = 35 }
              if (length > 30) { font = 30 }
              if (length > 35) { font = 26 }
              if (length > 39) { font = 25 }
              if (length > 40) { font = 20 }
              if (length > 49) { font = 10 }

              var ttp = {}
              ttp.create = Canvas.createCanvas(576, 576)
              ttp.context = ttp.create.getContext('2d')
              ttp.context.font = `${font}px SF-Pro`
              ttp.context.strokeStyle = 'black'
              ttp.context.lineWidth = 3
              ttp.context.textAlign = 'center'
              ttp.context.strokeText(text, 290, 300)
              ttp.context.fillStyle = 'white'
              ttp.context.fillText(text, 290, 300)

              res.set({ 'Content-Type': 'image/png' })
              res.send(ttp.create.toBuffer())

            })
          })

router.get('/photooxy/1', async (req, res, next) => {
  const apiKey = req.query.apikey;
  const apiKeyCheck = check_api_key(apiKey);
  if (apiKeyCheck.error === 1) {
    return res.status(403).json({ error: apiKeyCheck.msg });
  }

  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html", [text1])
    .then((data) => {
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/photooxy/2', async (req, res, next) => {
  const apiKey = req.query.apikey;
  const apiKeyCheck = check_api_key(apiKey);
  if (apiKeyCheck.error === 1) {
    return res.status(403).json({ error: apiKeyCheck.msg });
  }

  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html", [text1])
    .then((data) => {
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


router.get('/photooxy/3', async (req, res, next) => {
  const apiKey = req.query.apikey;
  const apiKeyCheck = check_api_key(apiKey);
  if (apiKeyCheck.error === 1) {
    return res.status(403).json({ error: apiKeyCheck.msg });
  }

  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/other-design/create-metallic-text-glow-online-188.html", [text1])
    .then((data) => {
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


router.get('/photooxy/4', async (req, res, next) => {
  const apiKey = req.query.apikey;
  const apiKeyCheck = check_api_key(apiKey);
  if (apiKeyCheck.error === 1) {
    return res.status(403).json({ error: apiKeyCheck.msg });
  }

  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html", [text1])
    .then((data) => {
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


router.get('/photooxy/11', async (req, res, next) => {
  const apiKey = req.query.apikey;
  const apiKeyCheck = check_api_key(apiKey);
  if (apiKeyCheck.error === 1) {
    return res.status(403).json({ error: apiKeyCheck.msg });
  }

  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  var text2 = req.query.text2
  if (!text2) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text2" })
  alip.photooxy("https://photooxy.com/battlegrounds/make-wallpaper-battlegrounds-logo-text-146.html", [text1, text2])
    .then((data) => {
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/photooxy/6', async (req, res, next) => {
  const apiKey = req.query.apikey;
  const apiKeyCheck = check_api_key(apiKey);
  if (apiKeyCheck.error === 1) {
    return res.status(403).json({ error: apiKeyCheck.msg });
  }

  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html", [text1])
    .then((data) => {
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/photooxy/7', async (req, res, next) => {
  const apiKey = req.query.apikey;
  const apiKeyCheck = check_api_key(apiKey);
  if (apiKeyCheck.error === 1) {
    return res.status(403).json({ error: apiKeyCheck.msg });
  }

  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/logo-and-text-effects/create-harry-potter-text-on-horror-background-178.html", [text1])
    .then((data) => {
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/photooxy/8', async (req, res, next) => {
  const apiKey = req.query.apikey;
  const apiKeyCheck = check_api_key(apiKey);
  if (apiKeyCheck.error === 1) {
    return res.status(403).json({ error: apiKeyCheck.msg });
  }

  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/art-effects/flower-typography-text-effect-164.html", [text1])
    .then((data) => {
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/photooxy/9', async (req, res, next) => {
  const apiKey = req.query.apikey;
  const apiKeyCheck = check_api_key(apiKey);
  if (apiKeyCheck.error === 1) {
    return res.status(403).json({ error: apiKeyCheck.msg });
  }

  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-message-377.html", [text1])
    .then((data) => {
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/photooxy/10', async (req, res, next) => {
  const apiKey = req.query.apikey;
  const apiKeyCheck = check_api_key(apiKey);
  if (apiKeyCheck.error === 1) {
    return res.status(403).json({ error: apiKeyCheck.msg });
  }

  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html", [text1])
    .then((data) => {
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/photooxy/5', async (req, res, next) => {
  const apiKey = req.query.apikey;
  const apiKeyCheck = check_api_key(apiKey);
  if (apiKeyCheck.error === 1) {
    return res.status(403).json({ error: apiKeyCheck.msg });
  }

  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/logo-and-text-effects/butterfly-text-with-reflection-effect-183.html", [text1])
    .then((data) => {
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/photooxy/12', async (req, res, next) => {
  const apiKey = req.query.apikey;
  const apiKeyCheck = check_api_key(apiKey);
  if (apiKeyCheck.error === 1) {
    return res.status(403).json({ error: apiKeyCheck.msg });
  }

  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/logo-and-text-effects/write-stars-text-on-the-night-sky-200.html", [text1])
    .then((data) => {
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


router.get('/photooxy/13', async (req, res, next) => {
  const apiKey = req.query.apikey;
  const apiKeyCheck = check_api_key(apiKey);
  if (apiKeyCheck.error === 1) {
    return res.status(403).json({ error: apiKeyCheck.msg });
  }

  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/logo-and-text-effects/carved-wood-effect-online-171.html", [text1])
    .then((data) => {
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


router.get('/photooxy/14', async (req, res, next) => {
  const apiKey = req.query.apikey;
  const apiKeyCheck = check_api_key(apiKey);
  if (apiKeyCheck.error === 1) {
    return res.status(403).json({ error: apiKeyCheck.msg });
  }

  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/logo-and-text-effects/illuminated-metallic-effect-177.html", [text1])
    .then((data) => {
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

router.get('/photooxy/15', async (req, res, next) => {
  const apiKey = req.query.apikey;
  const apiKeyCheck = check_api_key(apiKey);
  if (apiKeyCheck.error === 1) {
    return res.status(403).json({ error: apiKeyCheck.msg });
  }

  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter text" })
  alip.photooxy("https://photooxy.com/logo-and-text-effects/sweet-andy-text-online-168.html", [text1])
    .then((data) => {
      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


module.exports = router
