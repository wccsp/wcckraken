'use strict';

var crypt = function() {
    var level = -1;

    this.getLevel = function() {
        return level;
    };

    this.setLevel = function(l) {
        if (level === -1) {
            level = l;
        }
    };
};

module.exports = new crypt();
