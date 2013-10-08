define(function (require) {
  var Backbone = require('backbone');
  var NavData = JSON.parse(require('text!data/project.json'));

  var NavModel = Backbone.Model.extend({
    initialize: function () {
      this.set({
        rokkan: NavData.rokkan,
        talk: NavData.talk,
        personal: NavData.personal,
        tool: NavData.tool
      });
    }
  });

  return NavModel;
});
