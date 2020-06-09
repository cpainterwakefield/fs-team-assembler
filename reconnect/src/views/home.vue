<template>
  <center>
    <div>
      <h3> Welcome to CS@Mines Reconnect! This website asks you and your classmates for preferences about what team you want to work on, then sorts everyone into teams based on who you want to work with, who you want to avoid working with, whether you'd rather work with teammates or on
a particular project, and, of course, the projects that you would like to work on.</h3>
      <hr>
      <span> This website uses cookies for the purpose of user authentication and authorization. By clicking continue below, you consent to our use of cookies for this purpose.</span>
    </div>
    <v-btn class="primary" x-large color='primary' href="/login">Continue</v-btn>
  </center>
</template>

<script>

import axios from 'axios'

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
