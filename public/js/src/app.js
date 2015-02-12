define ([
    'require',
    'jquery',
    'backbone',
    'marionette',
    'marionette.handlebars',
    'bootstrap'
], function(require, $, Backbone, Marionette) {
    var App = new Marionette.Application();

    App.addRegions({
        headerRegion: '#headerRegion',
        contentRegion: '#contentRegion',
        footerRegion: '#footerRegion'
    });

    App.debug = true;

    //  App methods
    //  -----------------------

    // proxy navigate function
    App.navigate = function(route, options) {
        options || (options = {});
        Backbone.history.navigate(route, options);
    };

    // proxy fragment return
    App.getCurrentRoute = function() {
        return Backbone.history.fragment
    };



    //  Bind application events
    //  -----------------------

    App.on('start', function() {
        if (Backbone.history) {
            require(['./apps/main/controller', './apps/main/router'], function(Main, Router) {
                var main = new Main.Controller({debug: App.debug});
                App.router = new Router.Router({controller: main});
                Backbone.history.start();
            });
        }
    });

    return App;
});
