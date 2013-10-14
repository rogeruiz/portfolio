define(function (require) {

  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Handlebars = require('handlebars');
  var ProjectModel = require('src/ProjectModel');
  var ProjectTemplate = require('hb!tmp/project--list.hbs');

  var ProjectListView = Backbone.View.extend({
    initialize: function (options) {
      this.vent = options.vent;
    },
    model: new ProjectModel(),
    events: {},
    el: '#js-project',
    render: function() {
      this.$el.addClass('project--list');
      this.$el.html(ProjectTemplate(this.model.attributes));
      return this;
    },
    close: function () {
      this.$el.removeClass('project--list');
      this.$el.children().remove();
      this.unbind();
      
    }
  });

  return ProjectListView;

});