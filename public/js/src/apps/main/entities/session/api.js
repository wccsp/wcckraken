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
                        'session:is:authorized': 'isAuthorized'
                    }
                }
            }
        },

        init: function() {
            var session = new Models.Session(),
                xhr = session.fetch(),
                succ = _.bind(function(user) {
                    this.api.command('reset:user', user);
                }, this),
                err = function() {window.location = '/login'};

            this.models.add({
                name: 'session',
                model: session,
                events: {
                    'change:active': 'notify'
                }
            });

            $.when(xhr).then(succ, err);
        },

        //  API Methods
        //  -----------------------

        isAuthorized: function() {
            var session = this.models.get('session');
            return !!session.get('active');
        },

        notify: function(session) {
            if (session.get('active')) {
                this.api.trigger('session:activated')
            } else {
                this.api.trigger('session:deactivated')
            }
        }
    });

    return Auth;
});
