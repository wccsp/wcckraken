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
    var Login = {};

    Login.Controller = M.Controller.extend({
        //  Configuration

        channels: {
            api: {
                name: 'api'
            },
            intercom: {
                name: 'main'
            }
        },


        onShowForm: function() {
            var form = new Views.FormView();
            App.contentRegion.show(form);
        }
    });

    return Login;
});