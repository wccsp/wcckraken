require.config({
    baseUrl: './js/src',

    packages: [
        {
            name: 'main',
            location: 'apps/main',
            main: 'app'
        }
    ],

    paths: {
        // Backbone
        'backbone': 'libs/backbone/backbone-min',
        'backbone.min.map': 'libs/backbone/backbone-min.map',
        'backbone.radio': 'libs/backbone/plugins/radio/backbone.radio.min',
        'backbone.radio.shim': 'libs/backbone/plugins/radio/shim/backbone.radio.shim',

        // Bootstrap
        'bootstrap': 'libs/bootstrap/bootstrap.min.js',

        // Dust
        'dustjs': 'libs/dust/dust-full-0.3.0',
        'dustc': 'libs/dust/plugins/dustjs-require/dustjs-require',
        'dustMarionette': 'libs/dust/plugins/marionette-dust/backbone.marionette.dust',

        // Jquery
        'jquery': 'libs/jquery/jquery-1.11.2.min',

        // Marionette
        'marionette': 'libs/marionette/backbone.marionette',
        'marionette.subrouter': 'libs/marionette/plugins/subrouter/backbone.marionette.subrouter',
        'marionette.handlebars': 'libs/marionette/plugins/handlebars/marionette.handlebars',
        'm': 'libs/marionette/plugins/m/backbone.marionette.m',

        // Other
        'async': 'libs/async/async',
        'hbs': 'libs/require-handlebars-plugin/hbs',
        'require': 'require/require',
        'underscore': 'libs/underscore/underscore'
    },

    hbs: {
        templateExtension: false
    },

    shim: {
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'jquery': {
            exports: '$'
        },
        'marionette': {
            deps: ['backbone']
        },
        'underscore': {
            exports: '_'
        }
    },

    map: {
        '*': {
            'backbone.marionette': 'marionette',
            'dust': 'dustjs',
            'handlebars': 'libs/require-handlebars-plugin/hbs/handlebars',
            'hbs/handlebars': 'libs/require-handlebars-plugin/hbs/handlebars'
        }
    }
});

define(['app'], function(app) {
    $(document).ready(function() {
        app.start();
    });
});
