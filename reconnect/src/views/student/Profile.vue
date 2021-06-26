<template>
    <v-main>
        <Header/>
        <div class="centered">
            <v-card outlined width="90%" color="#CED5DD" class="pa-5">
                <div class="d-flex flex-row">
                    <div class="d-flex flex-column full">
                        <p class="text-h4">Profile</p>
                        <p class="text-h6">Click "Edit" to modify</p>
                    </div>
                </div>
                <div class="d-flex flex-row">
                    <div class="d-flex flex-column half mx-10">
                        <v-text-field readonly background-color="white" filled
                                      label="Preferred Name" :value="name"/>
                        <v-text-field readonly background-color="white" filled
                                      label="Minor" :value="minor"/>
                        <v-text-field readonly background-color="white" filled
                                      label="GPA" :value="gpa"/>
                    </div>
                    <div class="d-flex flex-column half mx-10">
                        <v-text-field readonly background-color="white" filled
                                      label="Project/Team Preference" :value="preference"/>
                    </div>
                </div>
                <div class="d-flex flex-row">
                    <div class="d-flex flex-column full">
                        <p class="text-h5">Your Choices</p>
                    </div>
                </div>
                <div class="d-flex flex-row">
                    <div class="d-flex flex-column half mx-10">
                        <p class="text-overline">Project Preferences</p>
                        <v-text-field readonly background-color="white" filled
                                      label="First Preference" :value="getProj(this.firstProj)"/>
                        <v-text-field readonly background-color="white" filled
                                      label="Second Preference" :value="getProj(this.secondProj)"/>
                        <v-text-field readonly background-color="white" filled
                                      label="Third Preference" :value="getProj(this.thirdProj)"/>
                    </div>
                    <div class="d-flex flex-column half mx-10">
                        <p class="text-overline">Team Preferences</p>
                        <v-textarea background-color="white" rows="3" readonly filled
                                    label="Preferred Teammates" v-model="team_pref_text"/>
                        <v-textarea background-color="white" rows="3" readonly filled
                                    label="Avoided Teammates" v-model="team_avoid_text"/>
                    </div>
                </div>
                <div class="d-flex flex-row">
                    <div class="d-flex flex-column full">
                        <p class="text-h5">Experience/Rationale</p>
                    </div>
                </div>
                <div class="d-flex flex-row">
                    <div class="d-flex flex-column full mx-10">
                        <v-textarea background-color="white" readonly filled label="Experience/Rationale"
                                    :value="experience" class="mt-2"/>
                    </div>
                </div>
            </v-card>
            <p/>
            <p/>
            <p/>
            <p/>
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
                team_pref_text: "",
                team_avoid_text: "",
                valid: true,
                minor: "",
                gpa: "",
                experience: "",
                name: ""
            }
        },
        mounted() {
            let self = this;
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
                    self.students = responseStuds.data
                    for (let x of responsePref.data) {
                        let s = self.students.find(el => el.id === x.preferreeId)
                        let n = s.name
                        self.team_pref_text = self.team_pref_text + n + ", "
                    }
                    if (self.team_pref_text.length > 0) {
                        self.team_pref_text = self.team_pref_text.slice(0, -2)
                    }
                    for (let x of responseAvoid.data) {
                        let s = self.students.find(el => el.id === x.avoideeId)
                        let n = s.name
                        self.team_avoid_text = self.team_avoid_text + n + ", "
                    }
                    if (self.team_avoid_text.length > 0) {
                        self.team_avoid_text = self.team_avoid_text.slice(0, -2)
                    }
                }))
                .catch(() => {
                    self.$router.push({name: "Error"})
                })
        },
        methods: {
            getProj: function (pid) {
                if (this.projects.find(function (id) {
                    if (id.id === pid) return id
                }))
                    return this.projects.find(function (id) {
                        if (id.id === pid) return id
                    }).name
                else return null;
            },
            getStud: function (pid) {
                if (this.students.find(function (id) {
                    if (id.id === pid) return id
                }))
                    return this.students.find(function (id) {
                        if (id.id === pid) return id
                    }).name
                else return null;
            }
        }
    }
</script>

<style>
</style>
