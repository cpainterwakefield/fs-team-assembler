<template>
<center>
<Header />
  <div class="profile_main">
    <h1>Profile </h1>
    <hr>
          <div class="top">
            <v-layout wrap>
              <v-flex>
                <div class="left-questions">
                  <v-text-field class="text3" readonly background-color="white" filled color="black" label="Preferred Name" :placeholder="name"></v-text-field>
                  <v-text-field class="text3" readonly background-color="white" filled color="black" label="Minor" :placeholder="minor"></v-text-field>
                  <v-text-field class="text3" readonly background-color="white" filled color="black" label="GPA" :placeholder="gpa"></v-text-field>
                </div>
              </v-flex>
              <v-flex>
                <div class="right-pref">
                  <v-text-field class="text" readonly background-color="white" filled color="black" label="Project/Team Preference" :placeholder="preference"></v-text-field> 
                </div>
              </v-flex>
            </v-layout>
          </div>
           <hr>
          <div class="bottom">
            <h2> Your Choices </h2>
                <div class="projects2">
                  <h3 class="h3_1"> Project Preferences </h3>
                  <v-text-field class="text" readonly background-color="white" filled color="black" label="First Preference" :placeholder=getProj(this.firstProj)></v-text-field> 
                  <v-text-field class="text" readonly background-color="white" filled color="black" label="Second Preference" :placeholder=getProj(this.firstProj)></v-text-field> 
                  <v-text-field class="text" readonly background-color="white" filled color="black" label="Third Preference" :placeholder=getProj(this.thirdProj)></v-text-field> 
                </div>
                <div class="teams2">
                  <h3 class="h3_1"> Team Preferences </h3>
                  <div class="pref2">
                    <v-list dense max-height=105px class="overflow-y-auto" width="250">
                      <h5><u>Preferred Team</u></h5>
                      <v-list-item v-for="(pref, i) in team_pref" :key="i">
                        <v-list-item-title class="element" v-text=getStud(pref.preferreeId)></v-list-item-title>
                      </v-list-item>  
                    </v-list>
                  </div>
                  <div class="pref2">
                    <v-list dense max-height=105px class="overflow-y-auto" width="250">
                      <h5><u>Avoid Team</u></h5>
                      <v-list-item v-for="(avoid, i) in team_avoid" :key="i">
                        <v-list-item-title class="element" v-text="avoid"></v-list-item-title>
                      </v-list-item>  
                    </v-list>
                  </div>
                </div>
          </div>
          <hr> 
          <div class="experience">
            <h2> Experience/Rationale: </h2>
            <v-text-field background-color="white" readonly filled color="black" label="Experience/Rationale" :placeholder="experience"></v-text-field>
          </div>
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
      preference: "Doesn't Matter",
      projects: ['dummy1 qwertyuiopasdfghjklzxcvbnm,.'],
      students: [],
      firstProj: "test1",
      secondProj: "test2",
      thirdProj: "test3",
      team_pref: ['good1', 'good2'],
      team_avoid: ['bad1', 'bad2'],
      valid: true,
      minor: "test",
      gpa: "test",
      experience: "experience test",
      name: ""
    }
  },
    mounted() {
      var self=this;
      let id = 1
      const requestStud = axios.get(process.env.VUE_APP_BASE_API_URL + '/students/' + id, {withCredentials: true})
      const requestProj = axios.get(process.env.VUE_APP_BASE_API_URL + '/projects', {withCredentials: true})
      const requestPref = axios.get(process.env.VUE_APP_BASE_API_URL + '/prefer_teammate/' + id, {withCredentials: true})
      const requestStuds = axios.get(process.env.VUE_APP_BASE_API_URL + '/students/', {withCredentials: true})

      axios.all([requestStud, requestProj, requestPref, requestStuds]).then(axios.spread((...responses) => {
        const responseStud = responses[0]
        const responseProj = responses[1]
        const responsePref = responses[2]
        const responseStuds = responses[3]
        // use/access the results
        self.student = responseStud.data
          self.experience = self.student.experience
          self.gpa = self.student.gpa
          self.minor = self.student.minor
          self.name = self.student.username
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
        self.team_pref = responsePref.data
        self.students = responseStuds.data
      }))
      .catch(e => {
        // react on errors.
        self.errors.push(e)
      })

   },
  methods: {
    getProj: function(pid) {
      if (this.projects.find(function(id) {if (id.id === pid) return id}))
        return this.projects.find(function(id) {if (id.id === pid) return id}).name
      else return null;
    },
    getStud: function(pid) {
      if (this.students.find(function(id) {if (id.id === pid) return id}))
        return this.students.find(function(id) {if (id.id === pid) return id}).name
      else return null;
    }
  }
}

</script>

<style type="text/css">
  body { font-family: sans-serif; }

  .element {
    border: 1px solid grey;
    margin: 5px;
  }

  .text {
  }

  .pref2 {
    margin-bottom: 10px;
  }

  h5 {
    color: black;
  }

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

  .h3_1 {
    margin-left: 50px;
  }

  p {
    text-align: left;
    color: black;
  }

  center {
    padding: 25px;
  }
  
  .v-card-text1 {
    background: #D3D3D3;
  }

  .profile_main {
    display: inline-block;
    width: 90%;
    border: 2px solid black;
    border-radius: 10px;
    text-align: center;
    background: #D3D3D3; 
    margin: 35px;
  }

  .left-questions {
    float: left;
    width: 90%;
    display: inline-block;
    padding: 10px;
    margin: 10px;
  }

  .right-pref {
    float: right;
    width: 90%;
    display: inline-block;
    padding: 10px;
    margin: 10px;
  }

  .projects2 {
    width: 40%;
    display: inline-block;
  }

  .bottom {
    margin: 10px; 
  }

  .experience {
    margin-left: 30px;
    margin-right: 30px;
  }

  .teams2 {
    width: 40%;
    margin-top: 20px;
    margin-left: 50px;
    display: inline-block;
  }

</style>
