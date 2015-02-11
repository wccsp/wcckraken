/*
 *  name: views,
 *  path: /views
 *  desc: 
 */
define([
    'backbone',
    'marionette',
    'hbs!./templates/form.hbs'
], function (Backbone, Marionette, FormTpl) {
    var Views = {};

    Views.FormView = Marionette.ItemView.extend({
        initialize: function() {
            this.model = new Backbone.Model({
                username: null,
                password: null
            });
        },

        template: FormTpl,
        className: 'col-sm-12',

        ui: {
            login: 'button.js-login',
            request: 'a.js-new-account'
        },

        triggers: {
            'click @ui.login': 'login',
            'click @ui.request': 'request:new:account'
        }
    });

    return Views;
});