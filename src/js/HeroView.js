define(function (require) {

  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Handlebars = require('handlebars');
  var HeroModel = require('src/HeroModel');
  var HeroTemplate = require('hb!tmp/hero.hbs');

  var HeroView = Backbone.View.extend({
    initialize: function (options) {
      this.vent = options.vent;
    },
    model: new HeroModel(),
    events: {
      'mouseover .hero__title': 'stopUpdate',
      'mouseout .hero__title': 'startUpdate',
      'touchstart .js-hero-change': 'update',
      'click .js-hero-change': 'update'
    },
    speed: 5000,
    ifMedium: Modernizr.mq('(min-width: 900px)'),
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
      if (!!this.index && this.ifMedium) {
        this.$el.children().eq(this.next).siblings().removeClass('is-active');
      }
      var self = this;
      this.interval = setInterval(function () {
        self.update();
      }, this.speed);
    },
    stopUpdate: function (evt) {
      if (this.ifMedium) {
        this.$el.children().addClass('is-active');
      }
      window.clearInterval(this.interval);
    },
    update: function (evt) {
      if (evt && evt.originalEvent.type === 'touchstart') {
        evt.preventDefault();
      }
      var total = this.$('.hero__title').length;
      this.index = this.$('.is-active').index();
      this.next = this.index + 1 < total ? this.index + 1 : 0;
      this.$('.hero__title').removeClass('is-active').eq(this.next).addClass('is-active');
    }
  });

  return HeroView;
});