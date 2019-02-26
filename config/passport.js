const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const secret = require('../config/secret');
const User = require('../models/user');

// Serialize and deserialize
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Middleware
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email,password, done) => {
    User.findOne({email}, (err, user) => {
        if (err) return done(err);

        if (!user) {
            return done(null, false, req.flash('loginMessage', 'User not found'));
        }

        if (!user.comparePassword(password)) {
            return done(null, false, req.flash('loginMessage', 'Password is incorrect'));
        }

        return done(null, user);
    });
}));

// Custom function to validate user
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
};