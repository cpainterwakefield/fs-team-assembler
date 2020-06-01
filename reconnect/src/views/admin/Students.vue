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
      <div class="row" v-for="student in students" :key="student.name">
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
          <div class="list1">{{student.pt}}</div>
        </div>
        <div class="panel">
          <div class="list1" v-for="(proj, i) in student.proj" :key="i">
            <div class="list2">{{proj}}</div>
            <hr>
          </div>
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
         <div class="list1" v-if="student.assigned"><font color="green">{{student.assigned}}</font></div> 
         <div class="list1" v-else><font color="red">X</font></div> 
        </div>
      </div>
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
      students: [
//        {name: 'John Doe', email: 'johndoe@gmail.com', pt: 'proj', proj: ['p1', 'p2', 'p3'], pref: ['Mickey Mouse', 'Donald Duck', 'Goofy Dog'], avoid: ['Pluto Dog'], assigned: 'p3'},
//        {name: 'John Doe', email: 'johndoe@gmail.com', pt: 'team', proj: ['p4', 'p5', 'p6'], pref: ['Mickey Mouse', 'Donald Duck'], avoid: ['Pluto Dog'], assigned: null},
      ],
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
    console.log("look here")
    axios.get('http://' + location.hostname + ':8080/api/students')
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

<style>

  .right {
    margin-top: 25px;
    display: inline-block;
  }

  .left {
    display: inline-block;
    width: 500px;
    margin-right: 25px;
  }

  .add_element {
    width: 40%;
    display: inline-block;
    margin-left: 50px;
    margin-right: 50px;
    background: white;
  }

  .add {
    margin-bottom: 50px;
  }

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
    height: 90px;
    width: 100%;
    display: inline;
    border-bottom: 1px solid grey;
  }

  .tab {
    padding-left: 5px;
    padding-right: 5px;
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
