/*
 *  name: api,
 *  path: /api
 *  desc:
 */
define([
    'jquery',
    'm',
    './models'
], function ($, M, Models) {
    var Auth = {};

    Auth.Controller = M.Controller.extend({
        //  Configuration
        //  -----------------------

        channels: {
            api: {
                name: 'api',
                events: {
                    reply: {
                        'session:get:auth': 'isAuthenticated'
                    }
                }
            }
        },

        init: function() {
            var session = new Models.Session(),
                checkAuth = session.checkAuth(),
                succ = _.bind(function(user) {
                    this.api.command('reset:user', user);
                }, this),
                err = function() {window.location = '/login'};

            this.models.add({
                name: 'session',
                model: session,
                events: {
                    'change:authenticated': 'notify'
                }
            });

            checkAuth.done(_.bind(function(user) {
                this.api.command('reset:user', user)
            }, this));
        },



        //  API Methods
        //  -----------------------

        isAuthenticated: function() {
            var session = this.models.get('session');
            return !!session.get('active');
        },

        notify: function(session) {
            if (session.isAuthenticated()) {
                this.api.trigger('session:authenticated')
            } else {
                this.api.trigger('session:invalidated')
            }
        }
    });

    return Auth;
});
