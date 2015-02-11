/*
 *  name: controller,
 *  path: /controller
 *  desc: 
 */
define([
    'm'
], function (M) {
    var Home = {};

    Home.Controller = M.Controller.extend({
        //  Configuration

        channels: {
            api: {
                name: 'api'
            },
            intercom: {
                name: 'main'
            }
        },


        //  Routes

        home: function() {

        }
    });

    return Home;
});