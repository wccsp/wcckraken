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
            active: false
        },
        authorized: function() {
            return this.get('active');
        },
        fetch: function(options) {
            var defer = $.Deferred(),
                xhr = $.ajax({
                    url: '/validate',
                    contentType: 'application/json',
                    dataType: 'json',
                    type: 'GET',
                    success: _.bind(function(res) {
                        this.set('active', true);
                        defer.resolve(res);
                    }, this),
                    error: _.bind(function(mod, res) {
                        this.set('active', false);
                        defer.reject(res);
                    }, this)
                });
            return defer.promise();
        }
    });

    return Models;
});