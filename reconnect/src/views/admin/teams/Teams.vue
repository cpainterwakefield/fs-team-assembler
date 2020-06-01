<template>
<center>
  <Header />
  <div class="run">
    <v-btn class="error" to="/admin/teams/edit">Edit</v-btn>
    <v-btn class="primary" >Export</v-btn>
    <v-btn class="primary" >RUN</v-btn>
    <hr>
    <div class="left-list">
      <h2 class="h2_2">Remaining</h2>
      <div class="element1" v-for="(student, i) in students" :key="i">
        <span class="p1" v-if="student.projectId == null"><hr>{{student.name}}<hr></span>
      </div>
    </div>
    <div class="right-list">
      <span class="proj1" v-for="project in projects" :key="project.name">
        <h2 class="h2_2">{{project.name}} ({{project.min_students}}, {{project.max_students}})</h2>
        <hr>
        <div class="element1" v-for="(student, i) in students" :key="i">
          <div class="p1" v-if="student.projectId == project.id"><hr>{{student.name}}<hr></div>
        </div>
      </span>
    </div>
  </div>

</center>
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
      projects: []
      
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
  }
}

</script>

<style>

  .proj1 {
    display: inline-block;
    margin-top: 5x;
    margin-bottom: 5px;
    margin-left: 3px;
    margin-right: 3px;
    border: 2px solid black;
    border-radius: 10px;
    padding: 10px;
    background: white;
    width: 18%;
    word-wrap: break-word;
    height: 200px;
    overflow: auto;
  }

  .element1 {
    margin: 5px;
    text-align: left;
    padding-left: 5px;
    padding-right: 5px;
  }

  .left-list {
    float: left;
    display: inline;
    border: 2px solid black;
    border-radius: 10px;
    background: white;
    width: 15%;
    margin: 15px;
  }

  .right-list {
    display: inline;
    float: right;
    margin: 15px;
    text-align: top;
    border: 2px solid black;
    border-radius: 10px;
    width: 80%;
  }
    
  .primary {
    margin: 15px;
  }

  .p1 {
    font-size: 12px;
    display: inline-block;
    width: 100%;
  }

  .h2_2 {
    font-size: 15px;
  }

</style>
