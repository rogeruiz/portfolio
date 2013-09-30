define(['jquery', 'underscore', 'backbone', 'hb!tmp/heroes.hbs'], function ($, _, Backbone, heroes) {

  var heroText = {
    heroes: [
      {
        nameLink: 'mailto:hi@rog.gr',
        name: 'Roger Steve Ruiz',
        role: 'about',
        roleDescription: 'senior technologist',
        placeWebsite: 'http://rokkan.com',
        place: 'Rokkan'
      }
    ]
  };

  var HeroView = Backbone.View.extend({
    initialize: function () {
      this.render();
    },
    render: function () {
      var $el = $(this.el);
      $el.html(heroes(heroText));
    }
  });

  var hero_view = new HeroView({
    el: '#js-hero'
  });

  return function () {};
});