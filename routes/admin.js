const express = require('express');
const router = express.Router();

const admin_controller = require('../controllers/adminController');

// GET request /add-category
router.get('/add-category', admin_controller.add_category_get);

// POST request /add-category
router.post('/add-category', admin_controller.add_category_post);

module.exports = router;