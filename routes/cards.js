const router = require('express').Router();

const fsPromises = require('fs').promises;
const path = require('path');

router.get('/', (req, res) => {
  fsPromises.readFile(path.join(__dirname, '../data/cards.json'))
    .then((data) => res.send(JSON.parse(data)))
    .catch((err) => {
      res.status(500).send({ message: `Error: ${err}` });
    });
});

module.exports = router;
