const async = require('async');
const passport = require('passport');

const passportConf = require('../config/passport');
const User = require('../models/user');

exports.login_get = (req, res, next) => {
    if (req.user) return res.redirect('/');
    res.render('accounts/login', {message: req.flash('loginMessage')});
};

exports.login_post = (passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureMessage: '/login',
    failureFlash: true
})); 

exports.signup_get = (req, res, next) => {
    res.render('accounts/signup', {errors: req.flash('errors')});
};

exports.signup_post = (req, res, next) => {

    let user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    })

    User.findOne({email: req.body.email}, (err, existingUser) => {

        if (existingUser) {
            req.flash('errors', 'Account with that email address already exits');
            return res.redirect('/signup');
        } else {
            user.save((err, user) => {
                if (err) return next(err);
                res.redirect('/profile');
            });
        }
    });
    
};

exports.profile_get = (req, res, next) => {
    User
        .findOne({_id: req.user._id})
        .populate(history.item)
        .exec((err, foundUser) => {
            if (err) return next(err);

            res.render('accounts/profile', {user: foundUser});
        });
};

exports.logout_get = (req, res) => {
    res.logout();
    res.redirect('/');
};