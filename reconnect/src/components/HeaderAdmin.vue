<template>
  <v-app-bar app color="indigo darken-4" dark class=my-tb>
    <span class="headline smetallic--text text-uppercase font-weight-light">Reconnect</span>
    <v-spacer/>
    <v-btn class="btn1" to="/admin/">Students</v-btn>
    <v-btn class="btn1" to="/admin/projects">Projects</v-btn>
    <v-btn class="btn1" to="/admin/edit">Edit</v-btn>
    <v-btn class="btn1" to="/admin/teams">Teams</v-btn>
    <v-btn class="btn1" >Logout</v-btn>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'Header'
  }
</script>
