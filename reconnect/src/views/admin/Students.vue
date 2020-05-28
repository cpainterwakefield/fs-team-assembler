<template>
<center>
  <Header />
  <div class="students"> 
    <h1>Students</h1>
    <div class="table">
      <h3 class="head1">Name</h3> 
      <h3 class="head1">Email</h3> 
      <h3 class="head1">Prefers</h3> 
      <h3 class="head1">Avoids</h3> 
      <hr>
      <div class="row" v-for="student in students" :key="student.name">
        <div class="panel">
          <div class="list1">{{student.name}}</div>
        </div>
        <div class="panel">
          <div class="list1">{{student.email}}</div>
        </div>
        <div class="panel">
          <div class="list1" v-for="(prefer, i) in student.pref" :key="i">
            <div class="list2">{{prefer}}</div>
          </div>
        </div>
        <div class="panel">
          <div class="list1" v-for="(av, i) in student.avoid" :key="i">
            <div class="list2">{{av}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</center>
</template>

<script>

import Header from '@/components/HeaderAdmin.vue'

export default {
  name: 'Students',
  components: {
    Header
  },
  data() {
    return {
      valid: true,
      students: [
        {name: 'John Doe', email: 'johndoe@gmail.com', pref: ['Mickey Mouse', 'Donald Duck', 'Goofy Dog'], avoid: ['Pluto Dog']},
        {name: 'John Doe', email: 'johndoe@gmail.com', pref: ['Mickey Mouse', 'Donald Duck'], avoid: ['Pluto Dog']},
      ],
    }
  },
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

  .panel {
    display: inline-block;
    width: 20%;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-left: 1px solid grey;
    border-right: 1px solid grey;
    height: 50px;
    overflow: auto;
  }
   
  .head1 {
    display: inline-block;
    width: 20%;
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
    text-align: center;
    display: inline;
    border-bottom: 1px solid grey;
  }
</style>
