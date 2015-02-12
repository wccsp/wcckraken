'use strict';

var mongoose = require('mongoose');

module.exports = function() {
    return {
        config: function(conf) {
            console.log(process.env.DB_USERNAME);
            console.log(process.env.DB_PWD);
            var dbUrl = 'mongodb://' + conf.host + '/' + conf.database,
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
