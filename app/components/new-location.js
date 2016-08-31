import Ember from 'ember';

export default Ember.Component.extend({
  addNewLocation: false,
  actions: {
    locationFormShow() {
      this.set('addNewLocation', true);
    },
    saveLocation() {
      if (this.get('category') === undefined)
      {
        var locationCategory =  'Other';
      } else {
        var locationCategory = this.get('category');
      };
      var params = {
        name: this.get('name'),
        description: this.get('description'),
        latitude: this.get('latitude'),
        longitude: this.get('longitude'),
        category: locationCategory,
        website: this.get('website'),
        streetview: this.get('streetview')
      };
      this.set('addNewLocation', false);
      this.sendAction('saveLocation', params);
    },
    selectCategory(category) {
      this.set('category', category);
    }
  }
});
