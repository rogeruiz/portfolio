define(function (require) {
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var RegionManager = require('src/RegionManager');
  var HeroView = require('src/HeroView');
  var NavView = require('src/NavView');
  var AboutView = require('src/AboutView');
  var ProjectListView = require('src/ProjectListView');

  var HeroManager = new RegionManager;
  var ProjectManager = new RegionManager;

  var Router = Backbone.Router.extend({

    routes: {
      'about': 'showAbout',
      'work/:project': 'showProject',
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

  var navView = new NavView;

  Backbone.history.start({
    pushState: Modernizr.history
  });

  return function () {};
});