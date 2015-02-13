'use strict';

var routeBinder = require('../lib/routeBinder');

var controller = {
    get: function(req, res) {
        res.render('index');
    },

    validate: function(req, res) {
        if (req.isAuthenticated()) {
            res.send({user: req.user.toObject()});
        } else {
            res.status(403).send();
        }
    }
};

var routes = [
    {path: '/', methods: ['get']},
    {path: '/validate', methods: ['validate']}
];

module.exports = function (router) {
    routeBinder.bind(router, routes, controller);
};
