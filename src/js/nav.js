define(function (require) {

  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Handlebars = require('handlebars');
  var navTemplate = require('hb!tmp/nav.hbs');
  var navData = JSON.parse(require('text!data/project.json'));

  var NavView = Backbone.View.extend({
    initialize: function () {
      this.data = navTemplate(navData);
    },
    events: {
      'click .nav-coffin__toggler': 'open',
      'click .is-open': 'close'
    },
    el: '#js-nav',
    render: function() {
      this.$el.html(this.data);
      return this;
    },
    open: function () {
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
    close: function () {
      var self = this;
      // var height = parseInt(this.$('.nav-coffin__inner').height(true), 10);
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

  var nav = new NavView;
  nav.render();

});