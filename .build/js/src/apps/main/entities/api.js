/*
 *  name: api,
 *  path: /api
 *  desc: 
 */
define([
    'require',
    'm'
], function (require, M) {
    var Entities = {};

    Entities.Controller = M.Controller.extend({
        initializers: {
            auth: function(options) {
                require(['./session/api'], _.bind(function(auth) {
                    this.initController('session', auth.Controller);
                }, this))
            }
        }
    });

    return Entities;
});