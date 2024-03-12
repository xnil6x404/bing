# nayan-photo-api (deprecated)

`nayan-photo-api` is made to help. Hopefully this module is useful for developer friends, you can request next scraping or features.

<b>Requires Node >= 12</b>

#### [Documentation](https://github.com/ZefianAlfian/nayan-photo-api)

## Installation

```
npm i nayan-photo-api
```

## Example TextMaker

```js
const nayan-photo-api = require("nayan-photo-api");

//TextPro
nayan-photo-api
  .textpro("https://textpro.me/create-blackpink-logo-style-online-1001.html", [
    "teks",
  ])
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

//TextPro with 2 text
nayan-photo-api
  .textpro(
    "https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html",
    ["teks", "teks 2"]
  )
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

//Photooxy
nayan-photo-api
  .photooxy(
    "https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-message-377.html",
    ["teks"]
  )
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

//Photooxy with 2 text
nayan-photo-api
  .photooxy(
    "https://photooxy.com/logo-and-text-effects/make-tik-tok-text-effect-375.html",
    ["teks", "Teks 2"]
  )
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

## Example Paste

```js
const nayan-photo-api = require("nayan-photo-api");
nayan-photo-api
  .pastegg("you code, console.log('hi')", {
    title: "nayan-photo-api",
    description: "Source code",
    nameFile: "hasil.txt",
  }) //optional
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

//or

let options = {
  title: "nayan-photo-api",
  description: "Source code",
  nameFile: "hasil.txt",
};

nayan-photo-api
  .pastegg("you code, console.log('hi')", options) //options is optional
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

//or

nayan-photo-api
  .pastegg("you code, console.log('hi')") //options is optional
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

## Example Downloader

```js
const nayan-photo-api = require("nayan-photo-api");

// KeepTiktok
nayan-photo-api
  .keeptiktok("https://vt.tiktok.com/khpq9t")
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// Snaptik
nayan-photo-api
  .snaptik("https://vt.tiktok.com/khpq9t")
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

## &#x1F919; Connect With Me

[![Facebook](https://img.shields.io/badge/Facebook-%234267B2.svg?&style=for-the-badge&logo=facebook&logoColor=white)]([https://www.facebook.com/profile.php?id=100000959749712])
[![Telegram](https://img.shields.io/badge/Telegram-%230088cc.svg?&style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/MOHAMMADNAYAN)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/+8801615298449)
