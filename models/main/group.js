'use strict';

var mongoose = require('mongoose');

var Group = function() {

    // Define schema
    var Schema = mongoose.Schema({
        name: {type: String, unique: true},
        desc: String,
        permissions: [
            {type: Schema.Types.ObjectId, ref: 'Permission'}
        ]
    });

    // Check for permission
    Schema.methods.hasPermissionTo = function(permission) {
        var hasPermission = false;
        for (var i = 0; i < this.permissions.length; i++) {
            var p = this.permissions[i];
            if (p.name === permission && p.permit) {
                hasPermission = true;
            }
        }

        return hasPermission;
    }
};
