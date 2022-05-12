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
const map = new mapboxgl.Map({
  container: 'map',
  // Replace YOUR_STYLE_URL with your style URL.
  style: 'mapbox://styles/thedoctorq/cl33aff6x000014ql3a6a7tzx',
  center: [-104.900015, 39.228226],
  pitch: 50, // starting position [lng, lat]
  zoom: 17, // starting zoom

});
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
map.on('click', (event) => {
  // If the user clicked on one of your markers, get its information.
  const features = map.queryRenderedFeatures(event.point, {
    layers: ['test-for-coren-app'] // replace with your layer name
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];
  const popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
    )
    .addTo(map);
  // Code from the next step will go here.
});

// map.on('load', () => {
//   map.addSource('mapbox-terrain', {
//     type: 'vector',
//     // Use any Mapbox-hosted tileset using its tileset id.
//     // Learn more about where to find a tileset id:
//     // https://docs.mapbox.com/help/glossary/tileset-id/
//     url: 'mapbox://mapbox.mapbox-terrain-v2'
//   });
//   map.addLayer({
//     'id': 'terrain-data',
//     'type': 'line',
//     'source': 'mapbox-terrain',
//     'source-layer': 'contour',
//     'layout': {
//       'line-join': 'round',
//       'line-cap': 'round'
//     },
//     'paint': {
//       'line-color': '#ff69b4',
//       'line-width': 1
//     }
//   });
// });

</script>

<template>
  <div class="home">
    <h1>{{ message1 }}</h1>
    <h2>{{ message2 }}</h2>
  </div>
  <!-- <iframe width='100%' height='400px'
    src="https://api.mapbox.com/styles/v1/thedoctorq/cl33aff6x000014ql3a6a7tzx.html?title=false&access_token=pk.eyJ1IjoidGhlZG9jdG9ycSIsImEiOiJjbDJ4dGIzaHAwMmd3M2RrZTQ4endlNmF4In0.IMYB7JtIW7g2yKnryg9d4A&zoomwheel=false#14.44/39.22834/-104.89696"
    title="Basic" style="border:none;"></iframe> -->
</template>

<style>
/* #map {
  width: 100%;
  height: 500px;
} */

body {
  background-image: url("https://www.toptal.com/designers/subtlepatterns/uploads/dynamic-style.png'");
  background-color: #cccccc;
}
</style>

<!-- mapbox://styles/mapbox/streets-v11
mapbox://styles/mapbox/outdoors-v11
mapbox://styles/mapbox/light-v10
mapbox://styles/mapbox/satellite-v9 -->