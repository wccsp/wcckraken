'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Group = function() {

    // Define schema
    var groupSchema = mongoose.Schema({
        name: {type: String, unique: true},
        desc: String,
        admins: [{type: Schema.Types.ObjectId, ref: 'User'}],
        groups: [
            {type: Schema.Types.ObjectId, ref: 'Group'}
        ]
    });

    // Check for permission
    groupSchema.methods.hasPermissionTo = function(permission) {
        var hasPermission = false;
        for (var i = 0; i < this.permissions.length; i++) {
            var p = this.permissions[i];
            if (p.name === permission && p.permit) {
                hasPermission = true;
            }
        }

        return hasPermission;
    };

    return mongoose.model('Group', groupSchema);
};

module.exports = new Group();
