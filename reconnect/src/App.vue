<template>
  <v-app>
<v-content class="content">
    <router-view/>
  </v-content>
  <footer padding=10px>
    <span>
      &copy; Colorado School of Mines 2021
    </span>
  </footer>
        

  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
};
</script>

<style>
  footer {
    padding: 15px;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: Navy;
    color: white;
    text-align: center;
}
  .content {
    padding: 15px;
  }

  .btn1 {
    margin: 10px;
  }

</style>
