/*
 *  name: router,
 *  path: /router
 *  desc: 
 */
define([
    'marionette'
], function (Marionette) {
    var Router = {};

    Router.Router = Marionette.AppRouter.extend({
        appRoutes: {
            'home': 'home',
            'ops*path': 'ops',
            'depts*path': 'depts',
            '': 'home',
            '*path': 'root'
        },

        execute: function(callback, args, name) {
            var controller = this._getController();
            controller.route.apply(name);
        }
    });

    return Router;
});