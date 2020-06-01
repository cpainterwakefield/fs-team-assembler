<template>
<center>
  <Header />
  <div class="run">
    <v-btn class="primary" >Submit</v-btn>
    <hr>
    <div class="left-list">
      <h2 class="h2_2">Remaining</h2>
      <hr>
      <draggable group="projects">
        <div class="element" v-for="(student, i) in students" :key="i">  
          <span class="p2" v-if="student.projectId == null"><hr></span> 
          <v-app-bar-nav-icon small class="icon1" v-if="student.projectId == null"></v-app-bar-nav-icon>
          <span class="p2" v-if="student.projectId == null">{{student.name}}<hr></span>
        </div>
      </draggable>
    </div>
    <div class="right-list">
      <span class="proj1" v-for="project in projects" :key="project.name">
        <h2 class="h2_2">{{project.name}} ({{project.min_students}}, {{project.max_students}})</h2>
        <hr>
        <draggable class="drag1" group="projects">
          <div class="element" v-for="(student, i) in students" :key="i">
          <span class="p2" v-if="student.projectId == project.id"><hr></span> 
            <v-app-bar-nav-icon small class="icon1" v-if="student.projectId == project.id"></v-app-bar-nav-icon>
            <span class="p2" v-if="student.projectId == project.id" >{{student.name}} <hr></span>
            <span class="p2" v-else></span>
          </div>
        </draggable>
      </span>
    </div>
  </div>

</center>
</template>

<script>

import Header from '@/components/HeaderAdmin.vue'
import draggable from 'vuedraggable'
import axios from 'axios'

export default {
  name: 'Profile',
  components: {
    Header,
    draggable
  },
  data() {
    return {
      students: ['John Doe', 'Adam Smith','Donald Duck', 'Mickey Mouse','Pluto Dog', 's2','s1', 's2','s1', 's2', 's2','s1', 's2','s1', 's2','s1', 's2','s1', 's2', 's2','s1', 's2','s1', 's2','s1', 's2','s1', 's2'],
      projects: [
        {name: 'p2qpifhpasdua;shdfak;sdjfha;kdsjhf;aksdjhflskdjhfjsdh', students: ['s1', 's2'], min: 2, max: 5},
        {name: 'p2qiufaaksjdfkjshdfkjshadfkjshfajshdflakjsdhflakjsdhflaksj', students: ['s3', 's4'], min:2, max: 5},
      ]
      
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

  .run {
    border: 2px solid black;
    border-radius: 10px;
    width: 100%;
    background: #D3D3D3;
    margin-bottom: 50px;
    height: 100%;
    overflow: auto;
  }

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
    overflow: scroll;
  }

  .element {
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
    min-height: 100px;
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

  .p2 {
    font-size: 12px;
  }

  .h2_2 {
    font-size: 15px;
  }

  .icon1 {
    
  }

  .drag1 {
    height: 100%;
  }
</style>
