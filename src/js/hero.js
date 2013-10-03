define(function (require) {

  var $ =  require('jquery');
  var _ =  require('underscore');
  var Backbone =  require('backbone');
  var Handlebars =  require('handlebars');
  var heroTemplate =  require('hb!tmp/hero.hbs');
  var heroData =  JSON.parse(require('text!data/hero.json'));

  var HeroView = Backbone.View.extend({
    initialize: function () {
      this.data = heroTemplate(heroData);
    },
    events: {
      'mouseover': 'stopUpdate',
      'mouseout': 'startUpdate',
      'click .js-hero-change': 'update'
    },
    order: [],
    el: '#js-hero',
    render: function () {
      this.$el.html(this.data);
      this.startUpdate();
      return this;
    },
    startUpdate: function () {
      var self = this;
      window.heroInterval = setInterval(function () {
        self.update();
      }, 5000);
    },
    stopUpdate: function () {
      clearInterval(window.heroInterval);
    },
    update: function () {
      var total = this.$('.hero__title').length;
      var index = this.$('.is-active').index();
      var next = index + 1 < total ? index + 1 : 0;
      this.$('.hero__title').removeClass('is-active').eq(next).addClass('is-active');
    }
  });

  var hero = new HeroView;
  hero.render();

  return function () {};
});