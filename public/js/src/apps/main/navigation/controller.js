/*
 *  name: controller,
 *  path: /controller
 *  desc:
 */
define([
    'm',
    'app',
    './views'
], function (M, App, Views) {
    var Navigation = {};

    Navigation.Controller = M.Controller.extend({
        //  Configuration
        //  --------------------------

        channels: {
            api: {
                name: 'api'
            },
            intercom: {
                name: 'main',
                events: {
                    on: {
                        'reset:user': 'updateGreeting'
                    }
                }
            }
        },

        //  View Handlers
        //  ---------------------------

        onShowNavigation: function() {
            var xhr = this.api.request('user:get');
            $.when(xhr).done(_.bind(function(user) {
                this.views.add({
                    name: 'menu',
                    view: new Views.MenuView(),
                    events: {
                        'navigate': 'navigate'
                    }
                });
                App.headerRegion.show(this.views.get('menu'));
            }, this));
        },

        //  Event Hand
        navigate: function(to) {
            console.log('navigate: ' + to);
            //App.navigate(to, {trigger: true});
        },

        //  Update user greeting
        updateGreeting: function(user) {
            var greeting = user.displayName();
            this.views.get('menu').triggerMethod('set:greeting', greeting);
        }
    });

    return Navigation;
});
