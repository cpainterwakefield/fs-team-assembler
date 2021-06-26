<template>
    <v-main>
        <Header/>
        <div class="centered">
            <v-card outlined width="90%" color="#CED5DD" class="pa-5">
                <v-form v-model="valid">
                    <div class="d-flex flex-row">
                        <div class="d-flex flex-column full">
                            <p class="text-h4">Edit Your Profile</p>
                        </div>
                    </div>
                    <div class="d-flex flex-row">
                        <div class="d-flex flex-column half mx-10">
                            <v-text-field v-model="username" background-color="white" outlined label="Preferred Name (Full)"></v-text-field>
                            <v-text-field v-model="minor" background-color="white" outlined label="Minor"></v-text-field>
                            <v-text-field v-model="gpa" :rules="[v => !!v || 'This is required', v => Number.isFinite(parseFloat(v)) || 'Must be a number']" required background-color="white" outlined label="GPA"></v-text-field>
                        </div>
                        <div class="d-flex flex-column half mx-10">
                            <v-radio-group class="radio-container" v-model="preference" label="I Prefer">
                                <v-radio name="selection_preference" label="Doesn't Matter" value="Doesn't Matter"></v-radio>
                                <v-radio name="selection_preference" label="My Chosen Projects" value="Project"></v-radio>
                                <v-radio name="selection_preference" label="My Chosen Teammates" value="Team"></v-radio>
                            </v-radio-group>
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
                                <v-select label="First Preference" outlined background-color="white" :items=projects item-text="name" item-value="id" v-model="firstProj"></v-select>
                                <v-select label="Second Preference" outlined background-color="white" :items=projects item-text="name" item-value="id" v-model="secondProj"></v-select>
                                <v-select label="Third Preference" outlined background-color="white" :items=projects item-text="name" item-value="id" v-model="thirdProj"></v-select>
                        </div>
                        <div class="d-flex flex-column half mx-10">
                            <p class="text-overline">Team Preferences</p>
                                <v-select multiple label="Prefer These Teammates" outlined background-color="white" :value="team_pref" :items=students item-text="name" item-value="id" v-model="team_pref"></v-select>
                                <v-select multiple label="Avoid These Teammates" outlined background-color="white" :value="team_avoid" :items=students item-text="name" item-value="id" v-model="team_avoid"></v-select>
                        </div>
                    </div>
                    <div class="d-flex flex-row">
                        <div class="d-flex flex-column full">
                            <p class="text-h5">Experience/Rationale</p>
                            <p class="text-subtitle-1">Enter any additional information that should be considered. (This is simply read by the course coordinator, not by clients or potential employers.)</p>
                        </div>
                    </div>
                    <div class="d-flex flex-row">
                        <div class="d-flex flex-column full mx-10">
                            <v-textarea background-color="white" outlined auto-grow v-model="experience" label="Experience/Rationale"></v-textarea>
                        </div>
                    </div>
                    <div class="centered">
                        <v-btn class="primary" :disabled="!valid" @click="doSubmit()">Submit</v-btn>
                    </div>
                </v-form>
            </v-card>
            <p/>
            <p/>
            <p/>
            <p/>
        </div>
        <v-snackbar v-model="error_snackbar" multi-line color="failure" timeout="6000" top>
            {{ error_message }}
            <v-btn color="red" text @click="error_snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
        <v-snackbar v-model="success_snackbar" color="success" timeout="3000" top>Profile saved.</v-snackbar>
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
                preference: null,
                projects: [],
                students: [],
                firstProj: null,
                secondProj: null,
                thirdProj: null,
                team_pref: [],
                team_avoid: [],
                valid: true,
                student: {},
                name: "",
                minor: "",
                gpa: null,
                experience: "",
                username: "",
                error_message: "",
                error_snackbar: false,
                success_snackbar: false
            }
        },
        mounted() {
            var self = this;
            let id = 1
            const requestStud = axios.get(process.env.VUE_APP_BASE_API_URL + '/students/' + id, {withCredentials: true})
            const requestProj = axios.get(process.env.VUE_APP_BASE_API_URL + '/projects', {withCredentials: true})
            const requestPref = axios.get(process.env.VUE_APP_BASE_API_URL + '/prefer_teammate/' + id, {withCredentials: true})
            const requestAvoid = axios.get(process.env.VUE_APP_BASE_API_URL + '/avoid_teammate/' + id, {withCredentials: true})
            const requestStuds = axios.get(process.env.VUE_APP_BASE_API_URL + '/students/', {withCredentials: true})

            axios.all([requestStud, requestProj, requestPref, requestStuds, requestAvoid]).then(axios.spread((...responses) => {
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
                self.name = self.student.name
                self.username = self.student.username ? self.student.username : self.student.name
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
                self.students = responseStuds.data.filter(el => el.id !== self.student.id)
                //self.team_avoid = responseAvoid.data
                for (let i of responsePref.data)
                    self.team_pref.push(i.preferreeId)
                for (let i of responseAvoid.data)
                    self.team_avoid.push(i.avoideeId)
            }))
                .catch(() => {
                    self.$router.push({name: "Error"})
                })
        },

        methods: {
            doSubmit: async function () {
                let id = 1

                if (this.preference === "Project")
                    this.preference = false;
                else if (this.preference === "Team")
                    this.preference = true;
                else this.preference = null;

                document.body.style.cursor = "wait"

                try {
                    await axios.put(process.env.VUE_APP_BASE_API_URL + '/students/' + id, {
                        name: this.name,
                        minor: this.minor,
                        gpa: this.gpa,
                        username: this.username,
                        experience: this.experience,
                        first_project: this.firstProj,
                        second_project: this.secondProj,
                        third_project: this.thirdProj,
                        selection_preference: this.preference })
                    await axios.delete(process.env.VUE_APP_BASE_API_URL + '/prefer_teammate/' + id, {withCredentials: true})
                    for (let pref of this.team_pref) {
                        await axios.post(process.env.VUE_APP_BASE_API_URL + '/prefer_teammate', {
                            preferrer_id: parseInt(id),
                            preferree_id: parseInt(pref)
                        }, {withCredentials: true})

                    }
                    await axios.delete(process.env.VUE_APP_BASE_API_URL + '/avoid_teammate/' + id, {withCredentials: true})
                    for (let avoid of this.team_avoid) {
                        await axios.post(process.env.VUE_APP_BASE_API_URL + '/avoid_teammate', {
                            avoider_id: parseInt(id),
                            avoidee_id: parseInt(avoid)
                        }, {withCredentials: true})
                    }
                    this.success_snackbar = true
                } catch (e) {
                    this.error_message = "An error occurred while saving."
                    this.error_snackbar = true
                } finally {
                    if (this.preference === false)
                        this.preference = "Project"
                    else if (this.preference === true)
                        this.preference = "Team"
                    else this.preference = "Doesn't Matter"

                    document.body.style.cursor = "default"
                }
            }
        }
    }
</script>

<style>
</style>
