<template>
<center>
  <div class="profile">
    <div class="add">
      <div class="add_element">
        <v-card>
          <v-card-text class="v-card-text1">
            <v-form v-model="valid">
              <v-file-input label="Add Student (JSON)" outlined accept=".txt" background-color="white" multiple></v-file-input>
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
              <v-file-input label="Add Project (JSON)" outlined accept=".txt" background-color="white" multiple></v-file-input>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="primary">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</center>
</template>

<script>
export default {
  name: 'Profile',
  components: {
  },
  data() {
    return {
      valid: true
    }
  }
}

</script>

<style>

  .add_element {
    width: 40%;
    display: inline-block;
    margin-left: 20px;
    margin-right: 20px;
  }
</style>
