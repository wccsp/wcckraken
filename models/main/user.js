'use strict';

var mongoose = require('mongoose'),
    bcryptjs = require('bcryptjs'),
    crypt = require('../../lib/crypt');

var User = function() {

    // Define schema
    var Schema = mongoose.Schema({
        first: String,
        last: String,
        email: {type: String, unique: true},
        password: String,
        groups: [
            {type: mongoose.Schema.Types.ObjectId, ref: 'Group'}
        ],
        profile: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
        active: Boolean,
        resetPasswordToken: String,
        resetPasswordExpires: Date
    }, {
        toObject: {
            transform: function(doc, ret) {
                delete ret.password;
            }
        }
    });

    //  Event Handlers
    //  -------------------
    
    // Replace plaintext passwords with a hashed version prior to save
    Schema.pre('save', function(next) {
        var user = this;

        // prevent double hash
        if (!this.isModified('password')) {
            next();
            return;
        }

        // encrypt password using bcryptjs
        // replace plaintext password with hash
        user.password = bcryptjs.hashSync(user.password, crypt.getLevel());
        next();
    });

    
    //  Methods
    //  -------------------
    
    // Compare plaintext password against a user's hashed password
    Schema.methods.passwordMatches = function (password) {
        var user = this;
        return bcryptjs.compareSync(password, user.password);
    };

    // Check if a user has a permission
    Schema.methods.hasPermissionTo = function(permission) {
        var hasPermission = false;
        for (var i = 0; i < this.groups.length; i++) {
            if (this.groups[i].hasPermissionTo(permission)) {
                hasPermission = true;
            }
        }

        return hasPermission;
    };

    return mongoose.model('User', Schema);
};

module.exports = new User();
