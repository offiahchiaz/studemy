const express = require('express');
const router = express.Router();

const main_controller = require('../controllers/mainController');


// GET Homepage
router.get('/', main_controller.index);

module.exports = router;