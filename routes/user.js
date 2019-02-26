const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

// GET request /login
router.get('/login', user_controller.login_get);

// POST request /login
router.post('/login', user_controller.login_post);

module.exports = router;