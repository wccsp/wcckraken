define ([
    'backbone'
], function(Backbone) {
    var Models = {};

    Models.User = Backbone.Model.extend({
        displayName: function() {
            return this.get('first') + ' ' + this.get('last');
        }
    });

    return Models;
});