define(function (require) {

  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Handlebars = require('handlebars');
  var ProjectModel = require('src/ProjectModel');
  var ProjectTemplate = require('hb!tmp/project.hbs');

  var ProjectListView = Backbone.View.extend({
    initialize: function () {},
    model: new ProjectModel,
    events: {},
    el: '#js-project-list',
    render: function() {
      this.$el.html(ProjectTemplate(this.model.attributes));
      return this;
    }
  });

  // var project = new ProjectView;
  // project.render();

  return ProjectListView;

});