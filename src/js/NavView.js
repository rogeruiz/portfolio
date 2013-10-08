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
      'click .nav-coffin__toggler': 'open',
      'click .is-open': 'close'
    },
    el: '#js-nav',
    render: function() {
      this.$el.html(NavTemplate(this.model.attributes));
      return this;
    },
    open: function (evt) {
      var self = this;
      var height = parseInt(this.$('.nav-coffin__inner').outerHeight(true), 10);
      $('.main--hat').animate({
        height: '' + (height + 20) + 'px'
      }, {
        duration: 'fast',
        complete: function () {
          self.$('.nav-coffin__toggler').addClass('is-open');
        }
      });
    },
    close: function (evt) {
      var self = this;
      $('.main--hat').animate({
        height: '' + 40 + 'px'
      }, {
        duration: 'fast',
        complete: function () {
          self.$('.nav-coffin__toggler').removeClass('is-open');
        }
      });
    }
  });

  // var nav = new NavView;
  // nav.render();

  return NavView;

});