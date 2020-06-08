<template>
<center>
  <Header />
  <div class="edit">
    <div class="add">
      <div class="sections">
        <h2 class="h2_1">Add Student(s)/Project(s)</h2>
        <div class="add_element">
          <v-card>
            <h5>Upload a .csv file, each line formatted as follows: student name, student email</h5>
            <v-card-text class="v-card-text1">
              <v-form v-model="valid">
                <v-file-input label="Add Students (CSV)" outlined accept=".csv" background-color="white" v-model="studentsFile"></v-file-input>
              </v-form>
            </v-card-text>
            <v-card-actions class="c1">
              <v-btn color="primary" @click="submitStudentFile">Submit</v-btn>
              <v-btn color="green" @click="downloadStudExample">Example</v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div class="add_element">
          <v-card>
            <h5>Upload a .csv file, each line formatted as follows: Company Name, Contact Name, Contact Email, Project Name, MinStudents, Max Students</h5>
            <v-card-text class="v-card-text1">
              <v-form v-model="valid">
                <v-file-input label="Add Projects (CSV)" outlined accept=".csv" background-color="white" v-model="projectsFile"></v-file-input>
              </v-form>
            </v-card-text>
            <v-card-actions class="c1">
              <v-btn color="primary" @click="submitProjectFile">Submit</v-btn>
              <v-btn color="green" @click="downloadProjExample">Example</v-btn>
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
              <v-form v-model="valid2">
                <v-select :rules="[(v) => !!v || 'This is required']" required label="Delete Student" outlined background-color="white" :items=students item-text="name" item-value="id" v-model="del_stud"></v-select>
              </v-form>
            </v-card-text>
            <v-card-actions class="c1">
              <v-btn @click="deleteStudent(del_stud)" color="primary" :disabled="!valid2">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div class="add_element">
          <v-card>
            <v-card-text class="v-card-text1">
              <v-form v-model="valid3">
                <v-select :rules="[(v) => !!v || 'This is required']" required label="Delete Project" outlined background-color="white" :items=projects item-text="name" item-value="id" v-model="del_proj"></v-select>
              </v-form>
            </v-card-text>
            <v-card-actions class="c1">
              <v-btn @click="deleteProject(del_proj)" color="primary" :disabled="!valid3">Submit</v-btn>
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
//const neatCsv = require('neat-csv');
//const fs = require('fs');

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
      console.log(e)
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
        withCredentials: true,
        link: this.link
      })
      .then(response => {
        console.log(response)
      })
    },
    submitProjectFile: function() {
      
      console.log(this.projectsFile)
      const readerP = new FileReader();
      readerP.readAsText(this.projectsFile);
      console.log(this.projectsFile)
  
      readerP.onload = e => {

        var projs = this.parseCSV(e.target.result)

        for (let pr of projs) {
          axios.post(process.env.VUE_APP_BASE_API_URL + '/projects', {
            withCredentials: true,
            name: pr.name,
            client_name: pr.client_name,
            client_email: pr.client_email,
            client_company: pr.client_company,
            min_students: pr.min_students,
            max_students: pr.max_students
          })
          .then (response => { 
            console.log(response)
          })
          .catch (err => {
            this.errors.push(err)
          })
        }
        
        console.log(projs)
      }
    },
    submitStudentFile: function() {
      console.log(this.studentsFile)
      const reader = new FileReader();

      reader.readAsText(this.studentsFile);
      reader.onload = e => {
        console.log(e.target.result)
        var studs = this.parseCSV(e.target.result)

        for (let st of studs) {
          axios.post(process.env.VUE_APP_BASE_API_URL + '/users', {
            withCredentials: true,
            name: st.name,
            email: st.email 
          })
          .then (response => { 
            console.log(response)
          })
          .catch (err => {
            this.errors.push(err)
          })
        }
      }
    },

    
    
    parseCSV(csv) {
      console.log(csv)
      var lines=csv.split("\n");

      var result = [];

      // NOTE: If your columns contain commas in their values, you'll need
      // to deal with those before doing the next step 
      // (you might convert them to &&& or something, then covert them back later)
      // jsfiddle showing the issue https://jsfiddle.net/
      var headers=lines[0].split(",");

      for(var i=1;i<lines.length;i++){

        var obj = {};
        var currentline=lines[i].split(",");

        for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
        }

        result.push(obj);

      }

      return result; //JavaScript object
    },
    downloadStudExample: function() {
      var str = "name,email\njohn doe,john@gmail.com\njane doe,jane@gmail.com"
      const blob = new Blob([str], { type: 'application/csv' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'Example Students'
      link.click()
      URL.revokeObjectURL(link.href)
    },
    downloadProjExample: function() {
      var str = "name,client_name,client_email,client_company,min_students,max_students\nproject 1,client1,client1@gmail.com,company1,1,2\nproject2,client2,client2@gmail.com,company2,3,5"
      const blob = new Blob([str], { type: 'application/csv' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'Example Projects'
      link.click()
      URL.revokeObjectURL(link.href)
    },
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
    width: 20%;
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
