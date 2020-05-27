<template>
<center>
  <Header />
  <div class="run">
    <v-btn class="primary" flat>Run Algorithm</v-btn>
    <v-btn class="primary" flat>Submit</v-btn>
    <hr>
    <div class="left-list">
      <h2 class="h2_1">Remaining</h2>
      <draggable v-model="students_left" group="projects">
        <div class="element" v-for="(student, i) in students_left" :key="i">
          <v-app-bar-nav-icon />
          {{student}}
        </div>
      </draggable>
    </div>
    <div class="right-list">
      <span class="proj1" v-for="project in projects" :key="project.name">
        <h2>{{project.name}}</h2>
        <hr>
        <draggable v-model="project.students" group="projects">
          <div class="element" v-for="(student, i) in project.students" :key="i">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            {{student}}
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

export default {
  name: 'Profile',
  components: {
    Header,
    draggable
  },
  data() {
    return {
      students_left: ['John Doe', 'Adam Smith','Donald Duck', 'Mickey Mouse','Pluto Dog', 's2','s1', 's2','s1', 's2', 's2','s1', 's2','s1', 's2','s1', 's2','s1', 's2', 's2','s1', 's2','s1', 's2','s1', 's2','s1', 's2'],
      projects: [
        {name: 'p1qpifhpasdua;shdfak;sdjfha;kdsjhf;aksdjhflskdjhfjsdh', students: ['s1', 's2']},
        {name: 'p2qiufaaksjdfkjshdfkjshadfkjshfajshdflakjsdhflakjsdhflaksj', students: ['s3', 's4']},
        {name: 'p1', students: ['s1', 's2']},
        {name: 'p1', students: ['s1', 's2']},
        {name: 'p1', students: ['s1', 's2']},
        {name: 'p1', students: ['s1', 's2']},
        {name: 'p1', students: ['s1', 's2']},
        {name: 'p1', students: ['s1', 's2']},
        {name: 'p1', students: ['s1', 's2']},
        {name: 'p1', students: ['s1', 's2']},
        {name: 'p1', students: ['s1', 's2']},
        {name: 'p1', students: ['s1', 's2']},
        {name: 'p1', students: ['s1', 's2']},
        {name: 'p1', students: ['s1', 's2']},
        {name: 'p1', students: ['s1', 's2']},
        {name: 'p1', students: ['s1', 's2']},
        {name: 'p1', students: ['s1', 's2']},
        {name: 'p1', students: ['s1', 's2']},
        {name: 'p1', students: ['s1', 's2']},
        {name: 'p1', students: ['s1', 's2']},
        {name: 'p1', students: ['s1', 's2']},
        {name: 'p1', students: ['s1', 's2']},
        {name: 'p1', students: ['s1', 's2']},
        {name: 'p1', students: ['s1', 's2']}
      ]
      
    }
  }
}

</script>

<style>

  .run {
    border: 2px solid black;
    border-radius: 10px;
    width: 90%;
    background: #D3D3D3;
    margin-bottom: 50px;
    height: 100%;
    overflow: auto;
  }

  .proj1 {
    display: inline-block;
    margin: 10px;
    border: 2px solid black;
    border-radius: 10px;
    padding: 10px;
    background: white;
    max-width: 45%;
    word-wrap: break-word
  }

  .element {
    border-bottom: 1px solid black;
    margin: 5px;
    text-align: left;
  }

  .left-list {
    float: left;
    display: inline;
    border: 2px solid black;
    border-radius: 10px;
    background: white;
    width: 20%;
    margin: 15px;
  }

  .right-list {
    display: inline;
    float: right;
    margin: 15px;
    text-align: top;
    border: 2px solid black;
    border-radius: 10px;
    width: 75%;
  }
    
  .primary {
    margin: 15px;
  }

</style>
