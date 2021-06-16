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
      <div class="resp">{{totalTeamOrProj}} of {{totalNoPref}}</div>
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
    <table width="98%">
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Minor</th>
        <th>GPA</th>
        <th>P/T</th>
        <th>Projects</th>
        <th>Prefers</th>
        <th>Avoids</th>
        <th>Assigned</th>
      </tr>
      <tr v-for="student in students" :key="student.id">
        <td>
          <div>{{student.name}}</div>
        </td>
        <td>
          <div>{{student.email}}</div>
        </td>
        <td>
          <div>{{student.minor}}</div>
        </td>
        <td>
          <div>{{student.gpa}}</div>
        </td>
        <td>
          <div v-if="student.selection_preference == null"><font color="red">N/A</font></div>
          <div v-else>
            <div v-if="student.selection_preference"><font color="blue">T</font></div>
            <div v-else><font color="green">P</font></div>
          </div>
        </td>
        <td>
          <div>
            <span v-if="student.first_project">1. {{getProj(student.first_project)}}</span>
            <hr v-if="student.second_project">
            <span v-if="student.second_project">2. {{getProj(student.second_project)}}</span>
            <hr v-if="student.third_project">
            <span v-if="student.third_project">3. {{getProj(student.third_project)}}</span>
          </div>
        </td>
        <td>
          <div v-for="(prefer, i) in team_pref" :key="i">
            <span v-if="prefer.studentId === student.id"><font color="green">{{getStud(prefer.preferreeId)}}</font><hr></span>
          </div>
        </td>
        <td>
          <div v-for="(av, i) in team_avoid" :key="i">
            <span v-if="av.studentId === student.id"><font color="red">{{getStud(av.avoideeId)}}</font><hr></span>
          </div>
        </td>
        <td>
          <div v-if="student.project_id"><font color="green">{{getProj(student.project_id)}}</font></div>
          <div v-else><font color="red">X</font></div>
        </td>
      </tr>
    </table>
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
      totalStudents: 0,
      totalSubmitted: 0,
      totalTeamPref: 0,
      totalTeam1Mem: 0,
      totalProjPref: 0,
      totalProj1Proj: 0,
      totalNoPref: 0,
      totalTeamOrProj: 0,
      totalFirstProj: 0,
      totalSecondProj: 0,
      totalThirdProj: 0,
      team_pref: [],
      team_avoid: []
    
    }
  },
  mounted() {
    var self=this;
    
    const requestStud = axios.get(process.env.VUE_APP_BASE_API_URL + '/students', {withCredentials: true})
    const requestProj = axios.get(process.env.VUE_APP_BASE_API_URL + '/projects', {withCredentials: true})
    const requestPref = axios.get(process.env.VUE_APP_BASE_API_URL + '/prefer_teammate', {withCredentials: true})
    const requestAvoid = axios.get(process.env.VUE_APP_BASE_API_URL + '/avoid_teammate', {withCredentials: true})
    const requestTotalStuds = axios.get(process.env.VUE_APP_BASE_API_URL + '/students/countAll', {withCredentials: true})
    const requestTeamStuds = axios.get(process.env.VUE_APP_BASE_API_URL + '/students/countTeam', {withCredentials: true})
    const requestTeamProj = axios.get(process.env.VUE_APP_BASE_API_URL + '/students/countProj', {withCredentials: true})
    const requestNoPref = axios.get(process.env.VUE_APP_BASE_API_URL + '/students/countNoPref', {withCredentials: true})
    const requestSubmitted = axios.get(process.env.VUE_APP_BASE_API_URL + '/students/countSubmitted', {withCredentials: true})
    const requestProjInPref = axios.get(process.env.VUE_APP_BASE_API_URL + '/students/countProjInPref', {withCredentials: true})
    const requestFirstProj = axios.get(process.env.VUE_APP_BASE_API_URL + '/students/countFirstProj', {withCredentials: true})
    const requestSecondProj = axios.get(process.env.VUE_APP_BASE_API_URL + '/students/countSecondProj', {withCredentials: true})
    const requestThirdProj = axios.get(process.env.VUE_APP_BASE_API_URL + '/students/countThirdProj', {withCredentials: true})
    const requestTeam1Mem = axios.get(process.env.VUE_APP_BASE_API_URL + '/students/countTeam1Mem', {withCredentials: true})
    const requestNoPrefTeamOrProj = axios.get(process.env.VUE_APP_BASE_API_URL + '/students/countNoPrefTeamOrProj', {withCredentials: true})
    axios.get(process.env.VUE_APP_BASE_API_URL + '/students', {withCredentials: true})
    .then(response => {
      console.log(response)
      // JSON responses are automatically parsed.
      self.students = response.data
    })

    axios.all([requestStud, requestProj, requestPref, requestAvoid, requestTotalStuds, requestTeamStuds, requestTeamProj, requestNoPref, requestSubmitted, requestProjInPref, requestFirstProj, requestSecondProj, requestThirdProj, requestTeam1Mem, requestNoPrefTeamOrProj]).then(axios.spread((...responses) => {
      const responseStud = responses[0]
      const responseProj = responses[1]
      const responsePref = responses[2]
      const responseAvoid = responses[3]
      const responseTotalStuds = responses[4]
      const responseTeamStuds = responses[5]
      const responseTeamProj = responses[6]
      const responseNoPref = responses[7]
      const responseSubmitted = responses[8]
      const responseProjInPref = responses[9]
      const responseFirstProj = responses[10]
      const responseSecondProj = responses[11]
      const responseThirdProj = responses[12]
      const responseTeam1Mem = responses[13]
      const responseNoPrefTeamOrProj = responses[14]
      // use/access the results
      self.students = responseStud.data
      self.projects = responseProj.data
      self.team_pref = responsePref.data
      self.team_avoid = responseAvoid.data
      self.totalStudents = responseTotalStuds.data.data
      self.totalTeamPref = responseTeamStuds.data.data
      self.totalProjPref = responseTeamProj.data.data
      self.totalNoPref = responseNoPref.data.data
      self.totalSubmitted = responseSubmitted.data.data
      self.totalProj1Proj = responseProjInPref.data[0][0].count
      self.totalFirstProj = responseFirstProj.data[0][0].count
      self.totalSecondProj = responseSecondProj.data[0][0].count
      self.totalThirdProj = responseThirdProj.data[0][0].count
      self.totalTeam1Mem = responseTeam1Mem.data[0][0].count
      self.totalTeamOrProj = responseNoPrefTeamOrProj.data[0][0].count
    }))
    .catch(e => {
      // react on errors.
      console.log(e)
    })

  },
  
  methods: {
    getProj: function(pid) {
      if( this.projects.find(function(id) {if (id.id === pid) return id}))
        return this.projects.find(function(id) {if (id.id === pid) return id}).name
      else return null
    },
    getStud: function(sid) {
      if(this.students.find(function(id) {if (id.id === sid) return id}))
        return this.students.find(function(id) {if (id.id === sid) return id}).name
      else return null
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
    text-align: left;
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

  td {
    padding: 15px;
    border: 1px solid grey;
    background-color: white;
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
