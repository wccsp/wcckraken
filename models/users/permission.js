'use strict';

var mongoose = require('mongoose');

var Permission = function() {

    // Define Schema
    var Schema = mongoose.Schema({
        name: {type: String, unique: true},
        permit: Boolean
    });

    return mongoose.model('Permission', Schema);
};

module.exports = new Permission();
