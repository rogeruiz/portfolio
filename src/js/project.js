define(function (require) {

  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Handlebars = require('handlebars');
  var projectTemplate = require('hb!tmp/project.hbs');
  var projectData = JSON.parse(require('text!data/project.json'));

  var ProjectView = Backbone.View.extend({
    initialize: function () {
      this.data = projectTemplate(projectData);
    },
    events: {},
    el: '#js-project-list',
    render: function() {
      this.$el.html(this.data);
      return this;
    }
  });

  var project = new ProjectView;
  project.render();

});