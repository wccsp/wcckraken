/*
 *  name: controller,
 *  path: /controller
 *  desc:
 */
define([
    'leaflet',
    'm'
], function (L, M) {
    var Home = {};

    Home.Controller = M.Controller.extend({
        //  Configuration
        //  ----------------------------

        channels: {
            api: {
                name: 'api'
            },
            intercom: {
                name: 'main'
            }
        },


        //  Routes
        //  ----------------------------

        showMap: function() {

        }
    });

    return Home;
});
