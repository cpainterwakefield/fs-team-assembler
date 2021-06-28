<template>
    <v-main>
        <Header/>
        <div class="centered">
            <div class="projects">
                <h1>Projects</h1>
                <table width="98%">
                    <tr>
                        <th>Project Name</th>
                        <th>Company Name</th>
                        <th>Contact Name</th>
                        <th>Contact Email</th>
                        <th>Min</th>
                        <th>Max</th>
                    </tr>
                    <tr v-for="(project, i) in projects" :key="i">
                        <td>
                            <div>{{project.name}}</div>
                        </td>
                        <td>
                            <div>{{project.client_company}}</div>
                        </td>
                        <td>
                            <div>{{project.client_name}}</div>
                        </td>
                        <td>
                            <div>{{project.client_email}}</div>
                        </td>
                        <td>
                            <div>{{project.min_students}}</div>
                        </td>
                        <td>
                            <div>{{project.max_students}}</div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </v-main>
</template>

<script>

    import Header from '@/components/HeaderAdmin.vue'
    import axios from 'axios'

    export default {
        name: 'Projects',
        components: {
            Header
        },
        data() {
            return {
                valid: true,
                projects: [],
            }
        },
        mounted() {
            var self = this;
            axios.get(process.env.VUE_APP_BASE_API_URL + '/projects', {withCredentials: true})
                .then(response => {
                    console.log(response)
                    // JSON responses are automatically parsed.
                    self.projects = response.data

                })
                .catch(() => {
                    self.$router.push({name: "Error"})
                })
        }
    }
</script>

<style>
    .projects {
        border: 2px solid black;
        border-radius: 10px;
        width: 90%;
        padding: 20px;
        background: #CED5DD;
        margin-bottom: 50px;
        margin-top: 25px;
    }

    td {
        padding: 15px;
        border: 1px solid grey;
        background-color: white;
    }
</style>
