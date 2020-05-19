<template>
  <v-app>
    <v-app-bar app color="indigo darken-4" dark class=my-tb>
      <v-app-bar-title class="headline smetallic--text text-uppercase font-weight-light">Reconnect</v-app-bar-title>
      <v-spacer/>
      <v-btn flat padding=1 to="/student/">Profile</v-btn>
      <v-btn flat padding=1 to="/student/edit">Edit</v-btn>
      <v-btn flat to="/student/info">Info</v-btn> 
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
