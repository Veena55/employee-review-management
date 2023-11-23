const express = require('express');
const router = express.Router();
const homeControllers = require('../contollers/home');

router.get('/dashboard', homeControllers.dashboard);
router.get('/enrolled-employees', homeControllers.enrolledEmployees);
router.get('/feedback-form', homeControllers.feedBackForm);
router.get('/register-feedback', homeControllers.registerForFeedback);

module.exports = router;