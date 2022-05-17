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
  [-104.905, 39.2262], // Southwest coordinates
  [-104.895, 39.2311] // Northeast coordinates
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
  maxBounds: bounds, // Set the map's geographical boundaries.

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
            'description':
              '<p style="text-align:center"><strong>Crown Stage</strong></p><br/><p style="text-align:center">Acrobatrix: 11:00AM, 12:15PM, 2:15PM, 4:00PM</p><p style="text-align:center">The Amazing Hypnotist: 1:15PM & 3:45PM'
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
              '<p style="text-align:center"><strong>Jousting Arena</strong></p><br/><p style="text-align:center">The Knights Of Noble Cause: 11:30AM, 1:30PM, 4:30PM</p><p style="text-align:center">Knightwings: 12:30PM'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.897194, 39.227797]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Castle Rose Stage</strong></p><br/><p style="text-align:center">Celtic Legacy: 12:30PM, 3:30PM</p><p style="text-align:center">The Reelin’ Rogues: 11:00AM & 2:00PM'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.900684, 39.228073]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Globe Stage</strong></p><br/><p style="text-align:center">Cy The Sword Swallower: 11:30AM, 4:30PM</p><p style="text-align:center">Dragonfire: 12:30PM<p style="text-align:center">The CRAIC Show: 1:30PM & 5:30PM'

          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.899238, 39.228043]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Celestial Stage</strong></p><br/><p style="text-align:center">Kamikaze Fireflies: 11:45AM, 1:45PM, 3:45PM, 5:45PM</p>'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.902504, 39.228826]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Fortune Stage</strong></p><br/><p style="text-align:center">London Broil: 12:00PM, 1:30PM, 4:00PM</p>'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.897878, 39.228162]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Pirate Ship Stage</strong></p><br/><p style="text-align:center">The Angels-Heroines In Disguise: 12:30PM & 2:30PM</p><p style="text-align:center">The Washing Well Wenches: 1:30PM, 3:30PM, 5:00PM'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.902390, 39.228091]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Pirates Pub Stage</strong></p><br/><p style="text-align:center">The Crimson Pirates: 12:30PM & 2:30PM</p><p style="text-align:center">Music: The Gathering: 1:30PM, 3:30PM, 5:00PM'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.899970, 39.228121]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>The Living Fountain</strong></p><br/><p style="text-align:center">Showtimes: 11:30AM, 1:30PM, 3:30PM</p>'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.899181, 39.227822]
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
      'circle-color': '#ccff33',
      'circle-radius': 4,
      'circle-stroke-width': 0,
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
map.on('load', () => {
  map.addSource('feasts', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Crown Stage</strong></p><br/><p style="text-align:center">Acrobatrix: 11:00AM, 12:15PM, 2:15PM, 4:00PM</p><p style="text-align:center">The Amazing Hypnotist: 1:15PM & 3:45PM'
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
              '<p style="text-align:center"><strong>Jousting Arena</strong></p><br/><p style="text-align:center">The Knights Of Noble Cause: 11:30AM, 1:30PM, 4:30PM</p><p style="text-align:center">Knightwings: 12:30PM'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.897194, 39.227797]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Castle Rose Stage</strong></p><br/><p style="text-align:center">Celtic Legacy: 12:30PM, 3:30PM</p><p style="text-align:center">The Reelin’ Rogues: 11:00AM & 2:00PM'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.900684, 39.228073]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Globe Stage</strong></p><br/><p style="text-align:center">Cy The Sword Swallower: 11:30AM, 4:30PM</p><p style="text-align:center">Dragonfire: 12:30PM<p style="text-align:center">The CRAIC Show: 1:30PM & 5:30PM'

          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.899238, 39.228043]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Celestial Stage</strong></p><br/><p style="text-align:center">Kamikaze Fireflies: 11:45AM, 1:45PM, 3:45PM, 5:45PM</p>'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.902504, 39.228826]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Fortune Stage</strong></p><br/><p style="text-align:center">London Broil: 12:00PM, 1:30PM, 4:00PM</p>'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.897878, 39.228162]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Pirate Ship Stage</strong></p><br/><p style="text-align:center">The Angels-Heroines In Disguise: 12:30PM & 2:30PM</p><p style="text-align:center">The Washing Well Wenches: 1:30PM, 3:30PM, 5:00PM'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.902390, 39.228091]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>Pirates Pub Stage</strong></p><br/><p style="text-align:center">The Crimson Pirates: 12:30PM & 2:30PM</p><p style="text-align:center">Music: The Gathering: 1:30PM, 3:30PM, 5:00PM'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.899970, 39.228121]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'description':
              '<p style="text-align:center"><strong>The Living Fountain</strong></p><br/><p style="text-align:center">Showtimes: 11:30AM, 1:30PM, 3:30PM</p>'
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-104.899181, 39.227822]
          }
        }
      ]
    }
  });
  // Add a layer showing the feasts.
  map.addLayer({
    'id': 'feasts',
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

  map.on('mouseenter', 'feasts', (e) => {
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
  'bottom-right'
);
// var directions = new MapboxDirections({
//   accessToken: process.env.VUE_APP_MAP_ACCESS_TOKEN,
//   unit: 'miles', // Use the metric system to display distances.
//   profile: 'mapbox/walking', // Set the initial profile to walking.
//   container: 'directions', // Specify an element thats not the map container.
//   //  controls: {instructions: false},
//   bearing: true,
//   steps: true,
//   controls: {
//     inputs: false,
//     instructions: true,
//     profileSwitcher: true
//   }
// });

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
