const router = require('express').Router();

const { getUsers, getOneUser, postUser } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getOneUser);
router.post('/', postUser);

module.exports = router;
