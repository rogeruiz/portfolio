define(function (require) {
  var Backbone = require('backbone');
  var NavData = JSON.parse(require('text!data/project.json'));

  var NavModel = Backbone.Model.extend({
    initialize: function () {
      this.set({
        rokkan: NavData.rokkan,
        talks: NavData.talks,
        personal: NavData.personal,
        tools: NavData.tools
      });
    }
  });

  return NavModel;
});
