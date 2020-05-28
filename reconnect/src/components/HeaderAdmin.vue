<template>
  <v-app-bar app color="indigo darken-4" dark class=my-tb>
    <v-app-bar-title class="headline smetallic--text text-uppercase font-weight-light">Reconnect</v-app-bar-title>
    <v-spacer/>
    <v-btn class="btn1" flat to="/admin/">Students</v-btn>
    <v-btn class="btn1" flat to="/admin/projects">Projects</v-btn>
    <v-btn class="btn1" flat to="/admin/edit">Edit</v-btn>
    <v-btn class="btn1" flat to="/admin/teams">Teams</v-btn>
    <v-btn class="btn1" flat>Logout</v-btn>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'Header'
  }
</script>
