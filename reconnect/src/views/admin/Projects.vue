<template>
<center>
  <Header />
  <div class="projects"> 
    <h1>Projects</h1>
    <div class="table">
      <h3 class="head2">Company Name</h3> 
      <h3 class="head2">Project Name</h3> 
      <h3 class="head2">Contact Name</h3> 
      <h3 class="head2">Contact Email</h3> 
      <h3 class="head2">Min</h3> 
      <h3 class="head2">Max</h3> 
      <hr>
      <v-btn @click="get()">get</v-btn>
      <div class="row" v-for="(project, i) in projects" :key="i">
        <div class="panel1">
          <div class="list1">{{project.companyName}}</div>
        </div>
        <div class="panel1">
          <div class="list1">{{project.name}}</div>
        </div>
        <div class="panel1">
          <div class="list1">{{project.contactName}}</div>
        </div>
        <div class="panel1">
          <div class="list1">{{project.contactEmail}}</div>
        </div>
        <div class="panel1">
          <div class="list1">{{project.min}}</div>
        </div>
        <div class="panel1">
          <div class="list1">{{project.max}}</div>
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
  name: 'Projects',
  components: {
    Header
  },
  data() {
    return {
      valid: true,
      projects: [
//        {companyName: 'Company1', projectName: 'Project1', contactName: 'contact1', contactEmail: 'contact1@gmail.com', min: 2, max: 5},
//        {companyName: 'Company2', projectName: 'Project2', contactName: 'contact2', contactEmail: 'contact2@gmail.com', min: 2, max: 5},
      ],
    }
  },
  get: function() {
    var self=this;
    axios.get('localhost:8080/api/projects/')
    .then(response => {
      console.log(response.data)
      // JSON responses are automatically parsed.
      self.projects = response.data
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

  .projects {
    border: 2px solid black;
    border-radius: 10px;
    width: 90%;
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

  .panel1 {
    display: inline-block;
    width: 12%;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-left: 1px solid grey;
    border-right: 1px solid grey;
    height: 40px;
    overflow: auto;
  }
   
  .head2 {
    display: inline-block;
    width: 12%;
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
    height: 50px;
    width: 100%;
    text-align: center;
    display: inline;
    border-bottom: 1px solid grey;
  }
</style>
