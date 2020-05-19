<template>
<center>
  <div class="edit_main">
    
    <div>
        <h1>Edit Your Profile </h1>
      <hr>
      <div class="top">
        <v-layout wrap>
          <v-flex>
            <div class="left-questions">
              <v-text-field class="text" background-color="white" outlined v-model="Minor" label="Minor"></v-text-field>
              <v-text-field class="text" background-color="white" outlined v-model="GPA" label="GPA" ></v-text-field>
            </div>
            </v-flex>
            <v-flex>
              <div class="right-pref">
                <v-radio-group label="I Prefer" v-model="preferece" >
                  <v-radio name="preference" label="My Chosen Projects" value="0"></v-radio>
                  <v-radio name="preference" label="My Chosen Teammates" value="1"></v-radio>                
                  <v-radio name="preference" label="Doesn't Matter" value="2"></v-radio>                
                </v-radio-group>
              </div>
            </v-flex>
        </v-layout>
      </div>
      <hr>
      <div>
        <h2> Your Choices </h2>
        <v-layout wrap>
          <v-flex>
            <div class="project_pref">
              <h3> Project Preferences </h3>
              <v-select label="First Preference" outlined background-color="white" options=projects value="firstProj"></v-select>
              <v-select label="Second Preference" outlined background-color="white" options=projects value="secondProj"></v-select>
              <v-select label="Third Preference" outlined background-color="white" options=projects value="thirdProj"></v-select>
            </div>
          </v-flex>
          <v-flex>
            <div class="teammate_pref">
              <h3> Team Preferences </h3>
              <v-select multiple label="Prefer Teammates" outlined background-color="white" options=projects value="team_pref"></v-select>
              <v-select multiple label="Avoid Teammates" outlined background-color="white" options=projects value="team-avoid"></v-select>
            </div>
          </v-flex>
        </v-layout>
      </div>
      <hr> 
      <div class="experience">
        <h2> Experience/Rationale: </h2>
        <p><b> Enter any additional information that should be considered. </b></p>
        <p> Note: This is simply read by an advisor, not by clients or potential employers. </p>
        <v-text-field background-color="white" outlined v-model="experience" label="Experience/Rationale"></v-text-field>
      </div>
    </div>
  </div>
</center>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      projects: [],
      students: [],
      firstProj: "",
      secondProj: "",
      thirdProj: "",
      team_pref: [],
      team_avoid: []
    }
  }
}
</script>

<style type="text/css">
  body { font-family: sans-serif; }

  h1 {
    font-family: serif;
    margin-bottom: 0;
  }

  h2 {
    text-align: left;
  }  

  h3 {
    text-align: left;
  }

  p {
    text-align: left;
  }

  center {
    padding: 25px;
  }

  .edit_main {
    display: inline-block;
    width: 90%;
    border: 2px solid black;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    background: #D3D3D3;

  }

  .left-questions {
    float: left;
    width: 90%;
    display: inline-block;
    padding: 10px;
  }

  .right-pref {
    float: right;
    width: 90%;
    display: inline-block;
    padding: 10px;
  }

  .project_pref {
    width: 90%;
  }

</style>
