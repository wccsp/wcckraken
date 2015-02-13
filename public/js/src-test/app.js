define([
    'require',
    'jquery',
    'backbone',
    'marionette',
    'marionette.handlebars',
    'bootstrap'
], function (require, $, Backbone, Marionette) {
    var App = new Marionette.Application();

    App.addRegions({
        modalRegion: '#modalRegion',
        headerRegion: '#headerRegion',
        contentRegion: '#contentRegion',
        footerRegion: '#footerRegion'
    });

    // Set app environment
    App.debug = true;

    // proxy navigate function
    App.navigate = function(route, options) {
        options || (options = {});
        Backbone.history.navigate(route, options);
    };

    // proxy fragment return
    App.getCurrentRoute = function() {
        return Backbone.history.fragment
    };

    // bind to application start event
    App.on('start', function() {
        if (Backbone.history) {
            require(['main'], function(Main) {
                var main = new Main.Controller({debug: App.debug});
            });
        }
    });

    return App;
});
