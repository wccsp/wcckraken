define([
    'm',
    'app',
    './entities/api'
], function (M, App, Entities) {
    var Main = {};

    Main.Controller = M.Controller.extend({
        //  Configuration
        //  ----------------------

        // channels
        channels: {
            api: {
                name: 'api'
            },
            intercom: {
                name: 'main'
            }
        },

        // initializers
        initializers: {
            api: function() {
                this.initController('api', Entities.Controller);
            }
        },



        //  Route Handlers
        //  ----------------------

        home: function() {

        },

        login: function() {

        },



        //  API
        //  ----------------------

        isAuthenticated: function() {
            return this.api.request('session:get:auth');
        }
    });

    return Main;
});
