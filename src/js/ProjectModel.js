define(function (require) {
  var Backbone = require('backbone');
  var ProjectData = JSON.parse(require('text!data/project.json'));

  var ProjectModel = Backbone.Model.extend({
    initialize: function () {
      this.set({
        rokkan: ProjectData.rokkan,
        talks: ProjectData.talks,
        personal: ProjectData.personal,
        tools: ProjectData.tools
      });
    }
  });

  return ProjectModel;
});