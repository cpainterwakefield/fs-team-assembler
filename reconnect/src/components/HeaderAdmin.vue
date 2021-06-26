<template>
  <v-app-bar app color="#263F6A" dark>
    <span class="headline text-uppercase font-weight-light">Reconnect</span>
    <v-spacer/>
    <v-btn class="btn1" to="/admin/">Students</v-btn>
    <v-btn class="btn1" to="/admin/projects">Projects</v-btn>
    <v-btn class="btn1" to="/admin/edit">Edit</v-btn>
    <v-btn class="btn1" to="/admin/teams">Teams</v-btn>
    <v-btn class="btn1" :href=authLink target="_blank">Logout</v-btn>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        authLink: "https://reconnect.mines.edu/logout"
      }
    }
  }
</script>
