<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      message: "Welcome to the Feasts Page!",
      feasts: []
      // searchTerm: ""
    };
  },
  created: function () {
    console.log("in feasts index")
    this.feastsIndex();
  },
  methods: {
    feastsIndex: function () {
      console.log('getting feasts')
      axios.get('/feasts.json').then(response => {
        console.log(response.data);
        this.feasts = response.data;
      })
    },
    // feastsFilter: function () {
    //   return this.feasts.filter(feast => {
    //     var lowerTitle = feast.title.toLowerCase();
    //     var lowerSearchTerm = this.searchTerm.toLowerCase();
    //     return lowerTitle.includes(lowerSearchTerm);
    //   })
    // }
  },
};
</script>

<template>
  <div class="feasts">
    <h1>{{ message }}</h1>
    <!-- Search: <input type="text" v-model="lowerSearchTerm"> -->
    <div v-for="feast in feasts" v-bind:key="feast.id">
      <h2>{{ feast.name }}</h2>
      What you can enjoy there: {{ feast.variety }}
      <br />
      <br />
      Location: {{ feast.location }}
      <br />
      <img v-for="image in feast.images" v-bind:src="image.url" style="max-width: 85%">
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