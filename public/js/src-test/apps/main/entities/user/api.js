define ([
    'm',
    './models'
], function(M, Models) {
    var User = {};

    User.Controller = M.Controller.extend({
        //  Configuration
        //  -----------------------

        channels: {
            api: {
                name: 'api',
                events: {
                    comply: {
                        'reset:user': 'resetUser'
                    },
                    reply: {
                        'user:get': 'get'
                    }
                }
            },
            intercom: {
                name: 'main'
            }
        },

        init: function() {
            this.initModel('user', Models.User);
        },

        get: function() {
            return this.models.get('user');
        },

        resetUser: function(userJSON) {
            var user = this.models.get('user');
            this.models.get('user').set(userJSON);
            this.intercom.trigger('reset:user', user);
        }
    });

    return User;
});
