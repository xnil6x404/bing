exports.name = `/sim`;
exports.index = async (req, res, next) => {
  const fs = require('fs');
  const path = require('path');
  const dataSim = require('./data/sim.json');
  const stringSimilarity = require('string-similarity');

  if (!req.query.type) return res.json({ error: `Missing data type` });

  if (req.query.type === `ask`) {
    const ask = encodeURIComponent(req.query.ask);  // Encode the query to support emojis and other languages
    if (!ask) return res.json({ error: `Missing query to launch the program` });

    const questions = Object.keys(dataSim).map(q => decodeURIComponent(q));  // Decode stored questions for matching
    const checker = stringSimilarity.findBestMatch(decodeURIComponent(ask), questions);

    if (checker.bestMatch.rating >= 0.5) {
      var search = checker.bestMatch.target;
    }

    if (search === undefined) return res.json({ answer: `What? 🙂` });

    const answers = dataSim[encodeURIComponent(search)];  // Use the encoded version of the question
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];

    return res.json({ answer: decodeURIComponent(randomAnswer) });  // Decode the answer before sending the response
  }

  if (req.query.type === `teach`) {
    const ask = encodeURIComponent(req.query.ask);  // Encode the question
    const ans = encodeURIComponent(req.query.ans);  // Encode the answer

    if (!ask || !ans) {
      return res.json({ error: `Missing data to execute command` });
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
        ask: decodeURIComponent(ask),  // Decode the question before sending response
        ans: decodeURIComponent(ans),  // Decode the answer before sending response
      },
    });
  }
};
