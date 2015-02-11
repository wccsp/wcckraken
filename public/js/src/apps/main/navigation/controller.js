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
        channels: {
            api: {
                name: 'api'
            },
            intercom: {
                name: 'main'
            }
        },

        onShowNavigation: function() {
            if (this.api.request('session:is:authorized')) {
                var events = {
                    events: {
                        'home': 'home'
                    }
                };
                this.initView('menu', Views.MenuView, events);
                App.headerRegion.show(this.views.get('menu'));
            } else {
                App.headerRegion.empty();
            }
        },

        home: function() {
            App.navigate('home', {trigger: true});
        }
    });

    return Navigation;
});