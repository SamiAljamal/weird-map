import Ember from 'ember';

export default Ember.Component.extend({
  map: Ember.inject.service('google-map'),

  actions: {
    showMap(location) {
      console.log(location);
      var container = this.$('.map-display')[0];
      var options = {
        center: this.get('map').center(location.get('latitude'), location.get('longitude')),
        zoom: 15
      };
      var fullMap = this.get('map').findMap(container, options);
      var latLng = {lat: location.get('latitude'), lng: location.get('longitude')};
      var map = this.get('map');
      var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: 'Hello World!'
      });
      marker.setMap(fullMap);
    }
  }
});
