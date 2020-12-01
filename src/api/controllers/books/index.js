const {client} = require('../../../db');
const axios = require('axios');

const searchBooks = async (req, res) => {
  const {size} = req.query;
  if (size) {
    if (size > 20) return res.send({error: "Max Size = 20"})
    const {data: {results}} = await axios.get(process.env.BOOKS_API_URL + "?list=hardcover-fiction&api-key=" + process.env.API_KEY);
    results.forEach((single, i) => {
      if (i <= size) {
        client.index({
          index: 'books',
          body: single
        }, (err, data, status) => {
          if (err) console.error(err)
          console.log(data)
        })
      }
    })
    client.search({index: 'books', body: {size}}, (err, data, status) => {
      if (err) {
        console.error(err)
        return res.sendStatus(400)
      }
      return res.json(data.hits.hits)
    })
  } else {
    res.status(400).send({error: 'Size Parameter is Required'})
  }
};

module.exports = {searchBooks}
