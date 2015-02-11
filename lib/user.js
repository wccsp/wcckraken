'use strict';

var User = require('../models/main/user');

module.exports = function() {
    return {
        addUsers: function() {
            var chris = new User({
                first: 'Chris',
                last: 'Ludden',
                email: 'cludden@westmoreland.com',
                password: 'abc123',
                active: true
            });

            var ben = new User({
                first: 'Ben',
                last: 'Schnelle',
                email: 'bschnelle@westmoreland.com',
                password: '123abc',
                active: true
            });

            chris.save();
            ben.save();
        },

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
