const User = require('../models/users');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((error) => {
      res.status(500).send({ message: `ERROR SERVER! ${error}` });
    });
};

const getOneUser = (req, res) => {
  const id = req.params.userId;
  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'USER IS NOT DEFINED!' });
      } return res.status(200).send({ user });
    })
    .catch((error) => {
      // console.log(JSON.stringify(error));
      if (error.kind === 'ObjectId') {
        return res.status(400).send({ message: `NOT FOUND ID ${error}` });
      }
      return res.status(500).send({ message: `ERROR SERVER! ${error}` });
    });
};

const postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((error) => {
      // console.log(error.name)
      if (error.name === 'ValidationError') {
        return res.status(400).send({ message: `INCORRECT DATA! ${error}` });
      } return res.status(500).send({ message: `ERROR SERVER! ${error}` });
    });
};

module.exports = {
  getUsers,
  getOneUser,
  postUser,
};
