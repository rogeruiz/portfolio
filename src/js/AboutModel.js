define(function (require) {
  var Backbone = require('backbone');
  var AboutData = JSON.parse(require('text!data/about.json'));

  var AboutModel = Backbone.Model.extend({
    initialize: function () {
      this.set(AboutData);
    }
  });

  return AboutModel;
});