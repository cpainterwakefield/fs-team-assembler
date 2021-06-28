<template>
    <v-app-bar app color="#263F6A" dark>
        <span class="headline text-uppercase font-weight-light">Reconnect</span>
        <v-spacer/>
        <v-btn class="btn1" to="/student/profile">Profile</v-btn>
        <v-btn class="btn1" to="/student/edit">Edit</v-btn>
        <v-btn class="btn1" :href=projLink.link target="_blank">Projects</v-btn>
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
                    self.projLink = response.data
                })
                .catch(() => {
                    self.$router.push({name: "Error"})
                })
        }
    }
</script>
