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
mapboxgl.accessToken = 'pk.eyJ1IjoidGhlZG9jdG9ycSIsImEiOiJjbDJ4dGIzaHAwMmd3M2RrZTQ4endlNmF4In0.IMYB7JtIW7g2yKnryg9d4A';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: [-104.900015, 39.228226], // starting position [lng, lat]
  zoom: 17 // starting zoom
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
</style>