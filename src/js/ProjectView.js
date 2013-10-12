define(function (require) {

  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Handlebars = require('handlebars');
  var ProjectModel = require('src/ProjectModel');
  var ProjectTemplate = require('hb!tmp/project--view.hbs');
  var HeroTemplate = require('hb!tmp/hero--project.hbs');

  var ProjectView = Backbone.View.extend({
    initialize: function (options) {
      this.type = options.type;
      this.project = options.project;
    },
    model: new ProjectModel,
    events: {},
    el: '#js-project',
    render: function() {
      this.$el.addClass('project--view');
      this.$el.html(ProjectTemplate(this.model.get(this.type)[this.project].project));
      return this;
    },
    close: function () {
      this.$el.removeClass('project--view');
      this.$el.children().remove();
      this.unbind();
      
    }
  });

  var ProjectHeroView = Backbone.View.extend({
    initialize: function (options) {
      this.type = options.type;
      this.project = options.project;
    },
    model: new ProjectModel,
    events: {},
    el: '#js-hero',
    onShow: function () {
      // this.$el.show(300);
    },
    render: function() {
      this.$el.addClass('hero--project');
      this.$el.html(HeroTemplate(this.model.get(this.type)[this.project].project));
      return this;
    },
    close: function () {
      this.$el.removeClass('hero--project');
      this.$el.children().remove();
      this.unbind();
    }
  });

  return {
    hero: ProjectHeroView,
    project: ProjectView
  };

});