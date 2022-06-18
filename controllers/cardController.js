const axios = require("axios");

exports.search = (req, res) => {
  const name = req.query.name || "";
  const query = encodeURIComponent(name);
  const direction = req.query.dir || "asc";
  axios.get(`https://api.scryfall.com/cards/search?q=${query}&dir=${direction}`).then(data => {
    //Card(s) have been found
    let cards = data.data;
    res.status(200).json(cards);
  }).catch(err => {
    //Card wasn't found, or query string had an issue
    res.status(404).json({"errmsg": "Card name not found!"});
  });
};
