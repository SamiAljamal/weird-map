import Ember from 'ember';

export default Ember.Component.extend({
  map: Ember.inject.service('google-map'),

  actions: {
    showMap(model) {
      console.log(model);
      var container = this.$('.map-display')[0];
      var options = {
        center: this.get('map').center(45.522462, -122.665674),
        zoom: 15
      };
      var fullMap = this.get('map').findMap(container, options);
      var map = this.get('map');

      model.forEach(function(location){
        console.log(location.get('name'));
        var latLng = {lat: location.get('latitude'), lng: location.get('longitude')};
        var name = location.get('name');
        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: name
        });
        marker.setMap(fullMap);
      });
    }
  }
});
