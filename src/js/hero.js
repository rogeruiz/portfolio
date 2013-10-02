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
      'click .js-hero-change': 'update'
    },
    el: '#js-hero',
    render: function () {
      this.$el.html(this.data);
      return this;
    },
    update: function () {
      var _random = Math.floor(Math.random() * 4);
      var _old = this.$el.find('.is-active').index();
      var $heroes = this.$el.find('.hero__title');
      $heroes.removeClass('is-active');
      if (_random === _old) {
        _random = (_random + 1 < $heroes.length) ? _random + 1 : _random - 1;
      }
      $heroes.eq(_random).addClass('is-active');
    }
  });

  var hero = new HeroView;
  hero.render();

  return function () {};
});