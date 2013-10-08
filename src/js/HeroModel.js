define(function (require) {
  var Backbone = require('backbone');
  var HeroData = JSON.parse(require('text!data/hero.json'));

  var HeroModel = Backbone.Model.extend({
    initialize: function () {
      this.set({
        main: HeroData.main,
        github: HeroData.github,
        twitter: HeroData.twitter,
        pinboard: HeroData.pinboard
      });
    }
  });

  return HeroModel;
});