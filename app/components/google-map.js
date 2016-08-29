import Ember from 'ember';

export default Ember.Component.extend({
  map: Ember.inject.service('google-map'),

  didInsertElement(model) {
      var container = this.$('.map-display')[0];
      var options = {
        center: this.get('map').center(45.522462, -122.665674),
        zoom: 15,
        styles: [{"featureType":"all","stylers":[{"saturation":0},{"hue":"#e7ecf0"}]},{"featureType":"road","stylers":[{"saturation":-70}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"simplified"},{"saturation":-60}]}]
      };
      var fullMap = this.get('map').findMap(container, options);
      var map = this.get('map');

      this.model.forEach(function(location){
        console.log(location.get('name'));
        var latLng = {lat: location.get('latitude'), lng: location.get('longitude')};
        var name = location.get('name');
        var marker = new google.maps.Marker({
          position: latLng,
          map: fullMap,
          title: name
        });
        var contentString = '<h2>' + location.get('name') + '</h2>' + '<br>' + location.get('description');
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
        marker.setMap(fullMap);
      });
  },

});
