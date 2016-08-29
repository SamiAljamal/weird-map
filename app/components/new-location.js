import Ember from 'ember';

export default Ember.Component.extend({
  addNewLocation: false,
  actions: {
    locationFormShow() {
      this.set('addNewLocation', true);
    },
    saveLocation() {
      var params = {
        name: this.get('name'),
        description: this.get('description'),
        latitude: this.get('latitude'),
        longitude: this.get('longitude')
      };
      this.set('addNewLocation', false);
      this.sendAction('saveLocation', params);
    }
  }
});
