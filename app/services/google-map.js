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
  addMarkers(locationsArray, fullMap, locationCategory) {
    var infoWindow;
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
});
