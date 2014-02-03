define(function (require) {
  var Backbone = require('backbone');
  var ProjectData = JSON.parse(require('text!data/project.json'));
  var HeroData = JSON.parse(require('text!data/hero.json'));

  var NavModel = Backbone.Model.extend({
    initialize: function () {
      this.set({
        about: HeroData,
        cne: ProjectData.cne,
        rokkan: ProjectData.rokkan,
        talks: ProjectData.talks,
        personal: ProjectData.personal,
        tools: ProjectData.tools
      });
    }
  });

  return NavModel;
});
