'use strict';

var User = require('../models/main/user'),
    LocalStrategy = require('passport-local').Strategy,
    debug = require('debug')('auth');

exports.localStrategy = function() {
    return new LocalStrategy(function(username, password, done) {
        User.findOne({email: username}, function(err, user) {

            // on error, abort
            if (err) {
                debug('DB error with query');
                return done(err);
            }

            // no user found
            if (!user) {
                debug('No user found with email: ' + username);
                return done(null, false, {message: 'Email not found'});
            }

            // incorrect password
            if (!user.passwordMatches(password)) {
                debug('Incorrect password for user: ' + username);
                return done(null, false, {message: 'Incorrect password'});
            }

            if (!user.active) {
                debug('User is inactive: ' + username);
                return done(null, false, {message: 'Account is pending approval'})
            }

            // all is well
            debug('Successfully found: ' + username);
            done(null, user);
        });
    });
};

exports.isAuthenticated = function() {
    return function(req, res, next) {
        // TODO check if requested url required auth, for now, everything will
        if (req.url === '/login') {
            req.session.goingTo = '/login';
            next();
        }

        // verify the user is logged in
        else if (!req.isAuthenticated()) {
            var url = req.url;
            req.session.goingTo = url;
            if (url !== '/') req.flash('error', 'Please log in to view this page');
            res.redirect('/login')
        }

        // TODO verify the user has permission to access the route

        // allow
        else {
            next();
        }
    }
};

exports.injectUser = function() {
    return function(req, res, next) {
        debug('Injecting user...');
        if (req.isAuthenticated()) {
            debug('Request is authenticated');
            res.locals.user = req.user.toObject();
        }
        next();
    }
};
