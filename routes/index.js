const express = require('express');
const router = express.Router();
const userControllers = require('../contollers/users');

router.get('/', userControllers.signIn);
router.use('/users', require('./users'));

module.exports = router;