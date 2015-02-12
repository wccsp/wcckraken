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
            user: function(options) {
                require(['./user/api'], _.bind(function(user) {
                    this.initController('user', user.Controller, null, options);
                }, this));
            },

            session: function(options) {
                require(['./session/api'], _.bind(function(session) {
                    this.initController('session', session.Controller, null, options);
                }, this));
            }
        }
    });

    return Entities;
});
