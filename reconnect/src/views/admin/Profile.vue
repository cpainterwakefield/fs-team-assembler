<template>
<center>
  <Header />
  <div class="profile">
    <div class="left">
      <v-text-field background-color="white" label="Search a Student to View Profile" outlined v-model="student"></v-text-field>
    </div>
    <div class="right">
      <v-btn color="primary" flat>Submit</v-btn>
    </div>
    <v-text-field class="text" readonly background-color="white" filled color="black" label="Name"></v-text-field>
    <v-text-field class="text" readonly background-color="white" filled color="black" label="Email"></v-text-field>
    <v-text-field class="text" readonly background-color="white" filled color="black" label="Minor"></v-text-field>     
    <v-text-field class="text" readonly background-color="white" filled color="black" label="GPA"></v-text-field>     
    <v-text-field class="text" readonly background-color="white" filled color="black" label="First Preference" :placeholder="firstProj"></v-text-field>
    <v-text-field class="text" readonly background-color="white" filled color="black" label="Second Preference" :placeholder="secondProj"></v-text-field>
    <v-text-field class="text" readonly background-color="white" filled color="black" label="Third Preference" :placeholder="thirdProj"></v-text-field>
    <div class="pref1">
      <v-list flat dense max-height=105px class="overflow-y-auto" width="250">
        <h5><u>Preferred Team</u></h5>
        <v-list-item v-for="(pref, i) in team_pref" :key="i">
          <v-list-item-title v-text="pref"></v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
    <div class="pref1">
      <v-list flat dense max-height=105px class="overflow-y-auto" width="250">
        <h5><u>Avoid Team</u></h5>
        <v-list-item v-for="(avoid, i) in team_avoid" :key="i">
          <v-list-item-title v-text="avoid"></v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </div>
</center>
</template>

<script>

import Header from '@/components/HeaderAdmin.vue'

export default {
  name: 'Profile',
  components: {
    Header
  },
  data() {
    return {
      valid: true,
      students: ['s1', 's2'],
      student: ""
    }
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

  .profile {
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
</style>
