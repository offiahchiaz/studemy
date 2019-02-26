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