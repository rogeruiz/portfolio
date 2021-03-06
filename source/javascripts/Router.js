define(function (require) {
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Events = require('source/Events');
  var Manager = require('source/Manager');
  var HeroView = require('source/HeroView');
  var NavView = require('source/NavView');
  var AboutView = require('source/AboutView');
  var ProjectListView = require('source/ProjectListView');
  var ProjectView = require('source/ProjectView');
  var ProjectModel = require('source/ProjectModel');

  var HeroManager = new Manager();
  var ProjectManager = new Manager();

  var Router = Backbone.Router.extend({
    initialize: function (options) {
      var self = this;
      this.vent = options.vent;
      $(document).on('click', 'a:not([target])', function(evt) {
        var href = { prop: $(this).prop('href'), attr: $(this).attr('href') };
        var root = location.protocol + '//' + location.host;
        if (href.prop && href.prop.slice(0, root.length) === root) {
          self.transition(evt, href);
        }
      });
    },
    routes: {
      'about': 'showAbout',
      ':type/:project': 'showProject',
      '*actions': 'showDefault'
    },
    transition: function (evt, href) {
      evt.preventDefault();
      Backbone.history.navigate(href.attr, true);
      this.vent.trigger('toTop');
      this.vent.trigger('closeNav');
    }
  });

  var events = Events;
  var routes = new Router({ vent: events });

  routes.on('route:showAbout', function () {
    var url = '/about';
    events.trigger('highlightNav', { url: url });
    events.trigger('toggleBack');
    HeroManager.show(new AboutView.hero({ vent: events }));
    ProjectManager.show(new AboutView.project({ vent: events }));
  });

  routes.on('route:showDefault', function () {
    events.trigger('toggleBack');
    events.trigger('highlightNav', { url: '' });
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

  var navView = new NavView.header({ vent: events });
  var footerView = new NavView.footer({ vent: events });

  Backbone.history.start({
    pushState: Modernizr.history
  });

  return function () {};
});