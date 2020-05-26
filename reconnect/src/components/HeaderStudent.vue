<template>
  <v-app-bar app color="indigo darken-4" dark class=my-tb>
    <v-app-bar-title class="headline smetallic--text text-uppercase font-weight-light">Reconnect</v-app-bar-title>
    <v-spacer/>
    <v-btn class="btn1" flat to="/student/">Profile</v-btn>
    <v-btn class="btn1" flat to="/student/edit">Edit</v-btn>
    <v-btn class="btn1" flat href="http://cs-courses.mines.edu/csci370/FS2020S/ProjectList2020S.html" target="_blank">Projects</v-btn>
    <v-btn class="btn1" flat>Logout</v-btn>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'Header'
  }
</script>
