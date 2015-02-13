'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Profile = function() {
    
    // Schema
    var profileSchema = Schema({
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        operation: String,
        department: String,
        segment: String
    });
    
    return mongoose.model('Profile', profileSchema);
};

module.exports = new Profile();