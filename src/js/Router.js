define(function (require) {
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Events = require('src/Events');
  var Manager = require('src/Manager');
  var HeroView = require('src/HeroView');
  var NavView = require('src/NavView');
  var AboutView = require('src/AboutView');
  var ProjectListView = require('src/ProjectListView');
  var ProjectView = require('src/ProjectView');
  var ProjectModel = require('src/ProjectModel');

  var HeroManager = new Manager();
  var ProjectManager = new Manager();

  var Router = Backbone.Router.extend({
    initialize: function () {},
    routes: {
      'about': 'showAbout',
      ':type/:project': 'showProject',
      '*actions': 'showDefault'
    }
  });

  var events = Events;
  var routes = new Router({ vent: events });

  routes.on('route:showAbout', function () {
    var url = '/about';
    events.trigger('highlightNav', { url: url });
    events.trigger("toggleBack");
    HeroManager.show(new AboutView.hero({ vent: events }));
    ProjectManager.show(new AboutView.project({ vent: events }));
  });

  routes.on('route:showDefault', function () {
    HeroManager.show(new HeroView({ vent: events }));
    ProjectManager.show(new ProjectListView({ vent: events }));
  });

  routes.on('route:showProject', function (type, project) {
    var url = '/' + type + '/' + project + '';
    events.trigger('highlightNav', { url: url });
    events.trigger('toggleBack');
    HeroManager.show(new ProjectView.hero({
      vent: events,
      type: type,
      project: project
    }));
    ProjectManager.show(new ProjectView.project({
      vent: events,
      type: type,
      project: project
    }));
  });

  var navView = new NavView({ vent: events });

  Backbone.history.start({
    pushState: Modernizr.history
  });

  return function () {};
});