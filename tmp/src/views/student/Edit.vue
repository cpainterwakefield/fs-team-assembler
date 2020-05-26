<template>
<center>
  <div class="edit_main">
    <h1>Edit Your Profile </h1>
    <hr>
    <v-card>
      <v-card-text class="v-card-text1">
        <v-form v-model="valid"> 
          <div class="top">
            <v-layout wrap>
              <v-flex>
                <div class="left-questions">
                  <v-text-field class="text" v-model="minor" :rules="[v => !!v || 'This is required']" required background-color="white" outlined label="Minor"></v-text-field>
                  <v-text-field class="text" v-model="gpa" :rules="[v => !!v || 'This is required']" required background-color="white" outlined label="GPA" ></v-text-field>
                </div>
              </v-flex>
              <v-flex>
                <div class="right-pref">
                  <v-radio-group v-model="preference" label="I Prefer" mandatory>
                    <v-radio name="preference" label="Doesn't Matter" value="2"></v-radio>                
                    <v-radio name="preference" label="My Chosen Projects" value="0"></v-radio>
                    <v-radio name="preference" label="My Chosen Teammates" value="1"></v-radio>                
                  </v-radio-group>
                </div>
              </v-flex>
            </v-layout>
          </div>
          <hr>
          <div class="bottom">
            <h2> Your Choices </h2>
            <v-layout wrap>
              <v-flex>
                <div class="project_pref">
                  <h3> Project Preferences </h3>
                  <v-select class="sel1" :rules="[v => !!v || 'This is required']" required label="First Preference" outlined background-color="white" :items=projects v-model="firstProj"></v-select>
                  <v-select class="sel1" :rules="[v => !!v || 'This is required']" required label="Second Preference" outlined background-color="white" :items=projects v-model="secondProj"></v-select>
                  <v-select class="sel1" :rules="[v => !!v || 'This is required']" required label="Third Preference" outlined background-color="white" :items=projects v-model="thirdProj"></v-select>
                </div>
              </v-flex>
              <v-flex>
                <div class="teammate_pref">
                  <h3> Team Preferences </h3>
                  <v-select width=50px multiple label="Prefer Teammates" outlined background-color="white" :items=students v-model="team_pref"></v-select>
                  <v-select multiple label="Avoid Teammates" outlined background-color="white" :items=students v-model="team_avoid"></v-select>
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
        </v-form>
      </v-card-text>
      <v-card-actions class="v-card-text1">
        <v-btn color="primary" :disabled="!valid">Submit</v-btn>
      </v-card-actions>
    </v-card>
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
      preference: "Doesn't Matter",
      projects: ['dummy1 qwertyuiopasdfghjklzxcvbnm,.'],
      students: ['john doe', 'jane doe'],
      firstProj: "",
      secondProj: "",
      thirdProj: "",
      team_pref: [],
      team_avoid: [],
      valid: true
    }
  }
}
</script>

<style type="text/css">
  body { font-family: sans-serif; }

  h1 {
    font-family: serif;
    margin-bottom: 0;
    color: black;
    font-weight: bold; 
  }

  h2 {
    text-align: left;
    color: black;
    font-weight: bold;
  }  

  h3 {
    text-align: left;
    color: black;
    font-weight: bold;
  }

  p {
    text-align: left;
    color: black;
  }

  center {
    padding: 25px;
  }

  .sel1 {
    width: 520px;
  }
  
  .v-card-text1 {
    background: #D3D3D3;
  }

  .edit_main {
    display: inline-block;
    width: 90%;
    border: 2px solid black;
    border-radius: 10px;
    text-align: center;
    background: #D3D3D3; 
    margin: 35px;
  }

  .left-questions {
    float: left;
    width: 90%;
    display: inline-block;
    padding: 10px;
    margin: 10px;
  }

  .right-pref {
    float: right;
    width: 90%;
    display: inline-block;
    padding: 10px;
    margin: 10px;
  }

  .project_pref {
    width: 90%;
  }

  .bottom {
    margin: 10px; 
    width: 90%;
  }

  .experience {
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
