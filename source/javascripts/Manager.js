define(['jquery', 'backbone'], function ($, Backbone) {

  var Manager = function Manager() {
    var currentView;

    var closeView = function (view) {
      if (view && view.close) {
        view.close();
      }
    };

    var openView = function (view) {
      view.render();
      if (view.onShow) {
          view.onShow();
      }
    };
    this.show = function (view) {
      closeView(currentView);
      currentView = view;
      openView(currentView);
    };
  };

  return Manager;
});