const express = require('express');
const router = express.Router();

const main_controller = require('../controllers/mainController');


// GET Homepage
router.get('/', main_controller.index);

// GET courses in a particular category
router.get('/courses/:id', main_controller.courses_get);

// GET the detail of a particular course
router.get('/course/:id', main_controller.course_detail); 

module.exports = router;