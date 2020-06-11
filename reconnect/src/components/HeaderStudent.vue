<template>
  <v-app-bar app color="indigo darken-4" dark class=my-tb>
    <span class="headline smetallic--text text-uppercase font-weight-light">Reconnect</span>
    <v-spacer/>
    <v-btn class="btn1" to="/student/">Profile</v-btn>
    <v-btn class="btn1" to="/student/edit">Edit</v-btn>
    <v-btn class="btn1" :href=projLink.link target="_blank" >Projects</v-btn>
    <v-btn class="btn1" :href=authLink target="_blank">Logout</v-btn>
  </v-app-bar>
</template>

<script>

import axios from 'axios'
  export default {
    name: 'Header',
    data() {
      return {
        projLink: "",
        authLink: "https://reconnect.mines.edu/logout"
      }
    },
    mounted() {
      var self = this
      axios.get(process.env.VUE_APP_BASE_API_URL + '/project_link/1', {withCredentials: true})
      .then(response => {
        console.log(response)
        // JSON responses are automatically parsed.
        self.projLink = response.data

      })
      .catch(e => {
        self.errors.push(e)
      })

    }
  }
</script>
