<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      message: "Welcome to the Events Page!",
      events: [],
      // searchTerm: ""
    };
  },
  created: function () {
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
  <div class="events-index">
    <h1>{{ message }}</h1>
    <template>
      <div class="events-index">
        <!-- Search: <input type="text" v-model="lowerSearchTerm"> -->
        <div v-for="event in events">
          <h1>{{ event.title }}</h1>
          {{ event.time }}
          <br />
          {{ event.location }}
          <br />
          <br />
          <hr />
        </div>
      </div>
    </template>
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