/*
 *  name: views,
 *  path: /views
 *  desc:
 */
define([
    'jquery',
    'marionette',
    'hbs!./templates/menu.hbs'
], function ($, Marionette, MenuTpl) {
    var Views = {};

    Views.MenuView = Marionette.LayoutView.extend({
        template: MenuTpl,
        className: 'col-sm-12',
        attributes: {
            'id': 'menu-root'
        },

        regions: {
            subMenuRegion: '#sub-menu'
        },

        ui: {
            'greeting': '#greeting',
            'tab': '.js-main-menu a'
        },

        triggers: {
            'click @ui.home': 'home'
        },

        events: {
            'click @ui.tab': 'select'
        },

        select: function(e) {
            e.preventDefault();
            this.trigger('navigate', $(e.target).attr('data-tab'));
        },

        onSetGreeting: function(greeting) {
            this.ui.greeting.text(greeting);
        }
    });

    return Views;
});
