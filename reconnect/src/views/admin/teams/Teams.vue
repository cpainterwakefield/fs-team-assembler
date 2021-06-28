<template>
    <v-main>
        <Header/>
        <div class="centered mt-25">
            <div class="d-flex flex-row">
                <v-btn class="error" to="/admin/teams/edit">Edit</v-btn>
                <v-btn class="primary" @click="downloadItem">Export</v-btn>
                <v-btn class="primary" @click="runAlgorithm">RUN</v-btn>
            </div>
            <hr/>
            <div class="left-list">
                <h2 class="h2_2">Not yet assigned</h2>
                <div class="element1" v-for="(student, i) in students" :key="i">
                    <div v-if="student.project_id == null">&middot; {{student.name}}</div>
                </div>
            </div>
            <div class="right-list">
                <div class="proj1" v-for="project in projects" :key="project.id">
                    <h2 class="h2_2">{{project.name}} ({{project.min_students}}, {{project.max_students}})</h2>
                    <hr>
                    <div class="element1" v-for="(student, i) in students" :key="i">
                        <div v-if="student.project_id === project.id && isPairedWithAvoid(student)" class="unhappy">
                            &middot; {{student.name}}
                        </div>
                        <div v-else-if="student.project_id === project.id && isSatisfied(student)" class="satisfied">
                            &middot; {{student.name}}
                        </div>
                        <div v-else-if="student.project_id === project.id">&middot; {{student.name}}</div>
                    </div>
                </div>
            </div>
        </div>
    </v-main>
</template>

<script>

    import Header from '@/components/HeaderAdmin.vue'
    import axios from 'axios'

    export default {
        name: 'Teams',
        components: {
            Header,
        },
        data() {
            return {
                students: [],
                students_all: [],
                students_left: [],
                projects: [],
                models: [],
                avoids: [],
                prefers: []
            }
        },
        mounted() {
            var self = this;
            const requestStud = axios.get(process.env.VUE_APP_BASE_API_URL + '/students', {withCredentials: true});
            const requestProj = axios.get(process.env.VUE_APP_BASE_API_URL + '/projects', {withCredentials: true});
            const requestAvoids = axios.get(process.env.VUE_APP_BASE_API_URL + '/avoid_teammate', {withCredentials: true});
            const requestPrefers = axios.get(process.env.VUE_APP_BASE_API_URL + '/prefer_teammate', {withCredentials: true});

            axios.all([requestStud, requestProj, requestAvoids, requestPrefers])
                .then(axios.spread((...responses) => {
                    const responseStud = responses[0]
                    const responseProj = responses[1]
                    const responseAvoids = responses[2]
                    const responsePrefers = responses[3]

                    // use/access the results
                    self.students = responseStud.data
                    self.projects = responseProj.data
                    self.avoids = responseAvoids.data
                    self.prefers = responsePrefers.data
                }))
                .catch(() => {
                    self.$router.push({name: "Error"})
                })
        },

        methods: {
            downloadItem: function () {
                let html = "<table>\n"
                for (let proj of this.projects) {
                    html = html + "<tr>\n"
                    html = html + "\t<td>\n\t\t"
                    html = html + proj.client_company + "<br/>\n\t\t"
                    html = html + proj.name + "<br/>\n\t\t"
                    html = html + proj.client_name + "<br/>\n\t\t"
                    html = html + "<a href=\"mailto:" + proj.client_email + "\">"
                    html = html + proj.client_email
                    html = html + "</a>\n"
                    html = html + "\t</td>\n\t<td>"
                    for (let s of this.students) {
                        if (s.project_id === proj.id) {
                            html = html + "\n\t\t"
                            html = html + "<a href=\"mailto:" + s.email + "\">"
                            html = html + s.username
                            html = html + "</a><br/>"
                        }
                    }
                    html = html + "\n\t</td>\n\t<td>\n\t\tAdvisor:<br/>\n\t\t<br/>\n\t\t<!--<a href=\""
                    html = html + "FinalReport/" + proj.client_company + ".pdf"
                    html = html + "\">Final Report</a> -->\n\t</td>\n"
                    html = html + "</tr>\n"
                }
                html = html + "</table>"
                const blob = new Blob([html], {type: 'text/html'})
                const link = document.createElement('a')
                link.href = URL.createObjectURL(blob)
                link.download = 'export.html'
                link.click()
                URL.revokeObjectURL(link.href)
            },
            runAlgorithm: function () {
                document.body.style.cursor = "wait"

                axios.put(process.env.VUE_APP_BASE_API_URL + '/run', {withCredentials: true})
                    .then(response => {
                        alert("Genetic algorithm completed with a fitness score of " + response.data)
                    })
                    .catch(err => {
                        console.log(err)
                        alert("Something went wrong: " + err.toString())
                    })

                document.body.style.cursor = "default"
            },
            isPairedWithAvoid: function (student) {
                return this.avoids.some(avoid =>
                    student.id === avoid.studentId
                    && this.students.find(other => other.id === avoid.avoideeId).project_id === student.project_id
                )
            },
            isSatisfied: function (student) {
                if (student.selection_preference === false || student.selection_preference === null) {
                    if (student.project_id === student.first_project) return true;
                    if (student.project_id === student.second_project) return true;
                    if (student.project_id === student.third_project) return true;
                }
                if (student.selection_preference === true || student.selection_preference === null)
                    return this.prefers.some(prefer =>
                        student.id === prefer.studentId
                        && this.students.find(other => other.id === prefer.preferreeId).project_id === student.project_id
                    )
                return false;
            }
        }
    }

</script>

<style>

    .proj1 {
        display: inline-block;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-left: 3px;
        margin-right: 3px;
        border: 2px solid black;
        border-radius: 10px;
        padding: 10px;
        background: white;
        width: 18%;
        word-wrap: break-word;
        height: 200px;
        overflow: auto;
    }

    .element1 {
        margin: 2px;
        text-align: left;
        padding-left: 0px;
        padding-right: 0px;
    }

    .left-list {
        float: left;
        display: inline;
        border: 2px solid black;
        border-radius: 10px;
        background: white;
        width: 15%;
        margin: 15px;
    }

    .right-list {
        display: inline;
        float: right;
        margin: 15px;
        border: 2px solid black;
        border-radius: 10px;
        width: 80%;
    }

    .primary {
        margin: 15px;
    }

    .p1 {
        font-size: 12px;
        display: inline-block;
        width: 100%;
    }

    .h2_2 {
        font-size: 15px;
    }

    .satisfied {
        color: green;
    }

    .unhappy {
        color: red;
    }

</style>
