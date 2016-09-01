import Ember from 'ember';

export default Ember.Component.extend({
  map: Ember.inject.service('google-map'),
  selectedItems: [],
  sortBy: ['category:asc'],
  sortedLocations: Ember.computed.sort('model', 'sortBy'),
  showFilteredLocations: false,
  filterByBar: Ember.computed.filterBy('model', 'category', 'Bar'),
  showFilteredBars: false,
  filterByStore: Ember.computed.filterBy('model', 'category', 'Store'),
  showFilteredStores: false,
  filterByMuseum: Ember.computed.filterBy('model', 'category', 'Museum'),
  showFilteredMuseums: false,
  filterByLandmark: Ember.computed.filterBy('model', 'category', 'Landmark'),
  showFilteredLandmarks: false,
  filterByHotel: Ember.computed.filterBy('model', 'category', 'Hotel'),
  showFilteredHotels: false,
  filterByFood: Ember.computed.filterBy('model', 'category', 'Food'),
  showFilteredFood: false,
  filterByEntertainment: Ember.computed.filterBy('model', 'category', 'Entertainment'),
  showFilteredEntertainment: false,
  filterByOther: Ember.computed.filterBy('model', 'category', 'Other'),
  showFilteredOther: false,
  filterByPark: Ember.computed.filterBy('model', 'category', 'Park'),
  showFilteredPark: false,

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
      hideAllOptions() {
      this.set('showFilteredLocations', false);
      this.set('showFilteredBars', false);
      this.set('showFilteredStores', false);
      this.set('showFilteredMuseums', false);
      this.set('showFilteredLandmarks', false);
      this.set('showFilteredHotels', false);
      this.set('showFilteredFood', false);
      this.set('showFilteredEntertainment', false);
      this.set('showFilteredOther', false);
      this.set('showFilteredPark', false);
      },
      showFilteredLocations() {
        this.toggleProperty('showFilteredLocations');
      },
      showFilteredBars() {
        this.toggleProperty('showFilteredBars');
      },
      showFilteredStores() {
        this.toggleProperty('showFilteredStores');
      },
      showFilteredMuseums() {
        this.toggleProperty('showFilteredMuseums');
      },
      showFilteredLandmarks() {
        this.toggleProperty('showFilteredLandmarks');
      },
      showFilteredHotels() {
        this.toggleProperty('showFilteredHotels');
      },
      showFilteredFood() {
        this.toggleProperty('showFilteredFood');
      },
      showFilteredEntertainment() {
        this.toggleProperty('showFilteredEntertainment');
      },
      showFilteredOther() {
        this.toggleProperty('showFilteredOther');
      },
      showFilteredPark() {
        this.toggleProperty('showFilteredPark');
      },
      saveLocation(params) {
        this.sendAction('saveLocation', params);
      },
      showRouteMap() {
        var lengthCoordinates = this.get('selectedItems').length - 1
        var firstLat = this.get('selectedItems')[0].get('latitude');
        var firstLng = this.get('selectedItems')[0].get('longitude');
        var lastLat = this.get('selectedItems')[lengthCoordinates].get('latitude');
        var lastLng = this.get('selectedItems')[lengthCoordinates].get('longitude');
        var container = this.$('.map-display')[0];
        var directionsService = this.get('map').directionsService();
        var directionsDisplay = this.get('map').directionsDisplay();
        var options = {
          center: this.get('map').center(45.522462, -122.665674),
          zoom: 15,
          styles: [{"featureType":"all","stylers":[{"saturation":0},{"hue":"#e7ecf0"}]},{"featureType":"road","stylers":[{"saturation":-70}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"simplified"},{"saturation":-60}]}]
        };
        var fullMap = this.get('map').findMap(container, options);
        directionsDisplay.setMap(fullMap);
        var stops; var secondLat; var secondLng; var thirdLat; var thirdLng; var fourthLat; var fourthLng;
        if (this.get('selectedItems').length === 5) {
          secondLat = this.get('selectedItems')[1].get('latitude');
          secondLng = this.get('selectedItems')[1].get('longitude');
          thirdLat = this.get('selectedItems')[2].get('latitude');
          thirdLng = this.get('selectedItems')[2].get('longitude');
          fourthLat = this.get('selectedItems')[3].get('latitude');
          fourthLng = this.get('selectedItems')[3].get('longitude');
          stops = [{location: {lat: secondLat, lng: secondLng},
          stopover: true}, {location: {lat: thirdLat, lng: thirdLng},
          stopover: true}, {location: {lat: fourthLat, lng: fourthLng},
          stopover: true}];
        } else if (this.get('selectedItems').length === 4) {
          secondLat = this.get('selectedItems')[1].get('latitude');
          secondLng = this.get('selectedItems')[1].get('longitude');
          thirdLat = this.get('selectedItems')[2].get('latitude');
          thirdLng = this.get('selectedItems')[2].get('longitude');
          stops = [{location: {lat: secondLat, lng: secondLng},
          stopover: true}, {location: {lat: thirdLat, lng: thirdLng},
          stopover: true}];
        } else if (this.get('selectedItems').length === 3) {
          secondLat = this.get('selectedItems')[1].get('latitude');
          secondLng = this.get('selectedItems')[1].get('longitude');
          stops = [{location: {lat: secondLat, lng: secondLng},
          stopover: true}];
        } else {
          stops = [];
        }
        console.log(stops.length);
        var request = {
          origin: {lat: firstLat, lng: firstLng},
          destination: {lat: lastLat, lng: lastLng},
          travelMode: 'BICYCLING',
          waypoints: stops
        };
        directionsService.route(request, function(result, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(result);
          }
        });
      },
      valueHasChanged(location, isChecked){
        if(isChecked) {
          this.get('selectedItems').addObject(location);
        }
        else {
          this.get('selectedItems').removeObject(location);
        }
      },
      deleteSelectedLocation(location) {
        this.get('selectedItems').removeObject(location);
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
        var neighborhood = new google.maps.Data();
        neighborhood.loadGeoJson('https://gist.githubusercontent.com/SamiAljamal/6dc9409bbfa932e21669f53e1de7672b/raw/962ec9c9e63a0bf3e946fb59f980dabb38a78625/porltand.json');

        // Set and apply styling to the stateLayer
        neighborhood.setStyle(function(feature) {
          return {
            fillColor: getColor(feature.getProperty('bars')), // call function to get color for state based on the COLI (Cost of Living Index)
            fillOpacity: 0.8,
            strokeColor: '#b3b3b3',
            strokeWeight: 1,
            zIndex: 1
          };
        });

        // Add mouseover and mouse out styling for the GeoJSON State data
        neighborhood.addListener('mouseover', function(e) {
          neighborhood.overrideStyle(e.feature, {
            strokeColor: '#2a2a2a',
            strokeWeight: 2,
            zIndex: 2
          });
        });

        neighborhood.addListener('mouseout', function(e) {
          neighborhood.revertStyle();
        });

        // Adds an info window on click with in a state that includes the state name and COLI
        neighborhood.addListener('click', function(e) {
          console.log(e);
          infoWindow.setContent('<div style="line-height:1.00;overflow:hidden;white-space:nowrap;">' +
            e.feature.getProperty('name') + '<br> bars: ' +
            e.feature.getProperty('bars') + '</div>');

          var anchor = new google.maps.MVCObject();
          anchor.set("position", e.latLng);
          infoWindow.open(fullMap, anchor);
        });


        // Final step here sets the stateLayer GeoJSON data onto the map
        neighborhood.setMap(fullMap);

        // returns a color based on the value given when the function is called
        function getColor(bars) {
          var colors = [
            '#fee5d9',
            '#fcae91',
            '#fb6a4a',
            '#de2d26',
            '#a50f15'
          ];

          return bars >= 25 ? colors[4] :
            bars > 15 ? colors[3] :
            bars > 3 ? colors[2] :
            bars > 0 ? colors[1] :
            colors[0];
        }

        var legend = document.getElementById('legend');
        var div = document.createElement('div');
        div.innerHTML = '<h4>Bars per neighborhood</h4>' + 
        '<ul>' +
        '<li><h5><div class="legend-color" id="zero"></div> = 0</h5></li>' +
        '<li><h5><div class="legend-color" id="one"></div> = 3-1</h5></li>' +
        '<li><h5><div class="legend-color" id="three"></div> = 15-3</h5></li>' +
        '<li><h5><div class="legend-color" id="fifteen"></div> = 25-15</h5></li>' +
        '<li><h5><div class="legend-color" id="twenty-five"></div> = more than 25</h5></li>';
        legend.appendChild(div);

        fullMap.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
      }
    }
});
