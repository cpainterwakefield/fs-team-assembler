<template>
  <center>
    <v-btn class="primary" x-large color='primary' @click="doSubmit()" to="/login">Login</v-btn>
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