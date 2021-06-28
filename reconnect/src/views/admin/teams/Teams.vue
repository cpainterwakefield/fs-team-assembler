<template>
    <v-main>
        <Header/>
        <div class="centered mt-25">
            <div class="d-flex flex-row align-center">
                <v-btn class="error" to="/admin/teams/edit">Edit Teams</v-btn>
                <v-btn class="primary" @click="downloadItem">Export</v-btn>
                <v-btn class="primary" @click="runAlgorithm">RUN</v-btn>
            </div>
            <div class="d-flex flex-row">
                <v-card width="15%" class="ma-5 pa-3">
                    <v-card-text>
                        <p class="text-subtitle-2">Not yet assigned</p>
                        <div v-for="student in unassigned_students" :key="'student_' + student.id">
                            &middot; {{ student.name }}
                        </div>
                    </v-card-text>
                </v-card>
                <v-card outlined width="85%" color="#CED5DD" class="ma-5 pa-3">
                    <div class="d-flex flex-row flex-wrap justify-lg-space-around">
                        <v-card width="15%" class="ma-2 pa-0" v-for="project in projects" :key="'project_' + project.id">
                            <v-card-text>
                                <p class="text-subtitle-2">
                                    {{ project.name }} ({{ project.min_students }}, {{ project.max_students }})
                                </p>
                                <hr/>
                                <div
                                    v-for="student in students.filter(e => e.project_id === project.id)"
                                    :key="'student_' + student.id"
                                >
                                    <div v-if="isPairedWithAvoid(student)" class="unhappy">
                                        &middot; {{ student.name }}
                                    </div>
                                    <div v-else-if="isSatisfied(student)" class="satisfied">
                                        &middot; {{ student.name }}
                                    </div>
                                    <div v-else>&middot; {{ student.name }}</div>
                                </div>
                            </v-card-text>
                        </v-card>
                    </div>
                </v-card>
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
        computed: {
            unassigned_students: function () {
                return this.students.filter(el => el.project_id === null)
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
    .satisfied {
        color: green;
    }

    .unhappy {
        color: red;
    }
</style>
