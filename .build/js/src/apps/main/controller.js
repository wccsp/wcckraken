define ([
    'require',
    'm',
    './entities/api',
    './navigation/controller'
], function(require, M, Entities, Navigation) {
    var Main = {};
    
    Main.Controller = M.Controller.extend({
        //  Channels
        channels: {
            api: {
                name: 'api'
            },
            intercom: {
                name: 'main',
                events: {
                    comply: {
                        'start:app': 'startApp'
                    }
                }
            }
        },


        //  Initializers
        initializers: {
            // Configure app-wide api's
            api: function(options) {
                this.initController('api', Entities.Controller, null, options);
            },

            // Initialize navigation
            navigation: function(options) {
                var navigation = new Navigation.Controller(options);
                this.controllers.add({
                    name: 'navigation',
                    controller: navigation
                });
                navigation.triggerMethod('show:navigation');
            }
        },

        //  Routes

        depts: function() {

        },

        home: function() {
            if (this.api.request('session:is:authorized')) {
                var method = 'home';
                require(['./home/controller'], _.bind(function(Home) {
                    this.startApp(Home.Controller);
                    this.triggerAppMethod(method);
                }, this));
            } else {

            }
        },

        ops: function() {

        },

        root: function() {

        },


        //  Helpers

        startApp: function(constructor, containerOptions, controllerOptions) {
            containerOptions || (containerOptions = {});
            controllerOptions || (controllerOptions = {});
            this.initController('app', constructor, containerOptions, controllerOptions)
        },

        triggerAppMethod: function(method) {
            this.controllers.get('app').triggerMethod(method);
        }
    });
    
    return Main;
});