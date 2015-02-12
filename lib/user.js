'use strict';

var User = require('../models/main/user');

module.exports = function() {
    return {
        serialize: function(user, done) {
            done(null, user.id);
        },

        deserialize: function(id, done) {
            User.findOne({_id: id}, function(err, user) {
                done(null, user);
            });
        }
    }
};
