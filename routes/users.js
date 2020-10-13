const router = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

router.get('/users', (req, res) => {
  fsPromises.readFile(path.join(__dirname, '../data/users.json'))
    .then((data) => res.send(JSON.parse(data)));
});

router.get('/users/:_id', (req, res) => {
  const { _id } = req.params;
  fsPromises.readFile(path.join(__dirname, '../data/users.json'))
    .then((data) => JSON.parse(data))
    .then((data) => {
      const userId = data.find((user) => user._id === _id);
      return userId;
    })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: `Error: ${err}` });
    });
});

module.exports = router;
