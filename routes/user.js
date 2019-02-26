const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

// GET request /login
router.get('/login', user_controller.login_get);

// POST request /login
router.post('/login', user_controller.login_post);

// GET request /signup
router.get('/signup', user_controller.signup_get);

module.exports = router;