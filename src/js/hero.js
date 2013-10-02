define(function (require) {

  var $ =  require('jquery');
  var _ =  require('underscore');
  var Backbone =  require('backbone');
  var Handlebars =  require('handlebars');
  var heroTemplate =  require('hb!tmp/hero.hbs');
  var heroData =  require('text!data/hero.json');

  // var Hero = Backbone.Model.extend({
  //   initialize: function () {

  //   }
  // });

  Handlebars.registerHelper('list', function(context, options) {
    return options.fn(context);
  });

  var HeroView = Backbone.View.extend({
    initialize: function () {
      this.render();
    },
    render: function () {
      var $el = $(this.el);
      $el.html(heroTemplate);
    }
  });

  var hero_view = new HeroView({
    el: '#js-hero'
  });

  return function () {};
});