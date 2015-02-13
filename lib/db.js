'use strict';

var mongoose = require('mongoose');

module.exports = function() {
    return {
        config: function(conf) {
            var dbHost = (conf & conf.host) ? conf.host : 'localhost',
                dbUrl = 'mongodb://' + dbHost + '/' + conf.database,
                dbOptions = {
                    user: process.env.DB_USERNAME,
                    pass: process.env.DB_PWD
                };

            mongoose.connect(dbUrl, dbOptions);
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection: error:'));
            db.once('open', function callback() {
                console.log('db connection open');
            });
        }
    };
};
