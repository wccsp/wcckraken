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
            'home': 'a[data-tab="home"]',
            'root': 'a[data-tab="root"]',
            'ops': 'a[data-tab="ops"]',
            'depts': 'a[data-tab="depts"]',
            'tabs': 'a[data-tab!="home"]'
        },

        triggers: {
            'click @ui.home': 'home'
        },

        events: {
            'click @ui.tabs': 'select'
        },

        select: function(e) {
            this.trigger('select', $(e.target).attr('data-tab'));
        }
    });

    return Views;
});