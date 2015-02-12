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
        }
    });

    return Router;
});