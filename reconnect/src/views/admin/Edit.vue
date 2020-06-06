<template>
<center>
  <Header />
  <div class="edit">
    <div class="add">
      <div class="sections">
        <h2 class="h2_1">Add Student(s)/Project(s)</h2>
        <div class="add_element">
          <v-card>
            <v-card-text class="v-card-text1">
              <v-form v-model="valid">
                <v-file-input label="Add Students (CSV)" outlined accept=".csv" background-color="white" v-model="studentsFile"></v-file-input>
              </v-form>
            </v-card-text>
            <v-card-actions class="c1">
              <v-btn color="primary" @click="submitStudentFile()">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div class="add_element">
          <v-card>
            <v-card-text class="v-card-text1">
              <v-form v-model="valid">
                <v-file-input label="Add Projects (CSV)" outlined accept=".csv" background-color="white" multiple v-model="projectsFile"></v-file-input>
              </v-form>
            </v-card-text>
            <v-card-actions class="c1">
              <v-btn color="primary">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </div>
      <hr>
  
      <div class="sections">
        <h2 class="h2_1">Add Single</h2>
        <div class="add_element">
        <h2 class="h2_1">Add Student</h2>
          <v-card>
            <v-card-text class="v-card-text1">
              <v-form v-model="valid0">
                <v-text-field label="Name" :rules="[v => !!v || 'This is required']" required outlined background-color="white" v-model="studName"></v-text-field>
                <v-text-field label="Email" :rules="[v => !!v || 'This is required']" required outlined background-color="white" v-model="studEmail"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="c1">
              <v-btn color="primary" :disabled="!valid0" @click="newStudent()">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div class="add_element">
        <h2 class="h2_1">Add Project</h2>
          <v-card>
            <v-card-text class="v-card-text1">
              <v-form v-model="valid1">
                <v-text-field class="prompt1" label="Company Name" :rules="[v => !!v || 'This is required']" required outlined background-color="white" v-model="compName"></v-text-field>
                <v-text-field class="prompt1" label="Contact Name" :rules="[v => !!v || 'This is required']" required outlined background-color="white" v-model="compContName"></v-text-field>
                <v-text-field class="prompt1" label="Contact Email" :rules="[v => !!v || 'This is required']" required outlined background-color="white" v-model="compContEmail"></v-text-field>
                <v-text-field class="prompt1" label="Project Name" :rules="[v => !!v || 'This is required']" required outlined background-color="white" v-model="compProj"></v-text-field>
                <v-text-field class="prompt1" label="Min Students" :rules="[v => !!v || 'This is required']" required outlined background-color="white" v-model="projMin" type="number"></v-text-field>
                <v-text-field class="prompt1" label="Max Students" :rules="[v => !!v || 'This is required']" required outlined background-color="white" v-model="projMax" type="number"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="c1">
              <v-btn color="primary" :disabled="!valid1" @click="newProj()">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </div>
      <hr>

      <div class="sections">
        <h2 class="h2_1">Delete Students/Projects</h2>
        <div class="add_element">
          <v-card>
            <v-card-text class="v-card-text1">
              <v-form v-model="valid">
                <v-select label="Delete Student" outlined background-color="white" :items=students item-text="name" item-value="id" v-model="del_stud"></v-select>
              </v-form>
            </v-card-text>
            <v-card-actions class="c1">
              <v-btn @click="deleteStudent(del_stud)" color="primary">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div class="add_element">
          <v-card>
            <v-card-text class="v-card-text1">
              <v-form v-model="valid">
                <v-select label="Delete Project" outlined background-color="white" :items=projects item-text="name" item-value="id" v-model="del_proj"></v-select>
              </v-form>
            </v-card-text>
            <v-card-actions class="c1">
              <v-btn @click="deleteProject(del_proj)" color="primary">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </div>
    <hr>
    <div class="link">
      <v-text-field class="bot" :placeholder="link" label="New Projects Link" v-model="link" background-color="white" filled /> 
      <v-btn class="primary" @click="changeLink">Submit</v-btn>
    </div>
    <hr>
    <div class="btn1">
     <v-btn class="error" @click="clearStudents()">CLEAR STUDENTS</v-btn> 
     <v-btn class="error" @click="clearProjects()">CLEAR PROJECTS</v-btn> 
    </div>
  </div>
</center>
</template>

<script>

import Header from '@/components/HeaderAdmin.vue'
import axios from 'axios'
const neatCsv = require('neat-csv');
const fs = require('fs');

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
      studentsFile: null,
      projectsFile: null,
    }
  },
  mounted() {
    var self=this;
    const requestStud = axios.get(process.env.VUE_APP_BASE_API_URL + '/students', {withCredentials: true});
    const requestProj = axios.get(process.env.VUE_APP_BASE_API_URL + '/projects', {withCredentials: true});
    const requestLink = axios.get(process.env.VUE_APP_BASE_API_URL + '/project_link', {withCredentials: true});

    axios.all([requestStud, requestProj, requestLink]).then(axios.spread((...responses) => {
      const responseStud = responses[0]
      const responseProj = responses[1]
      const responseLink = responses[2]
      // use/access the results 
      self.students = responseStud.data
      self.projects = responseProj.data
      self.link = responseLink.data[0].link
    }))
    .catch(e => {
      // react on errors.
      self.errors.push(e)
    })
  },

  methods: {
    deleteStudent: function (s_id) {
      var self=this;
      axios.delete(process.env.VUE_APP_BASE_API_URL + '/students/' + s_id, {withCredentials: true})
      .catch(e => {
        self.errors.push(e)
      })
    },
    deleteProject: function (p_id) {
      var self=this;
      axios.delete(process.env.VUE_APP_BASE_API_URL + '/projects/' + p_id, {withCredentials: true})
      .catch(e => {
        self.errors.push(e)
      })
    },
    clearProjects: function() {
      var self=this;
      axios.delete(process.env.VUE_APP_BASE_API_URL + '/projects/', {withCredentials: true})
      .catch(e => {
        self.errors.push(e)
      })
    },
    clearStudents: function() {
      var self=this;
      axios.delete(process.env.VUE_APP_BASE_API_URL + '/students/', {withCredentials: true})
      .catch(e => {
        self.errors.push(e)
      })
    },
    newProj: function() {
      axios.post(process.env.VUE_APP_BASE_API_URL + '/projects', {
        withCredentials: true,
        name: this.compProj,
        client_name: this.compContName,
        client_email: this.compContEmail,
        client_company: this.compName,
        min_students: this.projMin,
        max_students: this.projMax
      }, {withCredentials: true})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    newStudent: function() {
      axios.post(process.env.VUE_APP_BASE_API_URL + '/students', {
        withCredentials: true,
        name: this.studName,
        project_id: null,
        email: this.studEmail
      }, {withCredentials: true})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        self.errors.push(error)
      });

    },
    changeLink: function() {
      axios.put(process.env.VUE_APP_BASE_API_URL + '/project_link/1', {
        link: this.link
      })
      .then(response => {
        console.log(response)
      })
    },
    submitStudentFile: function() {
      console.log(this.studentsFile)
fs.readFile(this.studentsFile, (error, data) => {
  if (error) {
    return console.log('error reading file');
  }
  neatCsv(data)
    .then((parsedData) => console.log(parsedData));
});
    }
  },
}
</script>

<style>

  .right {
    margin-top: 25px;
    display: inline-block;
  }

  .h2_1 {
    text-align: center;
  }

  .left {
    display: inline-block;
    width: 500px;
    margin-right: 25px;
  }

  .add_element {
    width: 40%;
    display: inline-block;
    margin: 50px;
    background: white;
  }

  .add {
    margin-bottom: 50px;
  }

  .profiles {
    border: 2px solid black;
    border-radius: 10px;
    width: 90%;
    padding: 20px;
    background: #D3D3D3;
    margin-bottom: 50px;
  }
  
  .pref1 {
    display: inline-block;
  }

  .edit {
    border: 2px solid black;
    border-radius: 10px; 
    background: #D3D3D3;
    margin-bottom: 50px;
    padding: 20px;
    width: 90%;
  }

  .error {
    margin: 10px;
  }

  .c1 {
    height: 50px;
  }
    
  .v-card-text1 {
  }

  .link {
    margin: 25px;
    display: inline;
    width: 90%;
  }
  
  .bot {
    display: inline-block;
    width: 80%;
  }
  
  .prompt1 {
    width: 40%;
    display: inline-block;
    margin: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .addMult {
    border: 2px solid black;
    border-radius: 10px;
  }

  .addOne {
    border: 2px solid black;
    border-radius: 10px;
  }

  .sections {
    border: 2px solid black;
    border-radius: 10px;
    margin: 10px;
  }
</style>
