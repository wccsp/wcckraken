//  Login Stuff

'use strict';

var passport = require('passport');

module.exports = function(router) {

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
        {path: '/', method: 'get'},
        {path: '/', method: 'login', http: 'post'}
    ];

    // Bind
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i],
            http = route.http || 'get';

        router[http](route.path, controller[route.method]);
    }
};
