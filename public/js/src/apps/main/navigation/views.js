/*
 *  name: views,
 *  path: /views
 *  desc:
 */
define([
    'jquery',
    'underscore',
    'marionette',
    'hbs!./templates/menu.hbs'
], function ($, _, Marionette, MenuTpl) {
    var Views = {};

    Views.MenuView = Marionette.LayoutView.extend({
        //  Configuration
        //  -----------------

        template: MenuTpl,
        className: 'col-sm-12',
        attributes: {
            'id': 'menu-root'
        },

        regions: {
            subMenuRegion: '#sub-menu'
        },

        templateHelpers: {
            isAdmin: function() {
                if (!this.user) return false;
                return !!(_.indexOf(this.user.get('roles'), 'admin'));
            }
        },



        //  UI & Events
        //  --------------------

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



        //  Event Handlers
        //  -------------------

        select: function(e) {
            e.preventDefault();
            this.trigger('navigate', $(e.target).attr('data-tab'));
        },

        onSetGreeting: function(greeting) {
            this.ui.greeting.text(greeting);
        },

        onFixed: function(bool) {
            if (bool) {
                this.$el.addClass('fixed')
            }
        }
    });

    return Views;
});
