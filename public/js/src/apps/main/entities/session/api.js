/*
 *  name: api,
 *  path: /api
 *  desc: 
 */
define([
    'm',
    './models'
], function (M, Models) {
    var Auth = {};

    Auth.Controller = M.Controller.extend({
        //  Configuration

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
            var session = new Models.Session();
            session.fetch();
            this.models.add({
                name: 'session',
                model: session,
                events: {
                    'change:active': 'notify'
                }
            });
        },

        //  API Methods

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