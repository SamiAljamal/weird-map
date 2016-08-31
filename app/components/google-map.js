import Ember from 'ember';

export default Ember.Component.extend({
  map: Ember.inject.service('google-map'),

  // first: [45.522462, -122.665674],
  // second: [46.522462, -122.665674],
  // third: [47.522462, -122.665674],
  // fourth: [48.522462, -122.665674],

  //automatically runs if component is included in template
  didInsertElement() {
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
      },
      //initiates data map which overlays information from json file
      initDataMap() {
        this.$('.btn').removeClass('active');
        this.$('.btn-datamap').addClass('active');
        // Set a blank infoWindow to be used for each to state on click
         var infoWindow = new google.maps.InfoWindow({
           content: ""
         });

        var container = this.$('.map-display')[0];
        var options = {
          center: this.get('map').center(45.522462, -122.665674),
          zoom: 12,
          styles: [{"featureType":"all","stylers":[{"saturation":0},{"hue":"#e7ecf0"}]},{"featureType":"road","stylers":[{"saturation":-70}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"simplified"},{"saturation":-60}]}],
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: false,
          mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.TERRAIN]
          }
        };
        var fullMap = this.get('map').findMap(container, options);

        // Create the state data layer and load the GeoJson Data
        var stateLayer = new google.maps.Data();
        stateLayer.loadGeoJson('https://gist.githubusercontent.com/SamiAljamal/6dc9409bbfa932e21669f53e1de7672b/raw/52c35690556456ad8cff634600dc55d007a71a8b/porltand.json');

        // Set and apply styling to the stateLayer
        stateLayer.setStyle(function(feature) {
          return {
            fillColor: getColor(feature.getProperty('COLI')), // call function to get color for state based on the COLI (Cost of Living Index)
            fillOpacity: 0.8,
            strokeColor: '#b3b3b3',
            strokeWeight: 1,
            zIndex: 1
          };
        });

        // Add mouseover and mouse out styling for the GeoJSON State data
        stateLayer.addListener('mouseover', function(e) {
          stateLayer.overrideStyle(e.feature, {
            strokeColor: '#2a2a2a',
            strokeWeight: 2,
            zIndex: 2
          });
        });

        stateLayer.addListener('mouseout', function(e) {
          stateLayer.revertStyle();
        });

        // Adds an info window on click with in a state that includes the state name and COLI
        stateLayer.addListener('click', function(e) {
          console.log(e);
          infoWindow.setContent('<div style="line-height:1.00;overflow:hidden;white-space:nowrap;">' +
            e.feature.getProperty('NAME') + '<br> COLI: ' +
            e.feature.getProperty('COLI') + '</div>');

          var anchor = new google.maps.MVCObject();
          anchor.set("position", e.latLng);
          infoWindow.open(fullMap, anchor);
        });


        // Final step here sets the stateLayer GeoJSON data onto the map
        stateLayer.setMap(fullMap);

        // returns a color based on the value given when the function is called
        function getColor(coli) {
          var colors = [
            '#d1ccad',
            '#c2c083',
            '#cbd97c',
            '#acd033',
            '#89a844'
          ];

          return coli >= 121 ? colors[4] :
            coli > 110 ? colors[3] :
            coli > 102.5 ? colors[2] :
            coli > 100 ? colors[1] :
            colors[0];
        }
      }
    }
});
