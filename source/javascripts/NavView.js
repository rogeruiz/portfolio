define(function (require) {

  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Handlebars = require('handlebars');
  var NavModel = require('source/NavModel');
  var NavTemplate = require('rjs-handlebars!templates/nav.hbs');

  var NavView = Backbone.View.extend({
    initialize: function (options) {
      this.vent = options.vent;
      _.bindAll(this, 'toggleBack');
      _.bindAll(this, 'highlightNav');
      _.bindAll(this, 'closeNav');
      this.vent.bind('toggleBack', this.toggleBack);
      this.vent.bind('highlightNav', this.highlightNav);
      this.vent.bind('closeNav', this.closeNav);
      this.render();
    },
    model: new NavModel(),
    events: {
      'touchstart .is-closed': 'openNav',
      'touchstart .is-open': 'closeNav',
      'click .is-closed': 'openNav',
      'click .is-open': 'closeNav'
    },
    el: '#js-nav',
    render: function() {
      this.$el.html(NavTemplate(this.model.attributes));
      this.$('.js-coffin-toggle').addClass('is-closed');
      return this;
    },
    notHome: false,
    isAnimating: false,
    openNav: function (evt) {
      if (evt && evt.originalEvent.type === 'touchstart') {
        evt.preventDefault();
      }
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
    closeNav: function (evt) {
      if (evt && evt.originalEvent.type === 'touchstart') {
        evt.preventDefault();
      }
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
        this.vent.trigger('toTop');
      }
    },
    toggleBack: function (evt) {
      if (location.pathname !== '/') {
        this.$('.js-back-button').addClass('is-needed');
      } else {
        this.$('.js-back-button').removeClass('is-needed');
        this.closeNav();
      }

    },
    highlightNav: function (options) {
      this.$('a').removeClass('is-active');
      this.$('a[href="' + options.url + '"]').addClass('is-active');
    }
  });

  var FooterView = Backbone.View.extend({
    initialize: function (options) {
      this.vent = options.vent;
      _.bindAll(this, 'toTop');
      this.vent.bind('toTop', this.toTop);
    },
    el: '#js-footer',
    model: new NavModel(),
    events: {
      'touchstart #js-back-to-top': 'toTop',
      'click #js-back-to-top': 'toTop'
    },
    toTop: function () {
      if ($(window).scrollTop() !== 0) {
        $('html, body').animate({
          scrollTop: '0'
        }, 250);
      }
      return false;
    }
  });

  return {
    header: NavView,
    footer: FooterView
  };

});