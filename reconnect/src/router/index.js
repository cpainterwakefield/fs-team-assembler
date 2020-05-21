import Vue from 'vue'
import VueRouter from 'vue-router'
import StudentProfile from '../views/student/Profile.vue'
import StudentEdit from '../views/student/Edit.vue'
import AdminProfile from '../views/admin/Profile.vue'
import AdminRun from '../views/admin/Run.vue'

Vue.use(VueRouter)

  const routes = [
  { path: '/student/', name: 'Profile', component: StudentProfile, meta: {title: 'Profile'} },
  { path: '/student/Edit', name: 'Edit', component: StudentEdit, meta: {title: 'Edit'} },
  { path: '/admin', name: 'Profile', component: AdminProfile, meta: {title:'Profile'} },
  { path: '/admin/run', name: 'Run', component: AdminRun, meta: {title: 'Run'} }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
