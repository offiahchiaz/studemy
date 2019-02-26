const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

// GET request /login
router.get('/login', user_controller.login_get);

module.exports = router;