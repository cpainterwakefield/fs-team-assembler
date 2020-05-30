<template>
<center>
  <Header />
  <div class="edit">
    <div class="add">
      <h2 class="h2_1">Add Student(s)/Project(s)</h2>
      <div class="add_element">
        <v-card>
          <v-card-text class="v-card-text1">
            <v-form v-model="valid">
              <v-file-input label="Add Students (JSON)" outlined accept=".txt" background-color="white" multiple></v-file-input>
            </v-form>
          </v-card-text>
          <v-card-actions class="c1">
            <v-btn flat color="primary">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div class="add_element">
        <v-card>
          <v-card-text class="v-card-text1">
            <v-form v-model="valid">
              <v-file-input label="Add Projects (JSON)" outlined accept=".txt" background-color="white" multiple></v-file-input>
            </v-form>
          </v-card-text>
          <v-card-actions class="c1">
            <v-btn flat color="primary">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <hr>

      <h2 class="h2_1">Delete Students/Projects</h2>
       <div class="add_element">
        <v-card>
          <v-card-text class="v-card-text1">
            <v-form v-model="valid">
              <v-select multiple label="Delete Student(s)" outlined background-color="white" :items=students item-text="name" item-value="name" v-model="del_stud"></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions class="c1">
            <v-btn flat color="primary">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div class="add_element">
        <v-card>
          <v-card-text class="v-card-text1">
            <v-form v-model="valid">
              <v-select multiple label="Delete Project(s)" outlined background-color="white" :items=projects item-text="name" item-value="name" v-model="del_proj"></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions class="c1">
            <v-btn flat color="primary">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
    <hr>
    <div class="link">
      <v-text-field class="bot" label="New Projects Link" v-model="link" background-color="white" filled /> 
      <v-btn class="primary" flat>Submit</v-btn>
    </div>
    <hr>
    <div class="btn1">
     <v-btn class="error" flat>CLEAR STUDENTS</v-btn> 
     <v-btn class="error" flat>CLEAR PROJECTS</v-btn> 
    </div>
  </div>
</center>
</template>

<script>

import Header from '@/components/HeaderAdmin.vue'
import axios from 'axios'

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
      link: ""
    }
  },
  mounted() {
    var self=this;
    const requestStud = axios.get('http://localhost:8080/api/students');
    const requestProj = axios.get('http://localhost:8080/api/projects');

    axios.all([requestStud, requestProj]).then(axios.spread((...responses) => {
      const responseStud = responses[0]
      const responseProj = responses[1]
      // use/access the results 
      self.students = responseStud.data
      self.projects = responseProj.data
    }))
    .catch(e => {
      // react on errors.
      self.errors.push(e)
    })
/*    axios.get('http://localhost:8080/api/students')
    .then(response => {
      console.log(response)
      // JSON responses are automatically parsed.
      self.students = response.data

    })
    .catch(e => {
      self.errors.push(e)
    })

    axios.get('http://localhost:8080/api/students')
    .then(response=> {
      console.log(response)
      // JSON responses are automatically parsed.
      self.projects = response.data
    })
    .catch(e => {
      self.errors.push(e)
    })
*/  }
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
    height: 90px;
  }

  .link {
    display: inline;
    width: 90%;
  }
  
  .bot {
    display: inline-block;
    width: 80%;
  }
  
  .primary {
  }
</style>
