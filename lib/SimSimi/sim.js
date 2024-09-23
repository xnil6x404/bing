exports.name = `/sim`;
exports.index = async (req, res, next) => {
  const fs = require('fs');
  const path = require('path');
  const dataSim = require('./data/sim.json');
  const stringSimilarity = require('string-similarity');

  const badWords = [`boss`, `owner`, `fuck`];  // Array of prohibited words

  if (!req.query.type) return res.json({ error: `Missing data type` });

  if (req.query.type === `ask`) {
    const ask = encodeURI(req.query.ask);
    if (!ask) return res.json({ error: `Missing query to launch the program` });

    const questions = Object.keys(dataSim);
    const checker = stringSimilarity.findBestMatch(decodeURI(ask), questions);

    if (checker.bestMatch.rating >= 0.5) {
      var search = checker.bestMatch.target;
    }

    if (search === undefined) return res.json({ answer: `what?🙂` });

    const answers = dataSim[search];
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];

    return res.json({ answer: randomAnswer });
  }

  if (req.query.type === `teach`) {
    const ask = req.query.ask;
    const ans = req.query.ans;

    if (!ask || !ans) {
      return res.json({ error: `Missing data to execute command` });
    }

    // Check for bad language
    const containsBadLanguage = badWords.some(word => ask.toLowerCase().includes(word) || ans.toLowerCase().includes(word));
    if (containsBadLanguage) {
      return res.json({ error: `Bad language detected! Can't teach!` });
    }

    if (dataSim.hasOwnProperty(ask)) {
      if (dataSim[ask].includes(ans)) {
        return res.json({ error: `The answer already exists!` });
      }
      dataSim[ask].push(ans);
    } else {
      dataSim[ask] = [ans];
    }

    const filePath = path.join(__dirname, `data`, `sim.json`);
    fs.writeFileSync(filePath, JSON.stringify(dataSim, null, 2), `utf-8`);

    return res.json({
      msg: `Teaching sim successfully`,
      data: {
        ask,
        ans,
      },
    });
  }
};
