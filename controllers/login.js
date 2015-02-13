//  Login Stuff

'use strict';

var passport = require('passport'),
    routeBinder = require('../lib/routeBinder');

// Define the controller
var controller = {
    get: function(req, res) {
        res.render('login', {messages: req.flash('error')});
    },

    login: function(req, res) {
        var destination = (req.session.goingTo === '/login' || req.sess) ? '/' : req.session.goingTo;
        console.log(destination);
        passport.authenticate('local', {
            successRedirect: destination,
            failureRedirect: '/login',
            failureFlash: true
        })(req, res)
    }
};

// Define the routes
var routes = [
    {path: '/', methods: ['get']},
    {path: '/', methods: ['login'], http: 'post'}
];


module.exports = function(router) {
    routeBinder.bind(router, routes, controller);
};
