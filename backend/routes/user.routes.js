'use strict';

const router = require('express').Router();

const { signup, login, getAllUsers } = require('../controllers/userController');
const basicAuth = require('../middlewares/basicAuth');

router.post('/signup', basicAuth, signup);
router.post('/login', login);
router.get('/users', getAllUsers);

module.exports = router;