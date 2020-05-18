<template>
  <v-app>
    <v-app-bar
      app
      color="indigo darken-4"
      dark
    >
      <v-app-bar-title class="headline smetallic--text text-uppercase font-weight-light">Reconnect</v-app-bar-title>
      <v-spacer/>
      <v-btn flat to="/">Home</v-btn>
      <v-btn flat to="/about">About</v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
