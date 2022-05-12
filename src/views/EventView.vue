
<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      message: "Welcome to the Events Page!",
      events: []
      // searchTerm: ""
    };
  },
  created: function () {
    console.log("in index")
    this.eventsIndex();
  },
  methods: {
    eventsIndex: function () {
      console.log('getting events')
      axios.get('/events.json').then(response => {
        console.log(response.data);
        this.events = response.data;
      })
    },
    // eventsFilter: function () {
    //   return this.events.filter(event => {
    //     var lowerTitle = Event.title.toLowerCase();
    //     var lowerSearchTerm = this.searchTerm.toLowerCase();
    //     return lowerTitle.includes(lowerSearchTerm);
    //   })
    // }
  },
};

</script>

<template>
  <div class="events">
    <h1>{{ message }}</h1>
    <!-- Search: <input type="text" v-model="lowerSearchTerm"> -->
    <div v-for="event in events" v-bind:key="event.id">
      <h2>{{ event.title }}</h2>
      {{ event.time }}
      <br />
      <a href="mapbox://"> {{ event.location }} </a><br />
      <img v-for=" image in event.images" v-bind:src="image.url" style="max-width: 85%">
      <br />
      <hr />
    </div>
  </div>
</template>

<style>
/* css selector */
body {
  font-family: Futura, Trebuchet MS, Arial, sans-serif;
  background-image: url('https://www.toptal.com/designers/subtlepatterns/uploads/dynamic-style.png')
}

img {
  width: 150px;
  height: 200px;
}

/* css property */
</style>