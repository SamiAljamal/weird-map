# Portland Weird Map
### 09/02/2016

# Week 5 Epicodus JavaScript Team Project by:
* Sami Al-Jamal
* Patrick Lipscomb
* Adam Luchini
* George Olson

## Description

The Portland Weird Map is a geographical display of "weird" locations around Oregon's biggest city. In addition to typical features present in [Google Maps API](https://developers.google.com/maps/web/) applications (zooming, scrolling, street, and satellite views), the Portland Weird Map allows users to interact with how data points are displayed with category filtering. A form is also present if the user wants to contribute and add their own weird location to the map. All data the user inputs is stored and retrieved using Google's [Firebase](http://www.firebase.com).

## Specifications
The capabilities of the Portland Weird Map are as follows:
* Upon opening, all locations are displayed on the page.
  * Example: The index page loads without a predetermined filter and all location markers are present.

* Defined categories are represented by a unique marker.
  * Example: With all categories being displayed, the "entertainment" category is given a yellow wizard hat marker to avoid excess clutter.

* Filters what category of locations are displayed on the map overlay.
  * Example: A user is only interested in seeing the locations of weird museums. By clicking on the "museum" button, all categories that aren't classified as "museum" are displayed. In the same session, the "food" button can be clicked and all categories that aren't classified as "food" are displayed.

* Filters are removed by clicking the "View All" button.
  * Example: A user is done viewing weird hotels. After the "View All" button is clicked, all category markers return to the map.

* An information box on a specific location is displayed when a marker is clicked.
  * Example: A user spots a purple landmark marker in the Kenton neighborhood. The icon is clicked and an info box displays: "The Paul Bunyan Statue" along with a brief description.

* Additional information on a location can be shown by clicking on the location name.
  * Example: In the Paul Bunyan information pop up box, the location name is hyperlinked. Clicking it will deliver the user to http://www.roadsideamerica.com/tip/2557 in a new browser window, where more information on the statue can be accessed.

* A user can jump to a Google Street View of locations.
  * Example: The "street view" link on The Lovecraft's info box opens a new browser window to https://www.google.com/maps/place/The+Lovecraft+Bar/@45.5198995,-122.660748,3a,60y,264.84h,83.49t/data=!3m6!1e1!3m4!1sjg1TMbOEmnT9noFnfOBbzg!2e0!7i13312!8i6656!4m5!3m4!1s0x5495a0a65443d16b:0x7fc595154ea47646!8m2!3d45.5198985!4d-122.660942!6m1!1e1

* New locations can be added.
  * Example: A user thinks Cecil, the cat that hangs out at the Hawthorne Safeway is weird enough to be added to the map. To add it, the New Location button is clicked and the form is filled out with the necessary information.
    * Name: Cecil the Safeway Cat
    * Description: An adorable and friendly tabby cat that can usually be spotted roaming the parking lot of Safeway. On occasion, he can be found inside the store.
    * Latitude: 45.511788
    * Longitude: -122.636999
    * Category: Store
    * Website: http://www.lovemeow.com/cat-comes-to-safeway-store-every-morning-to-hang-out-with-customers-1608507927.html
    * Street View Link: https://www.google.com/maps/@45.5120738,-122.6366276,3a,75y,238.93h,86.35t/data=!3m6!1e1!3m4!1s_YUSfVMSehHPcIAroirD1g!2e0!7i13312!8i6656

## Setup/Installation Requirements

You will need the following properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

* `ember server`
* Visit Portland Weird Map at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Technologies Used

HTML5, CSS, JavaScript, Bootstrap.css, EmberJS, Google Maps API, Firebase, Leaflet

## Contact

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
*

## License
This software is licensed under the MIT license

Copyright (c) 2016 All Rights Reserved.
