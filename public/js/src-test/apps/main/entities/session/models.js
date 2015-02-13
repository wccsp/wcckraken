/*
 *  name: models,
 *  path: /models
 *  desc:
 */
define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    var Models = {};

    Models.Session = Backbone.Model.extend({
        defaults: {
            authenticated: false
        },

        isAuthenticated: function() {
            return this.get('authenticated');
        },

        checkAuth: function(options) {
            var defer = $.Deferred(),
                xhr = $.ajax({
                    url: '/authenticate',
                    contentType: 'application/json',
                    dataType: 'json',
                    type: 'GET',
                    success: _.bind(function(res) {
                        this.set('authenticated', true);
                        var user = this.parse(res);
                        defer.resolve(user);
                    }, this),
                    error: _.bind(function(mod, res) {
                        this.set('authenticated', false);
                        defer.reject(res);
                    }, this)
                });
            return defer.promise();
        },

        parse: function(res) {
            return res && res.user;
        }
    });

    return Models;
});
