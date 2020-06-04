<template>
<center>
  <Header />
  <div class="students"> 
    <h2>Statistics</h2>
    <div class="stats">
      <hr>
      <div class="prompt">Number of students with submitted data of total students:</div>
      <div class="resp">{{totalSubmitted}} of {{totalStudents}}</div>
      <hr>
      <div class="prompt">Of those who preferred team, number of students with at least one preferred member:</div>
      <div class="resp">{{totalTeam1Mem}} of {{totalTeamPref}}</div>
      <hr>
      <div class="prompt">Of those who preferred project, number of students who were assigned any project they wanted:</div>
      <div class="resp">{{totalProj1Proj}} of {{totalProjPref}}</div>
      <hr>
      <div class="prompt">Of those with no preference, number who got either a team member OR project they selected:</div>
      <div class="resp">{{totalNoPref}} of {{totalTeamOrProj}}</div>
      <hr>
      <div class="prompt">Students who were assigned to the first project they wanted:</div>
      <div class="resp">{{totalFirstProj}} of {{totalProjPref}}</div>
      <hr>
      <div class="prompt">Students who were assigned to the second project they wanted:</div>
      <div class="resp">{{totalSecondProj}} of {{totalProjPref}}</div>
      <hr>
      <div class="prompt">Students who were assigned to the third project they wanted:</div>
      <div class="resp">{{totalThirdProj}} of {{totalProjPref}}</div>
      <hr>
    </div>
    <h2>Students</h2>
    <div class="table">
      <h3 class="head1">Name</h3> 
      <h3 class="head1">Email</h3> 
      <h3 class="head1">Minor</h3> 
      <h3 class="head1">GPA</h3> 
      <h3 class="head1">P/T</h3> 
      <h3 class="head1">Projects</h3> 
      <h3 class="head1">Prefers</h3> 
      <h3 class="head1">Avoids</h3> 
      <h3 class="head1">Assigned</h3> 
      <hr>
      <div class="row" v-for="student in students" :key="student.id">
        <div class="panel">
          <div class="list1">{{student.name}}</div>
        </div>
        <div class="panel">
          <div class="list1">{{student.email}}</div>
        </div>
        <div class="panel">
          <div class="list1">{{student.minor}}</div>
        </div>
        <div class="panel">
          <div class="list1">{{student.gpa}}</div>
        </div>
        <div class="panel">
          <div class="list1" v-if="student.selection_preference == null"><font color="red">N/A</font></div>
          <div class="list1" v-else>
            <div class="list1" v-if="student.selection_preference"><font color="blue">T</font></div>
            <div class="list1" v-else><font color="green">P</font></div>
          </div>
        </div>
        <div class="panel">
          <div class="list2" v-if="student.first_project">{{getName(student.first_project)}}</div>
          <div class="list2" v-if="student.second_project">{{getName(student.second_project)}}</div>
          <div class="list2" v-if="student.third_project">{{getName(student.third_project)}}</div>
        </div>
        <div class="panel">
          <div class="list1" v-for="(prefer, i) in student.pref" :key="i">
            <div class="list2">{{prefer}}</div>
            <hr>
          </div>
        </div>
        <div class="panel">
          <div class="list1" v-for="(av, i) in student.avoid" :key="i">
            <div class="list2">{{av}}</div>
            <hr>
          </div>
        </div>
        <div class="panel">
         <div class="list1" v-if="student.project_id"><font color="green">{{getName(student.project_id)}}</font></div> 
         <div class="list1" v-else><font color="red">X</font></div> 
        </div>
      </div>
      <hr>
    </div>
  </div>
</center>
</template>

<script>

import Header from '@/components/HeaderAdmin.vue'
import axios from 'axios'

export default {
  name: 'Students',
  components: {
    Header
  },
  data() {
    return {
      valid: true,
      students: [],
      projects: [],
      totalStudents: 100,
      totalSubmitted: 95,
      totalTeamPref: 25,
      totalTeam1Mem: 25,
      totalProjPref: 70,
      totalProj1Proj: 65,
      totalNoPref: 5,
      totalTeamOrProj: 5,
      totalFirstProj: 50,
      totalSecondProj: 35,
      totalThirdProj: 15,
    
    }
  },
  mounted() {
    var self=this;
    
    const requestStud = axios.get(process.env.VUE_APP_BASE_API_URL + '/students', {withCredentials: true})
    const requestProj = axios.get(process.env.VUE_APP_BASE_API_URL + '/projects', {withCredentials: true})
    console.log("look here")
    axios.get(process.env.VUE_APP_BASE_API_URL + '/students', {withCredentials: true})
    .then(response => {
      console.log(response)
      // JSON responses are automatically parsed.
      self.students = response.data
    })

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

  },
  
  methods: {
    getName: function(pid) {
      return this.projects.find(function(id) {if (id.id === pid) return id}).name
    }
  } 
}


</script>

<style>

  .students {
    border: 2px solid black;
    border-radius: 10px;
    width: 100%;
    padding: 20px;
    background: #D3D3D3;
    margin-bottom: 50px;
  }
  
  .pref1 {
    display: inline-block;
    margin: 20px;
  }

  .list1 {
    margin-left: 20px;
    margin-right: 20px;
  }

  .list2 {
    margin-left: 20px;
    margin-right: 20px;
  }

  .panel {
    display: inline-block;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-left: 1px solid grey;
    border-right: 1px solid grey;
    height: 50px;
    overflow: auto;
    width: 8%;
  }
   
  .head1 {
    display: inline-block;
    width: 8%;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
    text-align: center;
  }

  .table {
    border: 2px solid black;
    text-align: center;
    background: white;
  }

  .row {
    width: 100%;
    border-bottom: 1px solid grey;
  }

  .prompt {
    text-align: left;
    margin: 5px;
    width: 65%;
    display: inline-block;
  }

  .resp {
    margin: 5px;
    text-align: right; 
    width: 25%;
    display: inline-block;
  }
  
  .stats {
    width: 100%;
    background: white;
  }
</style>
