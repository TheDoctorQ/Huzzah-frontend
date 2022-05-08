<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      message: "Welcome to the Vendors Page!",
      vendors: []
      // searchTerm: ""
    };
  },
  created: function () {
    console.log("in vendors index")
    this.vendorsIndex();
  },
  methods: {
    vendorsIndex: function () {
      console.log('getting vendors')
      axios.get('/vendors.json').then(response => {
        console.log(response.data);
        this.vendors = response.data;
      })
    },
    // vendorsFilter: function () {
    //   return this.vendors.filter(vendor => {
    //     var lowerTitle = vendor.title.toLowerCase();
    //     var lowerSearchTerm = this.searchTerm.toLowerCase();
    //     return lowerTitle.includes(lowerSearchTerm);
    //   })
    // }
  },
};
</script>
<template>
  <div class="vendors">
    <h1>{{ message }}</h1>
    <!-- Search: <input type="text" v-model="lowerSearchTerm"> -->
    <div v-for="vendor in vendors" v-bind:key="vendor.id">
      <h2>{{ vendor.name }}</h2>
      {{ vendor.variety }}
      <br />
      {{ vendor.location }}
      <br />
      <img v-for="image in vendor.images" v-bind:src="image.url" style="max-width: 85%">
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