<template>
    <v-main>
        <Header/>
        <div class="profile_main">
            <h1>Profile (Click "Edit" to Modify)</h1>
            <hr>
            <div class="top">
                <v-layout wrap>
                    <v-flex>
                        <div class="left-questions">
                            <v-text-field class="text3" readonly background-color="white" filled color="black"
                                          label="Preferred Name" :value="name"></v-text-field>
                            <v-text-field class="text3" readonly background-color="white" filled color="black"
                                          label="Minor" :value="minor"></v-text-field>
                            <v-text-field class="text3" readonly background-color="white" filled color="black"
                                          label="GPA" :value="gpa"></v-text-field>
                        </div>
                    </v-flex>
                    <v-flex>
                        <div class="right-pref">
                            <v-text-field class="text" readonly background-color="white" filled color="black"
                                          label="Project/Team Preference" :value="preference"></v-text-field>
                        </div>
                    </v-flex>
                </v-layout>
            </div>
            <hr>
            <div class="bottom">
                <h2> Your Choices </h2>
                <div class="projects2">
                    <h3 class="h3_1"> Project Preferences </h3>
                    <v-text-field class="text" readonly background-color="white" filled color="black"
                                  label="First Preference" :value="getProj(this.firstProj)"></v-text-field>
                    <v-text-field class="text" readonly background-color="white" filled color="black"
                                  label="Second Preference" :value="getProj(this.secondProj)"></v-text-field>
                    <v-text-field class="text" readonly background-color="white" filled color="black"
                                  label="Third Preference" :value="getProj(this.thirdProj)"></v-text-field>
                </div>
                <div class="teams2">
                    <h3 class="h3_1"> Team Preferences </h3>
                    <v-select multiple label="Preferred Teammates" outlined background-color="white" readonly
                              :value="team_pref" :items=students item-text="name" item-value="id"
                              v-model="team_pref"></v-select>
                    <v-select multiple label="Avoided Teammates" outlined background-color="white" readonly
                              :value="team_avoid" :items=students item-text="name" item-value="id"
                              v-model="team_avoid"></v-select>
                </div>
            </div>
            <hr>
            <div class="bottom">
                <h2> Experience/Rationale: </h2>
                <div class="left-questions">
                    <v-textarea background-color="white" readonly filled color="black" label="Experience/Rationale"
                                :value="experience" class="mt-2"></v-textarea>
                </div>
            </div>
        </div>
    </v-main>
</template>

<script>

import Header from '@/components/HeaderStudent.vue'
import axios from 'axios'

export default {
    name: 'Home',
    components: {
        Header
    },
    data() {
        return {
            preference: "Doesn't Matter",
            projects: [],
            students: [],
            firstProj: "",
            secondProj: "",
            thirdProj: "",
            team_pref: [],
            team_avoid: [],
            valid: true,
            minor: "",
            gpa: "",
            experience: "",
            name: ""
        }
    },
    mounted() {
        let self=this;
        let id = 1
        const requestStud = axios.get(process.env.VUE_APP_BASE_API_URL + '/students/' + id, {withCredentials: true})
        const requestProj = axios.get(process.env.VUE_APP_BASE_API_URL + '/projects', {withCredentials: true})
        const requestPref = axios.get(process.env.VUE_APP_BASE_API_URL + '/prefer_teammate/' + id, {withCredentials: true})
        const requestAvoid = axios.get(process.env.VUE_APP_BASE_API_URL + '/avoid_teammate/' + id, {withCredentials: true})
        const requestStuds = axios.get(process.env.VUE_APP_BASE_API_URL + '/students/', {withCredentials: true})

        axios.all([requestStud, requestProj, requestPref, requestStuds, requestAvoid])
            .then(axios.spread((...responses) => {
                const responseStud = responses[0]
                const responseProj = responses[1]
                const responsePref = responses[2]
                const responseStuds = responses[3]
                const responseAvoid = responses[4]
                // use/access the results
                self.student = responseStud.data
                self.experience = self.student.experience
                self.gpa = self.student.gpa
                self.minor = self.student.minor
                self.name = self.student.username
                self.firstProj = self.student.first_project
                self.secondProj = self.student.second_project
                self.thirdProj = self.student.third_project
                self.preference = self.student.selection_preference
                if (self.preference === false)
                    self.preference = "Project"
                else if (self.preference === true)
                    self.preference = "Team"
                else self.preference = "Doesn't Matter"
                self.projects = responseProj.data
                //self.team_pref = responsePref.data
                self.students = responseStuds.data
                //self.team_avoid = responseAvoid.data
                for (let i of responsePref.data)
                    self.team_pref.push(i.preferreeId)
                for (let i of responseAvoid.data)
                    self.team_avoid.push(i.avoideeId)
            }))
            .catch(() => {
                self.$router.push({ name: "Error" })
            })
    },
    methods: {
        getProj: function(pid) {
            if (this.projects.find(function(id) {if (id.id === pid) return id}))
                return this.projects.find(function(id) {if (id.id === pid) return id}).name
            else return null;
        },
        getStud: function(pid) {
            if (this.students.find(function(id) {if (id.id === pid) return id}))
                return this.students.find(function(id) {if (id.id === pid) return id}).name
            else return null;
        }
    }
}
</script>

<style>
    body {
        font-family: sans-serif;
    }

    h5 {
        color: black;
    }

    h1 {
        margin-bottom: 0;
        color: black;
        font-weight: bold;
    }

    h2 {
        text-align: left;
        color: black;
        font-weight: bold;
    }

    h3 {
        text-align: left;
        color: black;
        font-weight: bold;
        margin-bottom: 12px;
    }

    p {
        text-align: left;
        color: black;
    }

    .profile_main {
        display: inline-block;
        border: 2px solid black;
        border-radius: 10px;
        text-align: center;
        background: #D3D3D3;
        margin: 0 35px 35px 35px;
    }

    .left-questions {
        float: left;
        width: 90%;
        display: inline-block;
        padding: 10px;
        margin: 10px;
    }

    .right-pref {
        float: right;
        width: 90%;
        display: inline-block;
        padding: 10px;
        margin: 10px;
    }

    .projects2 {
        width: 40%;
        display: inline-block;
        margin: 10px;
    }

    .bottom {
        margin: 10px;
    }

    .teams2 {
        width: 40%;
        float: right;
        display: inline-block;
        margin: 10px;
    }
</style>
