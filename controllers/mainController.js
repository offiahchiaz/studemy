const Course = require('../models/course');

// Home page
exports.index = (req, res, next) => {
    res.render('main/home');
}

exports.courses_get = (req, res, next) => {
    Course
        .find({category: req.params.id})
        .populate('category')
        .exec((err, courses) => {
            if (err) return next(err);
            res.render('main/category', {courses});
        });
};

exports.course_detail = (req, res, next) => {
    Course.findById({_id: req.params.id}, (err, course) => {
        if (err) return next(err);
        res.render('main/course', {course});
    });
};
