<template>
<center>
  <div class="profile_main">
    
    <div class="home">
      <h1> Profile </h1>
      <center>
        <article>
          <p>
            Within this field session team picker, you may fill out your profile which includes the projects that you would like to work on, as well as peers that you would like to work with, and peers
that you would like to avoid working with. None of your information is visible to any of your peers. 
          </p>
        </article>
      </center>
    </div>

    <div class="profile">
      <v-text-field label="Testing" v-model="test">
        
      </v-text-field>    
    </div>
  </div>
</center>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>

<style type="text/css">
  body { font-family: sans-serif; }

  h1 {
    font-family: serif;
    margin-bottom: 0;
  }

  article {
    width: 100%;
    text-align: left;
  }

  center {
    padding: 25px;
  }

  .home {
    display: inline-block;
  }

  .profile_main {
    width: 90%;
    border: 2px solid black;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    background: #D3D3D3;

  }

  .profile {
    display: inline-block;
  }
</style>
