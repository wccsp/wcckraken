'use strict';

var express = require('express'),
    passport = require('passport'),
    auth = require('./auth'),
    userLib = require('./user')(),
    db = require('./db')(),
    crypt = require('./crypt');

module.exports = function (app) {
    // Configure passport after session middleware is configured
    app.on('middleware:after:session', function(args) {
        passport.use(auth.localStrategy());
        passport.serializeUser(userLib.serialize);
        passport.deserializeUser(userLib.deserialize);
        app.use(passport.initialize());
        app.use(passport.session());
    });

    return {
        onconfig: function(config, next) {
            var dbConfig = config.get('databaseConfig'),
                cryptConfig = config.get('bcryptjs');

            crypt.setLevel(cryptConfig.difficulty);
            db.config(dbConfig);
            userLib.addUsers();
            next(null, config);
        }
    }
};
