const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const homeControllers = require('../contollers/home');
const userControllers = require('../contollers/users');
const passport = require('passport');

router.get('/register-feedback', passport.checkAuthentication, homeControllers.registerForFeedback);
router.post('/register-review-request', upload.single('avatar'), homeControllers.registerFeedbackRequest);
router.get('/sign-in', userControllers.signIn);
router.get('/sign-up', userControllers.sign_up);
router.get('/all-reviews', passport.checkAuthentication, homeControllers.allReviews);
router.post('/create', userControllers.create);
router.post('/create-session', passport.authenticate('local', {failureRedirect:'/users/sign-in',failureMessage: true }) , userControllers.createSession);
router.get('/dashboard', passport.checkAuthentication, homeControllers.dashboard);
router.get('/employee-requests', passport.checkAuthentication, homeControllers.employeeRequests);
router.get('/feedback-form', passport.checkAuthentication, homeControllers.feedBackForm);
router.get('/assign-employees/:emp', passport.checkAuthentication, homeControllers.assignEmployees);
router.get('/approve-employees/:emp', passport.checkAuthentication, homeControllers.approveRequests);
router.get('/reject-request/:emp', passport.checkAuthentication, homeControllers.rejectRequests);
router.post('/assign-employees/', homeControllers.assignEmployeesForReviews);
router.post('/savefeedback/', homeControllers.saveFeedback);
router.post('/save-review/', homeControllers.saveReview);

module.exports = router;