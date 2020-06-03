<template>
<center>
  <Header />
  <div class="run">
    <v-btn class="primary" @click="buildModels()">BUILD -- REMOVE</v-btn>
    <v-btn class="primary" @click="doSubmit()">Submit</v-btn>
    <hr>
    <div class="left-list">
      <h2 class="h2_2">Remaining</h2>
      <hr>
      <draggable group="projects">
        <div class="element" v-for="(student, i) in students" :key="i">  
          <span class="p2" v-if="student.project_id == null"><hr></span> 
          <v-app-bar-nav-icon small class="icon1" v-if="student.project_id == null"></v-app-bar-nav-icon>
          <span class="p2" v-if="student.project_id == null">{{student.name}}<hr></span>
        </div>
      </draggable>
    </div>
    <div class="right-list">
      <span class="proj1" v-for="model in models" :key="model.project.id">
        <h2 class="h2_2">{{model.project.name}} ({{model.project.min_students}}, {{model.project.max_students}})</h2>
        <draggable :list="model.students" class="drag1" group="projects">
          <hr>
          <div class="element" v-for="student in model.students" :key="student.id">
            <span class="p2"><hr></span> 
            <v-app-bar-nav-icon small class="icon1"></v-app-bar-nav-icon>
            <span class="p2" >{{student.name}} <hr></span>
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
      students: [],
      projects: [],
      projectsModel: [],
      models: [],
      show: true,
    }
  },
  mounted() {
    let self=this;
    const requestStud = axios.get('http://localhost:8080/api/students', {withCredentials: true});
    const requestProj = axios.get('http://localhost:8080/api/projects', {withCredentials: true});

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
    doSubmit: function() {
      axios.put('http://localhost:8080/api/students', {
       students: this.students  
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    },
    buildModels: function() {
      console.log("IN MOUNT")
      console.log(this.projects)
      for (let pr of this.projects) {
        let studList=[];
        for (let st of this.students) {
          if (st.project_id === pr.id)
            studList.push(st)
        }
        this.models.push({project: pr, students:  studList})
      }
      console.log("mod: " + this.models)
    }

  },
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
