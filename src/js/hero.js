define(function (require) {

  var $ =  require('jquery');
  var _ =  require('underscore');
  var Backbone =  require('backbone');
  var Handlebars =  require('handlebars');
  var heroTemplate =  require('hb!tmp/hero.hbs');
  var heroData =  JSON.parse(require('text!data/hero.json'));

  var HeroView = Backbone.View.extend({
    initialize: function () {
      this.render();
    },
    render: function () {
      var $el = $(this.el);
      $el.html(heroTemplate(heroData));
    }
  });

  var hero_view = new HeroView({
    el: '#js-hero'
  });

  return function () {};
});