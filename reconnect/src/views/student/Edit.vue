<template>
    <v-main>
        <Header> </Header>
        <div class="edit_main">
            <h1>Edit Your Profile </h1>
            <hr>
            <v-form v-model="valid">
                <div class="top">
                    <v-layout wrap>
                        <v-flex>
                            <div class="left-questions">
                                <v-text-field class="text" v-model="username" background-color="white" outlined label="Preferred Name (Full)"></v-text-field>
                                <v-text-field class="text" v-model="minor" background-color="white" outlined label="Minor"></v-text-field>
                                <v-text-field class="text" v-model="gpa" :rules="[v => !!v || 'This is required', v => Number.isFinite(parseFloat(v)) || 'Must be a number']" required background-color="white" outlined label="GPA"></v-text-field>
                            </div>
                        </v-flex>
                        <v-flex>
                            <div class="right-pref">
                                <v-radio-group v-model="preference" label="I Prefer" >
                                    <v-radio name="selection_preference" label="Doesn't Matter" value="Doesn't Matter"></v-radio>
                                    <v-radio name="selection_preference" label="My Chosen Projects" value="Project"></v-radio>
                                    <v-radio name="selection_preference" label="My Chosen Teammates" value="Team"></v-radio>
                                </v-radio-group>
                            </div>
                        </v-flex>
                    </v-layout>
                </div>
                <hr>
                <div class="bottom">
                    <h2> Your Choices </h2>
                    <div class="project_pref ma-10">
                        <h3> Project Preferences </h3>
                        <v-select class="sel1" label="First Preference" outlined background-color="white" :items=projects item-text="name" item-value="id" v-model="firstProj"></v-select>
                        <v-select class="sel1" label="Second Preference" outlined background-color="white" :items=projects item-text="name" item-value="id" v-model="secondProj"></v-select>
                        <v-select class="sel1" label="Third Preference" outlined background-color="white" :items=projects item-text="name" item-value="id" v-model="thirdProj"></v-select>
                    </div>
                    <div class="teammate_pref ma-10">
                        <h3> Team Preferences </h3>
                        <v-select width=50px multiple label="Prefer Teammates" outlined background-color="white" :value="team_pref" :items=students item-text="name" item-value="id" v-model="team_pref"></v-select>
                        <v-select width=50px multiple label="Avoid Teammates" outlined background-color="white" :value="team_avoid" :items=students item-text="name" item-value="id" v-model="team_avoid"></v-select>
                    </div>
                </div>
                <hr>
                <div class="bottom">
                    <h2> Experience/Rationale: </h2>
                    <p><b> Enter any additional information that should be considered. </b></p>
                    <p> Note: This is simply read by an advisor, not by clients or potential employers. </p>
                    <v-textarea background-color="white" outlined auto-grow v-model="experience" label="Experience/Rationale"></v-textarea>
                </div>
                <v-btn class="primary" :disabled="!valid" @click="doSubmit()">Submit</v-btn>
            </v-form>
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
                self.students = responseStuds.data
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

<style type="text/css">
    body { font-family: sans-serif; }

    h1 {
        font-family: serif;
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
    }

    p {
        text-align: left;
        color: black;
    }

    center {
        padding: 25px;
    }

    .sel1 {
        width: 520px;
    }

    .edit_main {
        width: 90%;
        border: 2px solid black;
        border-radius: 10px;
        text-align: center;
        background: #D3D3D3;
        margin: 35px;
        height: 100%;
        overflow: visible;
    }

    .left-questions {
        max-width: 90%;
        display: inline-block;
        padding: 10px;
        margin: 10px;
    }

    .right-pref {
        max-width: 90%;
        display: inline-block;
        padding: 10px;
        margin: 10px;
    }

    .project_pref {
        width: 40%;
        display: inline-block;
    }

    .bottom {
        margin: 10px;
        width: 90%;
    }

    .teammate_pref {
        display: inline-block;
        float: right;
        width: 40%;
    }

    .spinner {
        position: sticky;
        top: 150px;
        text-align: center;
    }
</style>
