define(function (require) {

  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Handlebars = require('handlebars');
  var NavModel = require('src/NavModel');
  var NavTemplate = require('hb!tmp/nav.hbs');

  var NavView = Backbone.View.extend({
    initialize: function (options) {
      _.bindAll(this, "toggleBack");
      _.bindAll(this, "highlightNav");
      options.vent.bind("toggleBack", this.toggleBack);
      options.vent.bind("highlightNav", this.highlightNav);
      this.render();
    },
    model: new NavModel(),
    events: {
      'click .is-closed': 'open',
      'click .is-open': 'close',
      'click nav > a': 'close'
    },
    el: '#js-nav',
    render: function() {
      this.$el.html(NavTemplate(this.model.attributes));
      this.$('.js-coffin-toggle').addClass('is-closed');
      return this;
    },
    notHome: false,
    isAnimating: false,
    open: function () {
      var self = this;
      var height = parseInt((this.$('.nav-coffin__inner').outerHeight(true) + $('.main--hat').outerHeight(true)), 10);
      if (!this.isAnimating) {
        $('.main--hat').animate({
          height: '' + (height) + 'px'
        }, {
          duration: 'fast',
          step: function (now, fx) {
            if (fx.pos === 0) {
              self.isAnimating = true;
              self.$el.addClass('is-open');
              self.$el.removeClass('is-closed');
              self.$('.nav-coffin__toggler').addClass('is-open');
              self.$('.nav-coffin__toggler').removeClass('is-closed');
            }
          },
          complete: function () {
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
          step: function (now, fx) {
            if (fx.pos === 0) {
              self.isAnimating = true;
              self.$el.removeClass('is-open');
              self.$el.addClass('is-closed');
              self.$('.nav-coffin__toggler').removeClass('is-open');
              self.$('.nav-coffin__toggler').addClass('is-closed');
            }
          },
          complete: function () {
            
            self.isAnimating = false;
          }
        });
      }
    },
    toggleBack: function () {
      if (location.pathname !== '/') {
        this.$('.js-back-button').addClass('is-needed');
      } else {
        this.$('.js-back-button').removeClass('is-needed');
      }
    },
    highlightNav: function (options) {
      this.$('a').removeClass('is-active');
      this.$('a[href="' + options.url + '"]').addClass('is-active');
    }
  });

  var FooterView = Backbone.View.extend({
    model: new NavModel(),
    events: {
      'click .js-back-to-top': 'toTop'
    },
    toTop: function () {
      $(window).scrollTo(0);
    }
  });

  return {
    header: NavView,
    footer: FooterView
  };

});