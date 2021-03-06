import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    var controller = this.controllerFor('application');
    return controller.set('showLargeHero', true);
  },

  deactivate: function() {
    var controller = this.controllerFor('application');
    return controller.set('showLargeHero', false);
  }
});

