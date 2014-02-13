define(function (require) {

  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Handlebars = require('handlebars');
  var HeroModel = require('source/HeroModel');
  var HeroTemplate = require('rjs-handlebars!templates/hero.hbs');

  var HeroView = Backbone.View.extend({
    initialize: function (options) {
      this.vent = options.vent;
    },
    model: new HeroModel(),
    events: {
      'mouseenter': 'stopUpdate',
      'mouseleave': 'startUpdate',
      'touchstart .js-hero-change': 'update',
      'click .js-hero-change': 'update'
    },
    speed: 5000,
    ifMedium: function () {
      return Modernizr.mq('(min-width: 900px)');
    },
    index: 0,
    el: '#js-hero',
    render: function () {
      this.$el.html(HeroTemplate(this.model.attributes));
      if (Modernizr.mq('(min-width: 900px)')) {
        this.speed = 2500;
      }

      this.startUpdate();

      return this;
    },
    close: function () {
      this.stopUpdate();
      this.$el.children().remove();
      this.unbind();
    },
    startUpdate: function (evt) {
      if (this.ifMedium()) {
        this.$el.children().eq(this.index).siblings().removeClass('is-active');
      }
      var self = this;
      if (typeof this.interval === 'undefined' || this.interval === null) {
          this.interval = setInterval(function () {
            self.update();
          }, this.speed);
      }
    },
    stopUpdate: function (evt) {
      if (this.ifMedium()) {
        this.storeActiveTitle();
        this.$el.children().addClass('is-active');
      }
      window.clearInterval(this.interval);
      this.interval = null;

    },
    storeActiveTitle: function () {
      var total = this.$('.hero__title').length;
      this.index = this.$('.is-active').index();
      this.next = this.index + 1 < total ? this.index + 1 : 0;
    },
    update: function (evt) {
      var self = this;
      if (evt && (evt.type === 'click' || evt.type === 'touchstart')) {
        evt.preventDefault();
        window.clearInterval(this.interval);
        this.interval = null;
      }
      if (evt && evt.type === 'touchstart') {
        $(window).on('touchend', function (evt) {
          var $target = $(evt.target).parents('#js-hero').length || $(evt.target).is('#js-hero');
          if (!$target) {
            $(window).off('touchend');
            self.startUpdate();
          }
        });
      }
      this.storeActiveTitle();
      this.$('.hero__title').removeClass('is-active').eq(this.next).addClass('is-active');
    }
  });

  return HeroView;
});