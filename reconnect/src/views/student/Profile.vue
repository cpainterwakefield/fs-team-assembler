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
                  <v-text-field class="text" readonly background-color="white" filled color="black" label="Preferred Name" :placeholder="name"></v-text-field>
                  <v-text-field class="text" readonly background-color="white" filled color="black" label="Minor" :placeholder="minor"></v-text-field>
                  <v-text-field class="text" readonly background-color="white" filled color="black" label="GPA" :placeholder="gpa"></v-text-field>
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
            <v-layout wrap>
              <v-flex>
                <div class="project_pref">
                  <h3> Project Preferences </h3>
                  <v-text-field class="text" readonly background-color="white" filled color="black" label="First Preference" :placeholder="firstProj"></v-text-field> 
                  <v-text-field class="text" readonly background-color="white" filled color="black" label="Second Preference" :placeholder="secondProj"></v-text-field> 
                  <v-text-field class="text" readonly background-color="white" filled color="black" label="Third Preference" :placeholder="thirdProj"></v-text-field> 
                </div>
              </v-flex>
              <v-flex>
                <div class="teams">
                  <h3 class="h3_1"> Team Preferences </h3>
                  <div class="pref1">
                    <v-list dense max-height=105px class="overflow-y-auto" width="250">
                      <h5><u>Preferred Team</u></h5>
                      <v-list-item v-for="(pref, i) in team_pref" :key="i">
                        <v-list-item-title class="element" v-text="pref"></v-list-item-title>
                      </v-list-item>  
                    </v-list>
                  </div>
                  <div class="pref1">
                    <v-list dense max-height=105px class="overflow-y-auto" width="250">
                      <h5><u>Avoid Team</u></h5>
                      <v-list-item v-for="(avoid, i) in team_avoid" :key="i">
                        <v-list-item-title class="element" v-text="avoid"></v-list-item-title>
                      </v-list-item>  
                    </v-list>
                  </div>
                </div>
              </v-flex>
            </v-layout>
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
      students: ['john doe', 'jane doe'],
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
      axios.get('http://localhost:8080/api/students', {withCredentials: true})
      .then(response => {
        console.log(response)
        // JSON responses are automatically parsed.
        self.students = response.data

      })
      .catch(e => {
        self.errors.push(e)
      })
    }
}

</script>

<style type="text/css">
  body { font-family: sans-serif; }

  .pref1 {
    margin-bottom: 20px;
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

  .project_pref {
    width: 90%;
    margin: 10px;
  }

  .bottom {
    margin: 10px; 
  }

  .experience {
    margin-left: 30px;
    margin-right: 30px;
  }

  .teams {
    width: 40%;
    margin-left: 160px;
    margin-top: 10px;
  }
</style>
