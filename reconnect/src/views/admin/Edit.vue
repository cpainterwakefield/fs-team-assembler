<template>
<center>
  <Header />
  <div class="edit">
    <div class="add">
      <h2 class="h2_1">Add Student(s)</h2>
      <div class="add_element">
        <v-card>
          <v-card-text class="v-card-text1">
            <v-form v-model="valid">
              <v-file-input label="Add All Students (JSON)" outlined accept=".txt" background-color="white" multiple></v-file-input>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="primary">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div class="add_element">
        <v-card>
          <v-card-text class="v-card-text1">
            <v-form v-model="valid">
              <v-file-input label="Add Single Student (JSON)" outlined accept=".txt" background-color="white" multiple></v-file-input>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="primary">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <hr>
 
      <h2 class="h2_1">Add Project(s)</h2>
       <div class="add_element">
        <v-card>
          <v-card-text class="v-card-text1">
            <v-form v-model="valid">
              <v-file-input label="Add All Projects (JSON)" outlined accept=".txt" background-color="white" multiple></v-file-input>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="primary">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div class="add_element">
        <v-card>
          <v-card-text class="v-card-text1">
            <v-form v-model="valid">
              <v-file-input label="Add Single Project (JSON)" outlined accept=".txt" background-color="white" multiple></v-file-input>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="primary">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <hr>

      <h2 class="h2_1">Delete Students/Projects</h2>
       <div class="add_element">
        <v-card>
          <v-card-text class="v-card-text1">
            <v-form v-model="valid">
              <v-select multiple label="Delete Student(s)" outlined background-color="white" :items=students v-model="team_pref"></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="primary">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div class="add_element">
        <v-card>
          <v-card-text class="v-card-text1">
            <v-form v-model="valid">
              <v-select multiple label="Delete Project(s)" outlined background-color="white" :items=projects v-model="team_pref"></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="primary">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
    <hr>
    <div class="btn1">
     <v-btn class="error" flat>CLEAR STUDENTS</v-btn> 
     <v-btn class="error" flat>CLEAR PROJECTS</v-btn> 
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
      student: "",
      projects: ['p1', 'p2']
    }
  }
}

</script>

<style>

  .right {
    margin-top: 25px;
    display: inline-block;
  }

  .h2_1 {
    text-align: center;
  }

  .left {
    display: inline-block;
    width: 500px;
    margin-right: 25px;
  }

  .add_element {
    width: 40%;
    display: inline-block;
    margin: 50px;
    background: white;
  }

  .add {
    margin-bottom: 50px;
  }

  .profiles {
    border: 2px solid black;
    border-radius: 10px;
    width: 90%;
    padding: 20px;
    background: #D3D3D3;
    margin-bottom: 50px;
  }
  
  .pref1 {
    display: inline-block;
  }

  .edit {
    border: 2px solid black;
    border-radius: 10px; 
    background: #D3D3D3;
    margin-bottom: 50px;
    padding: 20px;
    width: 90%;
  }

  .error {
    margin: 10px;
  }
</style>
