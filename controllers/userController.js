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
    });

    User.findOne({email: req.body.email}, (err, existingUser) => {

        if (existingUser) {
            req.flash('errors', 'Account with that email address already exits');
            return res.redirect('/signup');
        } else {
            user.save((err, user) => {
                if (err) return next(err);

                req.logIn(user, (err) => {
                    if (err) return next(err);

                    res.redirect('/profile');
                })
            });
        }
    });
    
};

exports.profile_get = (req, res, next) => {

    User.findOne({_id: req.user._id}, (err, foundUser) => {
        if (err) return next(err);
        res.render('accounts/profile', {user: foundUser});
    });
};

exports.edit_profile_get = (req, res) => {
    res.render('accounts/edit-profile', {message: req.flash('success')});
};

exports.edit_profile_post = (req, res, next) => {
    User.findOne({_id: req.user._id}, (err, user) => {

        if (err) return next(err);
        
        if (req.body.firstname) user.firstname = req.body.firstname;
        if (req.body.lastname) user.lastname = req.body.lastname;
        if (req.body.email) user.email = req.body.email;  
        if (req.body.address) user.address = req.body.address;        

        user.save((err) => {
            if (err) return next(err);
            req.flash('success', 'Successfully edited your profile');
            return res.redirect('/edit-profile');
        });
    });
};

exports.logout_get = (req, res) => {
    req.logout();
    res.redirect('/');
};