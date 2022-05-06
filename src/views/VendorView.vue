<script>import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to the Events Page!",
      events: []
    };
  },
  created: function () {
    this.indexEvents();
  },
  methods: {
    indexEvents: function () {
      axios.get('/events.json')
        .then(response => {
          console.log(response.data);
          this.events = response.data;
        })
    }
  },
};
</script>

<template>
  <div class="events-index">
    <h1>{{ message }}</h1>
    <template>
      <div class="events-index">
        Search: <input type="text" v-model="lowerSearchTerm">
        <div v-for="product in events">
          <h1>{{ product.name }}</h1>
          {{ product.price }}
          <br />
          {{ product.description }}
          <br />
          <br />
          <hr />
        </div>
      </div>
    </template>

    <router-link to="/events/new">Add a New Product</router-link>
    <div v-for="product in events">
      <!-- <img v-bind:src="product.images[0].url" style="max-width: 85%"> -->
      <h3>{{ product.name }}</h3>
      <p>${{ product.price }}</p>
      <router-link v-bind:to="`/events/${product.id}`">More Info</router-link>
      <hr>
    </div>

  </div>
</template>

<style>
</style>