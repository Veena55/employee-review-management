const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const homeControllers = require('../contollers/home');
const userControllers = require('../contollers/users');
const passport = require('passport');

router.get('/register-feedback', homeControllers.registerForFeedback);
router.post('/register-review-request', upload.single('avatar'), homeControllers.registerFeedbackRequest);
router.get('/sign-in', userControllers.signIn);
router.get('/sign-up', userControllers.sign_up);
router.post('/create', userControllers.create);
router.post('/create-session', passport.authenticate('local', {failureRedirect:'/users/sign-in',failureMessage: true }) , userControllers.createSession);
router.get('/dashboard', homeControllers.dashboard);
router.get('/enrolled-employees', homeControllers.enrolledEmployees);
router.get('/feedback-form', homeControllers.feedBackForm);
router.get('/assign-employees/:emp', homeControllers.assignEmployees);
router.post('/assign-employees/', homeControllers.assignEmployeesForReviews);

module.exports = router;