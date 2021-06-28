<template>
    <v-main>
        <Header/>
        <v-snackbar v-model="error_snackbar" multi-line color="failure" timeout="6000" top>
            {{ error_message }}
            <v-btn color="red" text @click="error_snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
        <v-snackbar v-model="success_snackbar" color="success" timeout="3000" top>Changes saved.</v-snackbar>
        <div class="container">
            <div class="centered full-height justify-space-around">
                <v-btn class="primary" @click="doSubmit()">Save Changes</v-btn>
                <div class="d-flex flex-column flex-grow-1 full-width full-height">
                    <div class="d-flex flex-row full-height full-width justify-lg-space-around">
                        <div class="d-flex flex-column left-pane vscroll">
                            <div class="centered">
                                <v-card width="95%" class="my-5 pa-3">
                                    <v-card-text>
                                        <p class="text-subtitle-2">Unassigned</p>
                                        <draggable group="projects" :list="nullStuds">
                                            <div
                                                 v-for="student in nullStuds" :key="'student_' + student.id"
                                                 v-on:click="setStudentInfo(student)"
                                            >
                                                <v-icon>mdi-drag</v-icon>
                                                <span class="p2">{{student.name}}</span>
                                            </div>
                                        </draggable>
                                    </v-card-text>
                                </v-card>
                                <v-card width="95%" class="my-5 pa-3">
                                    <v-card-text>
                                        <p class="text-subtitle-2">Student Info</p>
                                        <p class="text-subtitle-2">(Click on student to see their preferences)</p>
                                        <hr/>
                                        <div class="text-subtitle-2">{{ selectedStudentInfo.name }}</div>
                                        <div class="text-subtitle-2">Minor: {{ selectedStudentInfo.minor }}</div>
                                        <div class="text-subtitle-2">GPA: {{ selectedStudentInfo.gpa }}</div>
                                        <div class="text-subtitle-2">Prefers: {{ selectedStudentInfo.selection }}</div>
                                        <div class="text-subtitle-2">Projects:</div>
                                        <ol>
                                            <li v-for="p in selectedStudentInfo.projects" :key="p">{{ p }}</li>
                                        </ol>
                                        <div class="text-subtitle-2">Preferred teammates:</div>
                                        <ul>
                                            <li v-for="s in selectedStudentInfo.teammates" :key="s">{{ s }}</li>
                                        </ul>
                                        <div class="text-subtitle-2">Avoid:</div>
                                        <ul>
                                            <li v-for="s in selectedStudentInfo.avoids" :key="s">{{ s }}</li>
                                        </ul>
                                        <div class="text-subtitle-2">Notes:</div>
                                        <span>{{ selectedStudentInfo.experience }}</span>
                                    </v-card-text>
                                </v-card>
                            </div>
                        </div>
                        <div class="d-flex flex-column right-pane vscroll">
                            <v-card class="ma-5 pa-3" color="#CED5DD">
                                <v-card-text>
                                    <div class="d-flex flex-row flex-wrap justify-lg-space-around">
                                        <v-card width="15%"
                                                class="ma-2 pa-0"
                                                v-for="model in models"
                                                :key="'project_' + model.project.id"
                                        >
                                            <v-card-text>
                                                <p class="text-subtitle-2">
                                                    {{ model.project.name }}
                                                    ({{ model.project.min_students }}, {{ model.project.max_students }})
                                                </p>
                                                <hr/>
                                                <draggable :list="model.students" group="projects">
                                                    <div
                                                            v-for="student in model.students"
                                                            :key="'student_' + student.id"
                                                            v-on:click="setStudentInfo(student)"
                                                    >
                                                        <v-icon>mdi-drag</v-icon>
                                                        <span v-if="isPairedWithAvoid(student, model)"
                                                              class="p2 unhappy">{{student.name}}</span>
                                                        <span v-else-if="isSatisfied(student, model)"
                                                              class="p2 satisfied">{{student.name}}</span>
                                                        <span v-else class="p2">{{student.name}}</span>
                                                    </div>
                                                </draggable>
                                            </v-card-text>
                                        </v-card>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </v-main>
</template>

<script>

    import Header from '@/components/HeaderAdmin.vue'
    import draggable from 'vuedraggable'
    import axios from 'axios'

    export default {
        name: 'Profile',
        components: {
            Header,
            draggable
        },
        data() {
            return {
                students: [],
                studentsDetail: {},
                projects: [],
                projectsModel: [],
                nullStuds: [],
                models: [],
                show: true,
                avoids: [],
                prefers: [],
                selectedStudentInfo: {},
                error_message: "",
                error_snackbar: false,
                success_snackbar: false
            }
        },
        mounted() {
            let self = this;
            const requestStud = axios.get(process.env.VUE_APP_BASE_API_URL + '/students', {withCredentials: true});
            const requestProj = axios.get(process.env.VUE_APP_BASE_API_URL + '/projects', {withCredentials: true});
            const requestAvoids = axios.get(process.env.VUE_APP_BASE_API_URL + '/avoid_teammate', {withCredentials: true});
            const requestPrefers = axios.get(process.env.VUE_APP_BASE_API_URL + '/prefer_teammate', {withCredentials: true});

            axios.all([requestStud, requestProj, requestAvoids, requestPrefers]).then(axios.spread((...responses) => {
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
                .then(() => {
                    for (let st of this.students) {
                        if (st.project_id === null)
                            this.nullStuds.push(st)
                    }
                    for (let pr of this.projects) {
                        let studList = [];
                        for (let st of this.students) {
                            if (st.project_id === pr.id)
                                studList.push(st)
                        }
                        this.models.push({project: pr, students: studList})
                    }
                    for (let st of this.students) {
                        let detail = {}
                        detail.projects = []
                        let p = this.projects.find(p => p.id === st.first_project)
                        if (p) detail.projects.push(p.name)
                        p = this.projects.find(p => p.id === st.second_project)
                        if (p) detail.projects.push(p.name)
                        p = this.projects.find(p => p.id === st.third_project)
                        if (p) detail.projects.push(p.name)

                        detail.teammates = []
                        for (let pref of this.prefers) {
                            if (pref.studentId === st.id) {
                                let s = this.students.find(s => s.id === pref.preferreeId)
                                detail.teammates.push(s.name)
                            }
                        }

                        detail.avoids = []
                        for (let avoid of this.avoids) {
                            if (avoid.studentId === st.id) {
                                let s = this.students.find(s => s.id === avoid.avoideeId)
                                detail.avoids.push(s.name)
                            }
                        }

                        detail.selection = 'No preference'
                        if (st.selection_preference === true) detail.selection = 'Team'
                        if (st.selection_preference === false) detail.selection = 'Project'

                        detail.name = st.name
                        detail.minor = st.minor
                        detail.gpa = st.gpa
                        detail.experience = st.experience

                        this.studentsDetail[st.id] = detail
                    }
                })
                .catch(e => {
                    // react on errors.
                    self.errors.push(e)
                })
        },
        methods: {
            doSubmit: async function () {
                document.body.style.cursor = "wait"

                try {
                    for (let pr of this.models) {
                        for (let st of pr.students) {
                            st.project_id = pr.project.id
                            await axios.put(process.env.VUE_APP_BASE_API_URL + '/students/id/' + st.id, {
                                project_id: st.project_id,
                                withCredentials: true
                            })
                        }
                    }
                    for (let st of this.nullStuds) {
                        st.project_id = null
                        await axios.put(process.env.VUE_APP_BASE_API_URL + '/students/id/' + st.id, {
                            project_id: st.project_id,
                            withCredentials: true
                        })
                    }
                    this.success_snackbar = true
                }
                catch (e) {
                    this.error_message = "An error occurred while saving."
                    this.error_snackbar = true
                } finally {
                    document.body.style.cursor = "default"
                }
            },
            isPairedWithAvoid: function (student, model) {
                return this.avoids.some(avoid =>
                    student.id === avoid.studentId
                    && model.students.find(other => other.id === avoid.avoideeId)
                )
            },
            isSatisfied: function (student, model) {
                if (student.selection_preference === false || student.selection_preference === null) {
                    if (model.project.id === student.first_project) return true
                    if (model.project.id === student.second_project) return true
                    if (model.project.id === student.third_project) return true
                }
                if (student.selection_preference === true || student.selection_preference === null)
                    return this.prefers.some(prefer =>
                        student.id === prefer.studentId
                        && model.students.find(other => other.id === prefer.preferreeId)
                    )
                return false
            },
            setStudentInfo: function (student) {
                this.selectedStudentInfo = this.studentsDetail[student.id]
            }
        },
    }
</script>

<style>
    .container {
        position: fixed;
        top: 110px;
        bottom: 80px;
        left: 0;
        right: 0;
    }

    .full-height {
        height: 100%;
    }

    .full-width {
        width: 100%;
    }

    .left-pane {
        width: 18%;
    }

    .right-pane {
        width: 80%;
    }

    .vscroll {
        height: 100%;
        overflow: auto;
    }

    .satisfied {
        color: green;
    }

    .unhappy {
        color: red;
    }
</style>
