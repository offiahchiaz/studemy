const express = require('express');
const router = express.Router();

const main_controller = require('../controllers/mainController');


// GET Homepage
router.get('/', main_controller.index);

// GET courses in a particular category
router.get('/courses/:id', main_controller.courses_get);

module.exports = router;