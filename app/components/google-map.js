import Ember from 'ember';

export default Ember.Component.extend({
  map: Ember.inject.service('google-map'),

  first: [45.522462, -122.665674],
  second: [46.522462, -122.665674],
  third: [47.522462, -122.665674],
  fourth: [48.522462, -122.665674],

  //automatically runs if component is included in template
  didInsertElement() {
      var infoWindow;
      var container = this.$('.map-display')[0];
      var options = {
        center: this.get('map').center(45.522462, -122.665674),
        zoom: 12,
        styles: [{"featureType":"all","stylers":[{"saturation":0},{"hue":"#e7ecf0"}]},{"featureType":"road","stylers":[{"saturation":-70}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"simplified"},{"saturation":-60}]}]
      };
      var fullMap = this.get('map').findMap(container, options);

      // loop through locations on home page and create markers & info windows for each
      this.get('map').addMarkers(this.model, fullMap, 'all');

    },
    actions: {
      showRouteMap() {
        var container = this.$('.map-display')[0];
        var directionsService = this.get('map').directionsService();
        var directionsDisplay = this.get('map').directionsDisplay();
        var options = {
          center: this.get('map').center(45.522462, -122.665674),
          zoom: 15
        };
        var fullMap = this.get('map').findMap(container, options);
        directionsDisplay.setMap(fullMap);
        var request = {
          origin: this.get('first'),
          destination: this.get('fourth'),
          travelMode: 'BICYCLING',
          waypoints: [
          {
            location: this.get('second'),
            stopover: true
          },{
            location: this.get('third'),
            stopover: true
          }]
        };
        directionsService.route(request, function(result, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(result);
          }
        });
      },
      isCategory(model, category) {
        this.$('.btn').removeClass('active');
        this.$('.btn-' + category.toLowerCase()).addClass('active');
        var container = this.$('.map-display')[0];
        var options = {
          center: this.get('map').center(45.522462, -122.665674),
          zoom: 12,
          styles: [{"featureType":"all","stylers":[{"saturation":0},{"hue":"#e7ecf0"}]},{"featureType":"road","stylers":[{"saturation":-70}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"simplified"},{"saturation":-60}]}]
        };
        var fullMap = this.get('map').findMap(container, options);
        this.get('map').addMarkers(this.model, fullMap, category);
      },
      viewAll() {
        this.$('.btn').removeClass('active');
        this.$('.btn-all').addClass('active');
        var container = this.$('.map-display')[0];
        var options = {
          center: this.get('map').center(45.522462, -122.665674),
          zoom: 12,
          styles: [{"featureType":"all","stylers":[{"saturation":0},{"hue":"#e7ecf0"}]},{"featureType":"road","stylers":[{"saturation":-70}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"simplified"},{"saturation":-60}]}]
        };
        var fullMap = this.get('map').findMap(container, options);

        // loop through locations on home page and create markers & info windows for each
        this.get('map').addMarkers(this.model, fullMap, 'all');
      }
    }
});
