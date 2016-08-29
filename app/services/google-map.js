import Ember from 'ember';

export default Ember.Service.extend({
  googleMaps: window.google.maps,
  findMap(container, options) {
    return new this.googleMaps.Map(container, options);
  },
  center(latitude, longitude) {
    return new this.googleMaps.LatLng(latitude, longitude);
  },
  directionsService() {
    return new google.maps.DirectionsService();
  },
  directionsDisplay() {
    return new google.maps.DirectionsRenderer();
  }

  waypointRouting(first, second, third, fourth) {
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    function initialize() {
      directionsDisplay = new google.maps.DirectionsRenderer();
      var portland = new google.maps.LatLng(44.850033, -122.6500523);
      var mapOptions = {
        zoom:7,
        center: portland
      }
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      directionsDisplay.setMap(map);
    }
    function calcRoute() {
      var request = {
        origin: first,
        destination: fourth,
        travelMode: 'BICYCLING',
        waypoints[]: [{
          location: second,
          stopover: true
        },{
          location: third,
          stopover: true
        }]
      };
      directionsService.route(request, function(result, status) {
        if (status == 'OK') {
          directionsDisplay.setDirections(result);
        }
      });
    }
  }
});
