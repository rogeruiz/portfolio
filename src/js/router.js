define(function (require) {
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var RegionManager = require('src/RegionManager');
  var HeroView = require('src/HeroView');
  var NavView = require('src/NavView');
  var AboutView = require('src/AboutView');
  var ProjectListView = require('src/ProjectListView');
  var ProjectView = require('src/ProjectView');
  var ProjectModel = require('src/ProjectModel');

  var HeroManager = new RegionManager;
  var ProjectManager = new RegionManager;

  var Router = Backbone.Router.extend({
    routes: {
      'about': 'showAbout',
      'work/:type/:project': 'showProject',
      '*actions': 'showDefault'
    }
  });

  var routes = new Router;

  routes.on('route:showAbout', function () {
    HeroManager.show(new AboutView.hero);
    ProjectManager.show(new AboutView.project);
  });

  routes.on('route:showDefault', function () {
    HeroManager.show(new HeroView);
    ProjectManager.show(new ProjectListView);
  });

  routes.on('route:showProject', function (type, project) {
    HeroManager.show(new ProjectView.hero({
      type: type,
      project: project
    }));
    ProjectManager.show(new ProjectView.project({
      type: type,
      project: project
    }));
  });

  var navView = new NavView;

  Backbone.history.start({
    pushState: Modernizr.history
  });

  return function () {};
});