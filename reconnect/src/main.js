import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  router,
  axios,
  vuetify,
  render: h => h(App)
}).$mount('#app')
