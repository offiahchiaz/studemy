const Category = require('../models/category');

exports.add_category_get = (req, res) => {
    res.render('admin/add-category', {message: req.flash('success')});
};

exports.add_category_post = (req, res, next) => {
    const category = new Category();
    category.name = req.body.name;

    category.save((err) => {
        if (err) return next(err);
        req.flash('success', 'Successfully added a category');
        return res.redirect('/add-category');
    });
}

