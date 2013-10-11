define(function (require) {

  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Handlebars = require('handlebars');
  var NavModel = require('src/NavModel');
  var NavTemplate = require('hb!tmp/nav.hbs');

  var NavView = Backbone.View.extend({
    initialize: function () {
      this.render();
    },
    model: new NavModel,
    events: {
      'click .is-closed': 'open',
      'click .is-open': 'close'
    },
    el: '#js-nav',
    render: function() {
      this.$el.html(NavTemplate(this.model.attributes));
      this.$('.js-coffin-toggle').addClass('is-closed');
      return this;
    },
    isAnimating: false,
    open: function () {
      var self = this;
      var height = parseInt((this.$('.nav-coffin__inner').outerHeight(true) + $('.main--hat').outerHeight(true)), 10);
      if (!this.isAnimating) {
        $('.main--hat').animate({
          height: '' + (height) + 'px'
        }, {
          duration: 'fast',
          step: function () {
            self.isAnimating = true;
          },
          complete: function () {
            self.$('.nav-coffin__toggler').addClass('is-open');
            self.$('.nav-coffin__toggler').removeClass('is-closed');
            self.isAnimating = false;
          }
        });
      }
    },
    close: function () {
      var self = this;
      if (!self.isAnimating) {
        $('.main--hat').animate({
          height: '40px'
        }, {
          duration: 'fast',
          step: function () {
            self.isAnimating = true;
          },
          complete: function () {
            self.$('.nav-coffin__toggler').removeClass('is-open');
            self.$('.nav-coffin__toggler').addClass('is-closed');
            self.isAnimating = false;
          }
        });
      }
    }
  });

  // var nav = new NavView;
  // nav.render();

  return NavView;

});