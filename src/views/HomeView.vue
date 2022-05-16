<script>
import axios from 'axios';
import mapboxgl from 'mapbox-gl';




export default {
  data: function () {
    return {
      message1: "Huzzah!!!",
      message2: "Welcome to the Colorado Renaissance Festival App!",
    };
  },
  created: function () { },
  methods: {},
};


mapboxgl.accessToken = process.env.VUE_APP_MAP_ACCESS_TOKEN;
const bounds = [
  [-104.903, 39.2275], // Southwest coordinates
  [-104.896, 39.2291] // Northeast coordinates
];
// const eventCoordinates = [
//   [100.507, 13.745],
//   [98.993, 18.793],
//   [99.838, 19.924],
//   [102.812, 17.408],
//   [100.458, 7.001],
//   [100.905, 12.935]
// ];
const map = new mapboxgl.Map({
  container: 'map',
  // Replace YOUR_STYLE_URL with your style URL.
  style: 'mapbox://styles/thedoctorq/cl37o8i0x000416mym52v21zy',
  center: [-104.900015, 39.228226],
  pitch: 50, // starting position [lng, lat]
  zoom: 17, // starting zoom
});
map.on('load', () => {
  map.addSource('events', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {
            'title': 'Acrobatrix',
            'description':
              '<strong>Star and Thunder live up to their names in a fast paced fun filled show. Featuring Contortion, juggling, acrobatic stunts, foot archery and so much more!</p>'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.901358, 39.228154]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a Mad Men Season Five Finale Watch Party, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-77.003168, 38.894651]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a Big Backyard Beach Bash and Wine Fest on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.</p>'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-77.090372, 38.881189]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<strong>Ballston Arts & Crafts Market</strong><p>The Ballston Arts & Crafts Market sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-77.111561, 38.882342]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              "<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year's Seersucker Social bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>"
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-77.052477, 38.943951]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<strong>Capital Pride Parade</strong><p>The annual Capital Pride Parade makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-77.043444, 38.909664]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist Muhsinah plays the Black Cat (1811 14th Street NW) tonight with Exit Clov and Gods’illa. 9:00 p.m. $12.</p>'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-77.031706, 38.914581]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              "<strong>A Little Night Music</strong><p>The Arlington Players' production of Stephen Sondheim's <em>A Little Night Music</em> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>"
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-77.020945, 38.878241]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<strong>Truckeroo</strong><p>Truckeroo brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-77.007481, 38.876516]
          }
        }
      ]
    }
  });
  // Add a layer showing the events.
  map.addLayer({
    'id': 'events',
    'type': 'circle',
    'source': 'events',
    'paint': {
      'circle-color': '#4264fb',
      'circle-radius': 6,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ffffff'
    }
  });

  // Create a popup, but don't add it to the map yet.
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  map.on('mouseenter', 'events', (e) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(description).addTo(map);
  });

  map.on('mouseleave', 'events', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });
});
// map.on('click', () => {
//   for (const [index, coordinate] of eventCoordinates.entries()) {
//     setTimeout(() => {
//       map.jumpTo({ center: coordinate });
//     }, 2000 * index);
//   }
// });
// const geocoder = new MapboxGeocoder({
//   accessToken: mapboxgl.accessToken,
//   flyTo: {
//     bearing: 0,
//     // Control the flight curve, making it move slowly and
//     // zoom out almost completely before starting to pan.
//     speed: 0.2, // Choose the speed at which the camera flies.
//     curve: 1, // Change the speed at which it zooms out.
//     // This can be any easing function: it takes a number between
//     // 0 and 1 and returns another number between 0 and 1.
//     easing: function (t) {
//       return t;
//     }
//   },
//   mapboxgl: mapboxgl
// });

// // Add the geocoder to the map/
// map.addControl(geocoder);

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true
  })
);
map.addControl(
  new MapboxDirections({
    accessToken: mapboxgl.accessToken

  }),
  'top-left'
);
var directions = new MapboxDirections({
  accessToken: process.env.VUE_APP_MAP_ACCESS_TOKEN,
  unit: 'miles', // Use the metric system to display distances.
  profile: 'mapbox/walking', // Set the initial profile to walking.
  container: 'directions', // Specify an element thats not the map container.
  //  controls: {instructions: false},
  bearing: true,
  steps: true,
  controls: {
    inputs: false,
    instructions: true,
    profileSwitcher: true
  }
});

// map.on('load', function () {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//       directions.setOrigin([position.coords.longitude, position.coords.latitude]);
//     });
//   }
// });
// directions.on('route', function (e) {
//   console.log(e.route); // Logs the current route shown in the interface.
// });


</script>

<template>
  <div class="home">
    <h1>{{ message1 }}</h1>
    <h2>{{ message2 }}</h2>
  </div>
</template>

<style>
#map {
  width: 100%;
  height: 500px;
}

.mapboxgl-popup {
  max-width: 400px;
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
}

body {
  background-image: url("https://www.toptal.com/designers/subtlepatterns/uploads/dynamic-style.png'");
  background-color: #cccccc;
}
</style>
