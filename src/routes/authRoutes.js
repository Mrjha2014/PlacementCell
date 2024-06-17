const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

// Login Page
router.get('/login', authController.getLoginPage);

// Login Action
router.post('/login', passport.authenticate('local', {
    successRedirect: '/jobs',
    failureRedirect: '/login',
    failureFlash: true
}));

// Register Page
router.get('/register', authController.getRegisterPage);

// Register Action
router.post('/register', authController.register);

// Logout
router.get('/logout', authController.logout);

module.exports = router;
