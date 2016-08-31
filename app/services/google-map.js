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
  },
  testAction() {
    alert('It worked!!');
  },
  addMarkers(locationsArray, fullMap, infoWindow, locationCategory) {
    locationsArray.forEach(function(location){
      if ((location.get('category') === locationCategory) || locationCategory === "all") {
        var latLng = {lat: location.get('latitude'), lng: location.get('longitude')};
        var name = location.get('name');
        var marker = new google.maps.Marker({
          position: latLng,
          map: fullMap,
          title: name,
          icon: '../../assets/images/'+ location.get('category') + '.png'
        });
        var contentString = '<a href="' + location.get('website') + '" target="_blank"><h3>' + location.get('name') + '</h3></a><br>' + location.get('description') + '<br> <em>Category: ' + location.get('category') + '</em> <br> <a href="' + location.get('streetview') + '" target="_blank">Street View</a> <br>';

        //add info window to marker, close other info window when opening a new one
        google.maps.event.addListener(marker, 'click', function() {
          if (infoWindow !== void 0) {
            infoWindow.close();
          }
          infoWindow = new google.maps.InfoWindow({
            content: contentString
          });
          infoWindow.open(fullMap, marker);
        });
        marker.setMap(fullMap);
      }
    });
  }

  // waypointRouting(first, second, third, fourth) {
  //   var directionsDisplay;
  //   var directionsService = new google.maps.DirectionsService();
  //   var map;
  //   function initialize() {
  //     directionsDisplay = new google.maps.DirectionsRenderer();
  //     var portland = new google.maps.LatLng(44.850033, -122.6500523);
  //     var mapOptions = {
  //       zoom:12,
  //       center: portland
  //     };
  //     map = new google.maps.Map(document.getElementById('map'), mapOptions);
  //     directionsDisplay.setMap(map);
  //   };
  //   function calcRoute() {
  //     var request = {
  //       origin: first,
  //       destination: fourth,
  //       travelMode: 'BICYCLING',
  //       waypoints: [{
  //         location: second,
  //         stopover: true
  //       },{
  //         location: third,
  //         stopover: true
  //       }]
  //     };
  //     directionsService.route(request, function(result, status) {
  //       if (status == 'OK') {
  //         directionsDisplay.setDirections(result);
  //       }
  //     });
  //   }
  // }
});
