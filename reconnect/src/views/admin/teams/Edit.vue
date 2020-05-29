<template>
<center>
  <Header />
  <div class="run">
    <v-btn class="primary" flat>Submit</v-btn>
    <hr>
    <div class="left-list">
      <h2 class="h2_2">Remaining</h2>
      <draggable v-model="students_left" group="projects">
        <div class="element" v-for="(student, i) in students_left" :key="i">
          <v-app-bar-nav-icon small class="icon1"></v-app-bar-nav-icon>
          <span class="p1">{{student}}</span>
        </div>
      </draggable>
    </div>
    <div class="right-list">
      <span class="proj1" v-for="project in projects" :key="project.name">
        <h2 class="h2_2">{{project.name}} ({{project.min}}, {{project.max}})</h2>
        <hr>
        <draggable v-model="project.students" group="projects">
          <div class="element" v-for="(student, i) in project.students" :key="i">
            <v-app-bar-nav-icon small class="icon1"></v-app-bar-nav-icon>
            <span class="p1">{{student}}</span>
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
        {name: 'p1qpifhpasdua;shdfak;sdjfha;kdsjhf;aksdjhflskdjhfjsdh', students: ['s1', 's2'], min: 2, max: 5},
        {name: 'p2qiufaaksjdfkjshdfkjshadfkjshfajshdflakjsdhflakjsdhflaksj', students: ['s3', 's4'], min:2, max: 5},
      ]
      
    }
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
    border: 1px solid grey;
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
  }

  .h2_2 {
    font-size: 15px;
  }

  .icon1 {
    
  }
</style>
