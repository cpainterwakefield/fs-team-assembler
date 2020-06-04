import Vue from 'vue'
import VueRouter from 'vue-router'
import StudentProfile from '../views/student/Profile.vue'
import StudentEdit from '../views/student/Edit.vue'
import AdminStudents from '../views/admin/Students.vue'
import AdminTeams from '../views/admin/teams/Teams.vue'
import AdminEditTeams from '../views/admin/teams/Edit.vue'
import AdminEdit from '../views/admin/Edit.vue'
import AdminProjects from '../views/admin/Projects.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/student/', name: 'Profile', component: StudentProfile, meta: {title: 'Profile'} },
  { path: '/student/Edit', name: 'Edit', component: StudentEdit, meta: {title: 'Edit'} },
  { path: '/admin', name: 'Students', component: AdminStudents, meta: {title:'Students'} },
  { path: '/admin/teams', name: 'Teams', component: AdminTeams, meta: {title: 'Teams'} },
  { path: '/admin/teams/edit', name: 'Edit Teams', component: AdminEditTeams, meta: {title: 'Edit'} },
  { path: '/admin/edit', name: 'Edit', component: AdminEdit, meta: {title: 'Edit'} },
  { path: '/admin/projects', name: 'Projects', component: AdminProjects, meta: {title: 'Projects'} }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
