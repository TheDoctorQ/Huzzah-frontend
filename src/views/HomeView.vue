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
  style: 'mapbox://styles/thedoctorq/cl37o8i0x000416mym52v21zy',
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
    layers: ['coren-events', 'coren-feasts', 'coren-vendors', 'coren-info']
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

body {
  background-image: url("https://www.toptal.com/designers/subtlepatterns/uploads/dynamic-style.png'");
  background-color: #cccccc;
}
</style>
