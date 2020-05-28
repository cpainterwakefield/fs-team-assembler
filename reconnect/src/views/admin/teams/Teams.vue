<template>
<center>
  <Header />
  <div class="run">
    <v-btn class="error" flat to="/admin/teams/edit">Edit</v-btn>
    <v-btn class="primary" flat>Export</v-btn>
    <hr>
    <div class="left-list">
      <h2 class="h2_2">Remaining</h2>
      <div class="element" v-for="(student, i) in students_left" :key="i">
        <span class="p1">{{student}}</span>
      </div>
    </div>
    <div class="right-list">
      <span class="proj1" v-for="project in projects" :key="project.name">
        <h2 class="h2_2">{{project.name}}</h2>
        <hr>
        <div class="element" v-for="(student, i) in project.students" :key="i">
          <span class="p1">{{student}}</span>
        </div>
      </span>
    </div>
  </div>

</center>
</template>

<script>

import Header from '@/components/HeaderAdmin.vue'

export default {
  name: 'Teams',
  components: {
    Header,
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

</style>
