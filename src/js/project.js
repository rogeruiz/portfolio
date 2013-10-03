define(function (require) {

  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Handlebars = require('handlebars');
  var projectTemplate = require('hb!tmp/project.hbs');
  var projectData = JSON.parse(require('text!data/project.json'));

  var ProjectModel = Backbone.Model.extend({
    initialize: function () {
      this.set({
        rokkan: projectData.rokkan,
        talk: projectData.talk,
        personal: projectData.personal,
        tool: projectData.tool
      });
    }
  });

  var ProjectView = Backbone.View.extend({
    initialize: function () {},
    model: new ProjectModel,
    events: {},
    el: '#js-project-list',
    render: function() {
      this.$el.html(projectTemplate(this.model.attributes));
      return this;
    }
  });

  var project = new ProjectView;
  project.render();

});