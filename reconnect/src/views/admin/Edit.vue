<template>
    <v-main>
        <Header/>
        <v-snackbar v-model="error_snackbar" multi-line color="failure" timeout="6000" top>
            {{ error_message }}
            <v-btn color="red" text @click="error_snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
        <v-snackbar v-model="success_snackbar" color="success" timeout="3000" top>{{ success_message }}</v-snackbar>

        <div class="centered">
            <v-card color="#CED5DD" width="98%" class="ma-5">
                <v-card-text>
                    <p class="text-h4 text-center">Add Student(s)/Project(s)</p>
                    <div class="d-flex flex-row justify-space-around">
                        <div class="d-flex flex-column">
                            <v-card class="pa-5 ma-10">
                                <v-card-text>
                                    <p class="text-subtitle-2">Upload a .csv file, each line formatted as follows:
                                        student name, student email
                                        (@mines.edu, not @mymail.mines.edu, see example for required headers)</p>
                                    <v-form ref="upload_students_form">
                                        <v-file-input label="Add Students (CSV)" outlined accept=".csv"
                                                      background-color="white" v-model="studentsFile"></v-file-input>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="primary" @click="submitStudentFile">Submit</v-btn>
                                    <v-btn color="green" @click="downloadStudExample">Example</v-btn>
                                </v-card-actions>
                            </v-card>
                        </div>
                        <div class="d-flex flex-column">
                            <v-card class="pa-5 ma-10">

                                <v-card-text>
                                    <p class="text-subtitle-2">Upload a .csv file, each line formatted as follows:
                                        company name, contact name, contact
                                        email, project name, min students, max students (see example for required
                                        headers)</p>
                                    <v-form ref="upload_projects_form">
                                        <v-file-input label="Add Projects (CSV)" outlined accept=".csv"
                                                  background-color="white" v-model="projectsFile"></v-file-input>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="primary" @click="submitProjectFile">Submit</v-btn>
                                    <v-btn color="green" @click="downloadProjExample">Example</v-btn>
                                </v-card-actions>
                            </v-card>
                        </div>
                    </div>
                </v-card-text>
            </v-card>

            <v-card color="#CED5DD" width="98%" class="ma-5">
                <v-card-text>
                    <p class="text-h4 text-center">Add Single Student/Project</p>
                    <div class="d-flex flex-row justify-space-around">
                        <div class="d-flex flex-column flex-grow-1">
                            <v-card class="pa-5 ma-10">
                                <v-card-text>
                                    <p class="text-h5">Add Student (use @mines.edu, not @mymail.mines.edu)</p>
                                    <v-form ref="add_student_form" v-model="valid0">
                                        <div class="d-flex flex-row wrap">
                                            <v-text-field label="Name" :rules="[v => !!v || 'This is required']"
                                                          required
                                                          outlined background-color="white"
                                                          v-model="studName" class="ma-3"/>
                                            <v-text-field label="Email" :rules="[v => !!v || 'This is required']"
                                                          required
                                                          outlined background-color="white"
                                                          v-model="studEmail" class="ma-3"/>
                                        </div>

                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="primary" :disabled="!valid0" @click="newStudent()">Submit</v-btn>
                                </v-card-actions>
                            </v-card>
                        </div>
                        <div class="d-flex flex-column flex-grow-1">
                            <v-card class="pa-5 ma-10">
                                <v-card-text>
                                    <p class="text-h5">Add Project</p>
                                    <v-form ref="add_project_form" v-model="valid1">
                                        <div class="d-flex flex-row wrap">
                                            <v-text-field class="ma-3" label="Company Name"
                                                          :rules="[v => !!v || 'This is required']" required outlined
                                                          background-color="white" v-model="compName"/>
                                        </div>
                                        <div class="d-flex flex-row wrap">
                                            <v-text-field class="ma-3" label="Contact Name"
                                                          :rules="[v => !!v || 'This is required']" required outlined
                                                          background-color="white" v-model="compContName"/>
                                            <v-text-field class="ma-3" label="Contact Email"
                                                          :rules="[v => !!v || 'This is required']" required outlined
                                                          background-color="white" v-model="compContEmail"/>
                                        </div>
                                        <div class="d-flex flex-row wrap">

                                            <v-text-field class="ma-3" label="Project Name"
                                                          :rules="[v => !!v || 'This is required']" required outlined
                                                          background-color="white" v-model="compProj"/>
                                        </div>
                                        <div class="d-flex flex-row wrap">

                                            <v-text-field class="ma-3" label="Min Students"
                                                          :rules="[v => !!v || 'This is required']" required outlined
                                                          background-color="white" v-model="projMin"
                                                          type="number"/>
                                            <v-text-field class="ma-3" label="Max Students"
                                                          :rules="[v => !!v || 'This is required']" required outlined
                                                          background-color="white" v-model="projMax"
                                                          type="number"/>

                                        </div>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="primary" :disabled="!valid1" @click="newProj()">Submit</v-btn>
                                </v-card-actions>
                            </v-card>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
            <v-card color="#CED5DD" width="98%" class="ma-5">
                <v-card-text>
                    <p class="text-h4">Delete Student/Project</p>
                    <div class="d-flex flex-row justify-space-around">
                        <div class="d-flex flex-column flex-grow-1">
                            <v-card class="pa-5 ma-10">
                                <v-card-text>
                                    <v-form v-model="valid2">
                                        <v-select :rules="[(v) => !!v || 'This is required']" required
                                                  label="Delete Student" outlined background-color="white"
                                                  :items=students
                                                  item-text="name" item-value="id" v-model="del_stud"/>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn @click="deleteStudent(del_stud)" color="primary" :disabled="!valid2">Submit
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </div>
                        <div class="d-flex flex-column flex-grow-1">
                            <v-card class="pa-5 ma-10">
                                <v-card-text>
                                    <v-form v-model="valid3">
                                        <v-select :rules="[(v) => !!v || 'This is required']" required
                                                  label="Delete Project" outlined background-color="white"
                                                  :items=projects
                                                  item-text="name" item-value="id" v-model="del_proj"/>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions class="c1">
                                    <v-btn @click="deleteProject(del_proj)" color="primary" :disabled="!valid3">Submit
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
            <v-card color="#CED5DD" width="98%" class="ma-5 pa-10">
                <v-card-text>
                    <p class="text-h4">Projects Website Link</p>
                    <v-text-field class="mr-5" :placeholder="link" label="New Projects Link" v-model="link"
                                  background-color="white" filled/>
                    <v-btn class="primary" @click="changeLink">Submit</v-btn>
                </v-card-text>
            </v-card>
            <div>
                <v-btn class="mx-5 error" @click="clearStudents()">CLEAR ALL STUDENTS</v-btn>
                <v-btn class="mx-5 error" @click="clearProjects()">CLEAR ALL PROJECTS</v-btn>
            </div>
            <p/>
            <p/>
            <p/>
            <p/>
            <p/>
        </div>
    </v-main>
</template>

<script>
    import Header from '@/components/HeaderAdmin.vue'
    import axios from 'axios'
    import Papa from 'papaparse'

    export default {
        name: 'Profile',
        components: {
            Header
        },
        data() {
            return {
                valid: true,
                students: [],
                student: "",
                projects: [],
                del_stud: "",
                del_proj: "",
                link: "",
                studName: "",
                studEmail: "",
                compName: "",
                compContName: "",
                compContEmail: "",
                compProj: "",
                projMin: null,
                projMax: null,
                valid0: false,
                valid1: false,
                valid2: false,
                valid3: false,
                studentsFile: null,
                projectsFile: null,
                success_message: "",
                error_message: "",
                error_snackbar: false,
                success_snackbar: false
            }
        },
        mounted() {
            let self = this;
            const requestStud = axios.get(process.env.VUE_APP_BASE_API_URL + '/students', {withCredentials: true});
            const requestProj = axios.get(process.env.VUE_APP_BASE_API_URL + '/projects', {withCredentials: true});
            const requestLink = axios.get(process.env.VUE_APP_BASE_API_URL + '/project_link', {withCredentials: true});

            axios.all([requestStud, requestProj, requestLink])
                .then(axios.spread((...responses) => {
                    const responseStud = responses[0]
                    const responseProj = responses[1]
                    const responseLink = responses[2]
                    // use/access the results
                    self.students = responseStud.data
                    self.projects = responseProj.data
                    self.link = responseLink.data[0].link
                }))
                .catch(() => {
                    self.$router.push({name: "Error"})
                })
        },
        methods: {
            deleteStudent: async function (s_id) {
                try {
                    await axios.delete(process.env.VUE_APP_BASE_API_URL + '/students/' + s_id, {withCredentials: true})
                    let UEmail = this.students.find(student => student.id === s_id).email
                    let res = await axios.get(process.env.VUE_APP_BASE_API_URL + '/users/retrieve/' + UEmail, {withCredentials: true})
                    let UID = res.data.id
                    await axios.delete(process.env.VUE_APP_BASE_API_URL + '/users/' + UID, {withCredentials: true})
                    this.students = this.students.filter(student => student.id !== s_id)
                    this.success_message = "Student deleted."
                    this.success_snackbar = true
                } catch (err) {
                    this.error_message = "An error occurred while deleting the student."
                    this.error_snackbar = true
                }
            },
            deleteProject: function (p_id) {
                axios.delete(process.env.VUE_APP_BASE_API_URL + '/projects/' + p_id, {withCredentials: true})
                    .then(() => {
                        this.projects = this.projects.filter(project => project.id !== p_id)
                        this.success_message = "Project deleted."
                        this.success_snackbar = true
                    })
                    .catch(() => {
                        this.error_message = "An error occurred while deleting the project."
                        this.error_snackbar = true
                    })
            },
            clearProjects: function () {
                if (!confirm("Delete all projects - are you sure?")) {
                    return;
                }
                axios.delete(process.env.VUE_APP_BASE_API_URL + '/projects/', {withCredentials: true})
                    .then(() => {
                        this.projects = []
                        this.success_message = "ALL projects deleted."
                        this.success_snackbar = true
                    })
                    .catch(() => {
                        this.error_message = "An error occurred while deleting projects."
                        this.error_snackbar = true
                    })
            },
            clearStudents: async function () {
                if (confirm("Delete all students - are you sure?")) {
                    try {
                        await axios.delete(process.env.VUE_APP_BASE_API_URL + '/students/', {withCredentials: true})
                        await axios.delete(process.env.VUE_APP_BASE_API_URL + '/users/', {withCredentials: true})
                        this.students = []
                        this.success_message = "ALL students deleted."
                        this.success_snackbar = true
                    } catch (err) {
                        this.error_message = "An error occurred while deleting students."
                        this.error_snackbar = true
                    }
                }
            },
            newProj: function () {
                axios.post(process.env.VUE_APP_BASE_API_URL + '/projects', {
                    withCredentials: true,
                    name: this.compProj,
                    client_name: this.compContName,
                    client_email: this.compContEmail,
                    client_company: this.compName,
                    min_students: this.projMin,
                    max_students: this.projMax
                }, {withCredentials: true})
                    .then(() => {
                        axios.get(process.env.VUE_APP_BASE_API_URL + '/projects', {withCredentials: true})
                            .then(res => {
                                this.projects = res.data
                            })
                            .catch(() => {
                                this.$router.push({name: "Error"})
                            })
                        this.$refs.add_project_form.reset()
                        this.success_message = "Project added."
                        this.success_snackbar = true
                    })
                    .catch(() => {
                        this.error_message = "An error occurred while adding the project."
                        this.error_snackbar = true
                    })
            },
            newStudent: async function () {
                try {
                    await axios.post(process.env.VUE_APP_BASE_API_URL + '/users', {
                        name: this.studName,
                        username: this.studName,
                        email: this.studEmail
                    }, {withCredentials: true})
                    await axios.post(process.env.VUE_APP_BASE_API_URL + '/students', {
                        name: this.studName,
                        username: this.studName,
                        email: this.studEmail
                    }, {withCredentials: true})
                    this.$refs.add_student_form.reset()
                    this.success_message = "Student added."
                    this.success_snackbar = true
                } catch (err) {
                    this.error_message = "An error occurred while adding the student."
                    this.error_snackbar = true
                }
                try {
                    let res = await axios.get(process.env.VUE_APP_BASE_API_URL + '/students', {withCredentials: true})
                    this.students = res.data
                } catch (err) {
                    await this.$router.push({name: "Error"})
                }
            },
            changeLink: function () {
                axios.put(process.env.VUE_APP_BASE_API_URL + '/project_link/1', {
                    withCredentials: true,
                    link: this.link
                })
                    .then(() => {
                        this.success_message = "Link updated."
                        this.success_snackbar = true
                    })
                    .catch(() => {
                        this.error_message = "An error occurred while updating the link."
                        this.error_snackbar = true
                    })
            },
            submitProjectFile: async function () {
                document.body.style.cursor = "wait"
                try {
                    let contents = await this.projectsFile.text()
                    let projects = Papa.parse(contents, { header: true }).data
                    for (let pr of projects) {
                        if (!pr.client_company) continue
                        await axios.post(process.env.VUE_APP_BASE_API_URL + '/projects', {
                            withCredentials: true,
                            name: pr.project_name,
                            client_name: pr.client_name,
                            client_email: pr.client_email,
                            client_company: pr.client_company,
                            min_students: pr.min_students,
                            max_students: pr.max_students
                        })
                    }
                    let res = await axios.get(process.env.VUE_APP_BASE_API_URL + '/projects', {withCredentials: true})
                    this.projects = res.data
                    this.$refs.upload_projects_form.reset()
                    this.success_message = "Projects added."
                    this.success_snackbar = true
                } catch (err) {
                    this.error_message = "An error occurred while adding projects."
                    this.error_snackbar = true
                } finally {
                    document.body.style.cursor = "default"
                }
            },
            submitStudentFile: async function () {
                document.body.style.cursor = "wait"
                try {
                    let contents = await this.studentsFile.text();
                    let students = Papa.parse(contents, { header: true }).data
                    for (let st of students) {
                        if (!st.email) continue
                        await axios.post(process.env.VUE_APP_BASE_API_URL + '/users', {
                            withCredentials: true,
                            name: st.name,
                            username: st.name,
                            email: st.email
                        })
                        await axios.post(process.env.VUE_APP_BASE_API_URL + '/students', {
                            withCredentials: true,
                            name: st.name,
                            email: st.email
                        })
                    }
                    let res = await axios.get(process.env.VUE_APP_BASE_API_URL + '/students', {withCredentials: true})
                    this.students = res.data
                    this.$refs.upload_students_form.reset()
                    this.success_message = "Students added."
                    this.success_snackbar = true
                } catch (err) {
                    this.error_message = "An error occurred while adding students."
                    this.error_snackbar = true
                } finally {
                    document.body.style.cursor = "default"
                }
            },
            downloadStudExample: function () {
                var str = "name,email\njohn doe,john@mines.edu\njane doe,jane@mines.edu"
                const blob = new Blob([str], {type: 'application/csv'})
                const link = document.createElement('a')
                link.href = URL.createObjectURL(blob)
                link.download = "Example Students.csv"
                link.click()
                URL.revokeObjectURL(link.href)
            },
            downloadProjExample: function () {
                var str = "client_company,client_name,client_email,project_name,min_students,max_students\ncompany1,client1,client1@gmail.com,project 1,2,4\ncompany2,client2,client2@gmail.com,project 2,3,5"
                const blob = new Blob([str], {type: 'application/csv'})
                const link = document.createElement('a')
                link.href = URL.createObjectURL(blob)
                link.download = "Example Projects.csv"
                link.click()
                URL.revokeObjectURL(link.href)
            },
        }
        ,
    }
</script>

<style>
</style>
