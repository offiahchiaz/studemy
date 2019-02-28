const express = require('express');
const router = express.Router();
const async = require('async');
const faker = require('faker');

const Category = require('../models/category');
const Course = require('../models/course');

router.get('/:name', (req, res, next) => {

    async.waterfall([
        (callback) => {
            Category.findOne({name: req.params.name}, (err, category) => {
                if (err) return next(err);
                callback(null, category);
            });
        },

        (category) => {
            for(let i = 0; i < 10; i++) {
                let course = new Course();
                course.category = category._id;
                course.name = faker.commerce.productName();
                course.price = faker.commerce.price();
                course.image = faker.image.image();

                course.save();
            }
        }
    ]);
    res.json({message: 'Success'});
});


module.exports = router;