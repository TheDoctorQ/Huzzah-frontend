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

<div id="map"></div>
mapboxgl.accessToken = process.env.VUE_APP_MAP_ACCESS_TOKEN;
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/satellite-streets-v11', // style URL
  center: [-104.900015, 39.228226],
  pitch: 50, // starting position [lng, lat]
  zoom: 17 // starting zoom
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
</style>

<!-- mapbox://styles/mapbox/streets-v11
mapbox://styles/mapbox/outdoors-v11
mapbox://styles/mapbox/light-v10
mapbox://styles/mapbox/satellite-v9 -->