define(function (require) {
  var $ = require('jquery');
  // var _ = require('underscore');
  var Backbone = require('backbone');
  var HeroView = require('src/HeroView');
  var NavView = require('src/NavView');
  var ProjectListView = require('src/ProjectListView');


  var Router = Backbone.Router.extend({

    routes: {
      'about': 'showAbout',
      'work/:project': 'showProject',
      '*actions': 'showDefault'
    }

  });

  var routes = new Router;

  routes.on('route:showAbout', function () {

  });

  routes.on('route:showDefault', function () {
    var heroView = new HeroView;
    var projectListView = new ProjectListView;
    heroView.render();
    projectListView.render();
  });

  var navView = new NavView;

  Backbone.history.start({
    pushState: false
  });

  return function () {};
});