define(function (require) {
  var Backbone = require('backbone');
  var ProjectData = JSON.parse(require('text!data/project.json'));

  var ProjectModel = Backbone.Model.extend({
    initialize: function () {
      this.set({
        rokkan: ProjectData.rokkan,
        talk: ProjectData.talk,
        personal: ProjectData.personal,
        tool: ProjectData.tool
      });
    }
  });

  return ProjectModel;
});