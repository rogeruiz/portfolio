define(function (require) {

  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Handlebars = require('handlebars');
  var HeroModel = require('src/HeroModel');
  var HeroTemplate = require('hb!tmp/hero.hbs');

  var HeroView = Backbone.View.extend({
    initialize: function () {},
    model: new HeroModel,
    events: {
      'mouseover': 'stopUpdate',
      'mouseout': 'startUpdate',
      'click .js-hero-change': 'update'
    },
    el: '#js-hero',
    render: function () {
      this.$el.html(HeroTemplate(this.model.attributes));
      this.startUpdate();
      return this;
    },
    startUpdate: function (evt) {
      var self = this;
      window.HeroInterval = setInterval(function () {
        self.update();
      }, 5000);
    },
    stopUpdate: function (evt) {
      clearInterval(window.HeroInterval);
    },
    update: function (evt) {
      var total = this.$('.hero__title').length;
      var index = this.$('.is-active').index();
      var next = index + 1 < total ? index + 1 : 0;
      this.$('.hero__title').removeClass('is-active').eq(next).addClass('is-active');
    }
  });

  // var hero = new HeroView;
  // hero.render();

  return HeroView;
});