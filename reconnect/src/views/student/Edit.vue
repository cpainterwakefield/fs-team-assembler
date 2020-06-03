<template>
<center>
<Header> </Header>
  <div class="edit_main">
    <h1>Edit Your Profile </h1>
    <hr>
      <v-form v-model="valid">
          <div class="top">
            <v-layout wrap>
              <v-flex>
                <div class="left-questions">
                  <v-text-field class="text" v-model="name" background-color="white" outlined label="Preferred Name"></v-text-field>
                  <v-text-field class="text" v-model="minor" background-color="white" outlined label="Minor"></v-text-field>
                  <v-text-field class="text" v-model="gpa" :rules="[v => !!v || 'This is required']" required background-color="white" outlined label="GPA" type="number"></v-text-field>
                </div>
              </v-flex>
              <v-flex>
                <div class="right-pref">
                  <v-radio-group v-model="preference" label="I Prefer" >
                    <v-radio name="selection_preference" label="Doesn't Matter" value=null></v-radio>                
                    <v-radio name="selection_preference" label="My Chosen Projects" value=false></v-radio>
                    <v-radio name="selection_preference" label="My Chosen Teammates" value=true></v-radio>                
                  </v-radio-group>
                </div>
              </v-flex>
            </v-layout>
          </div>
          <hr>
          <div class="bottom">
            <h2> Your Choices </h2>
                <div class="project_pref">
                  <h3> Project Preferences </h3>
                  <v-select class="sel1" label="First Preference" outlined background-color="white" :items=projects item-text="name" item-value="id" v-model="firstProj"></v-select>
                  <v-select class="sel1" label="Second Preference" outlined background-color="white" :items=projects item-text="name" item-value="id" v-model="secondProj"></v-select>
                  <v-select class="sel1" label="Third Preference" outlined background-color="white" :items=projects item-text="name" item-value="id" v-model="thirdProj"></v-select>
                </div>
                <div class="teammate_pref">
                  <h3> Team Preferences </h3>
                  <v-select width=50px multiple label="Prefer Teammates" outlined background-color="white" :items=students v-on:input="limiter" item-text="name" v-model="team_pref"></v-select>
                  <v-select width=50px multiple label="Avoid Teammates" outlined background-color="white" :items=students v-on:input="limiter" item-text="name" v-model="team_avoid"></v-select>
                </div>
          </div>
          <hr> 
          <div class="experience">
            <h2> Experience/Rationale: </h2>
            <p><b> Enter any additional information that should be considered. </b></p>
            <p> Note: This is simply read by an advisor, not by clients or potential employers. </p>
            <v-text-field background-color="white" outlined v-model="experience" label="Experience/Rationale"></v-text-field>
          </div>
        <v-btn class="primary" :disabled="!valid" @click="doSubmit()">Submit</v-btn>
    </v-form>
  </div>
</center>
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
      experience: ""
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
    // need to change
    let id = 1
    axios.get('http://' + location.hostname + ':8080/api/students/' + id)
      .then(response => {
        console.log(response)
        // JSON responses are automatically parsed.
        self.student = response.data
        self.experience = self.student.experience
        self.gpa = self.student.gpa
        self.minor = self.student.minor
        self.name = self.student.username
        self.firstProj = self.student.first_project
        self.secondProj = self.student.second_project
        self.thirdProj = self.student.third_project
        self.preference = self.student.selection_preference

      })
      .catch(e => {
        self.errors.push(e)
      })

  },    
  methods: {
    limiter: function(e) {
      if(e.length > 10) {
        e.pop()
      }
    },

    doSubmit() {
      //let id=1
      axios.put('http://localhost:8080/api/students/1', {
        name: this.name,
        minor: this.minor,
        gpa: this.gpa,
        username: this.name,
        experience: this.experience,
        first_project: this.firstProj,
        second_project: this.secondProj,
        third_project: this.thirdProj,
        selection_preference: this.preference
        
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
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
  
  .v-card-text1 {
    background: #D3D3D3;
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

  .experience {
    margin-left: 10px;
    margin-right: 10px;
  }

  .card0 {
    height: 90%;
  }
  .teammate_pref {
    display: inline-block;
    width: 40%;
  }
</style>
