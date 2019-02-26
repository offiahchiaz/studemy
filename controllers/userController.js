const async = require('async');
const passport = require('passport');

const passportConf = require('../config/passport');
const User = require('../models/user');

exports.login_get = (req, res, next) => {
    if (req.user) return res.redirect('/');
    res.render('accounts/login', {message: req.flash('loginMessage')});
}