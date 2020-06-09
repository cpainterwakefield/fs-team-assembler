<template>
  <center>
    <v-btn x-large color='primary' to="/login">Login</v-btn>
  </center>
</template>

<script>

import axios from 'axios'
//const neatCsv = require('neat-csv');
//const fs = require('fs');

export default {
  name: 'Profile',
  methods: {

    doLogin: function() {
      axios.get('/login');
     
    }
  }
  }
</script>


<style>
</style>