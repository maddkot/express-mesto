const Card = require('../models/cards');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ cards });
    })
    .catch((error) => {
      res.status(500).send({ message: `ERROR SERVER! ${error}` });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const id = req.user._id;
  Card.create({ name, link, owner: id })
    .then((card) => {
      res.status(200).send({ card });
    })
    .catch((error) => {
      console.log(error);
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: `VALIDATION DATA FAIL! ${error}` });
      }
      res.status(500).send({ message: 'ERROR SERVER!' });
    });
};

const deleteCard = (req, res) => {
  const id = req.params.cardId;
  Card.findByIdAndRemove(id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'CARD IS NOT FOUND!' });
      }
      res.status(200).send({ card });
    })
    .catch((error) => {
      console.log(error.name);
      if (error.name === 'CastError') {
        return res.status(400).send({ message: `INCORRECT DATA! ${error}` });
      }
      return res.status(500).send({ message: 'ERROR SERVER!' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
