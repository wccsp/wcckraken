'use strict';

var mongoose = require('mongoose'),
    bcryptjs = require('bcryptjs'),
    crypt = require('../../lib/crypt'),
    Schema = mongoose.Schema;

var User = function() {

    // Define schema
    var userSchema = Schema({
        first: String,
        last: String,
        email: {type: String, unique: true},
        password: String,
        groups: [
            {type: Schema.Types.ObjectId, ref: 'Group'}
        ],
        profile: {type: Schema.Types.ObjectId, ref: 'Profile'},
        active: Boolean,
        activateToken: String,
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
    userSchema.pre('save', function(next) {
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
    userSchema.methods.passwordMatches = function (password) {
        var user = this;
        return bcryptjs.compareSync(password, user.password);
    };

    // Check if a user has a permission
    userSchema.methods.hasPermissionTo = function(permission) {
        var hasPermission = false;
        for (var i = 0; i < this.groups.length; i++) {
            if (this.groups[i].hasPermissionTo(permission)) {
                hasPermission = true;
            }
        }

        return hasPermission;
    };

    return mongoose.model('User', userSchema);
};

module.exports = new User();
