define(function (require) {

  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Handlebars = require('handlebars');
  var AboutModel = require('src/AboutModel');
  var HeroTemplate = require('hb!tmp/hero--about.hbs');
  var ProjectTemplate = require('hb!tmp/project--about.hbs');

  Handlebars.registerHelper('list', function(context, options) {
    var ret = '<ul class="project--about__skills">';
    for(var i=0, j=context.length; i<j; i++) {
      ret = ret + '<li>' + context[i] + '</li>';
    }
    return ret + '</ul>';
  });

  Handlebars.registerHelper('paragraph', function(context, options) {
    var ret = '';
    for(var i=0, j=context.length; i<j; i++) {
      ret = ret + '<p class="project--about__bio">' + context[i] + '</p>';
    }
    return ret;
  });

  var AboutHero = Backbone.View.extend({
    initialize: function () {},
    model: new AboutModel(),
    events: {},
    el: '#js-hero',
    onShow: function () {
      // this.$el.show(300);
    },
    render: function() {
      this.$el.addClass('hero--about');
      this.$el.html(HeroTemplate(this.model.attributes));
      return this;
    },
    close: function () {
      this.$el.removeClass('hero--about');
      this.$el.children().remove();
      this.unbind();
    }
  });

  var AboutProject = Backbone.View.extend({
    initialize: function () {},
    model: new AboutModel(),
    events: {},
    el: '#js-project',
    render: function() {
      this.$el.addClass('project--about');
      this.$el.html(ProjectTemplate(this.model.attributes));
      return this;
    },
    close: function () {
      this.$el.removeClass('project--about');
      this.$el.children().remove();
      this.unbind();
    }
  });

  return {
    hero: AboutHero,
    project: AboutProject
  };

});