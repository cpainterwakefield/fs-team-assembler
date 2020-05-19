import Vue from 'vue'
import VueRouter from 'vue-router'
import StudentProfile from '../views/student/Profile.vue'
import StudentEdit from '../views/student/Edit.vue'
import AdminProfile from '../views/admin/Profile.vue'
import AdminEdit from '../views/admin/Edit.vue'
import AdminRun from '../views/admin/Run.vue'

import Info from '../views/student/Info.vue'

Vue.use(VueRouter)

  const routes = [
  { path: '/student/', name: 'Profile', component: StudentProfile },
  { path: '/student/edit', name: 'Edit', component: StudentEdit },
  { path: '/student/info', name: 'Info', component: Info },
  { path: '/admin', name: 'Profile', component: AdminProfile },
  { path: '/admin/edit', name: 'Edit', component: AdminEdit },
  { path: '/admin/run', name: 'Run', component: AdminRun }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
