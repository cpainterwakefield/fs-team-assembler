<template>
<center>
  <Header />
  <div class="projects">
    <h1>Projects</h1>
    <table width="100%">
      <tr>
        <th>Project Name</th>
        <th>Company Name</th>
        <th>Contact Name</th>
        <th>Contact Email</th>
        <th>Min</th>
        <th>Max</th>
      </tr>
      <tr v-for="(project, i) in projects" :key="i">
        <td>
          <div>{{project.name}}</div>
        </td>
        <td>
          <div>{{project.client_company}}</div>
        </td>
        <td>
          <div>{{project.client_name}}</div>
        </td>
        <td>
          <div>{{project.client_email}}</div>
        </td>
        <td>
          <div>{{project.min_students}}</div>
        </td>
        <td>
          <div>{{project.max_students}}</div>
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
  name: 'Projects',
  components: {
    Header
  },
  data() {
    return {
      valid: true,
      projects: [],
    }
  },
  mounted() {
    var self=this;
    axios.get(process.env.VUE_APP_BASE_API_URL + '/projects', {withCredentials: true})
    .then(response => {
      console.log(response)
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
    margin-left: 10px;
    margin-right: 10px;
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

  td {
    padding: 15px;
    border: 1px solid grey;
    background-color: white;
  }

</style>
