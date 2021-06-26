import Vue from 'vue'
import VueRouter from 'vue-router'
import StudentProfile from '../views/student/Profile.vue'
import StudentEdit from '../views/student/Edit.vue'
import AdminStudents from '../views/admin/Students.vue'
import AdminTeams from '../views/admin/teams/Teams.vue'
import AdminEditTeams from '../views/admin/teams/Edit.vue'
import AdminEdit from '../views/admin/Edit.vue'
import AdminProjects from '../views/admin/Projects.vue'
import NotFound from '../views/notFound.vue'
import LogIn from '../views/Home.vue'
import Error from '../views/Error.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: LogIn, meta: {title: 'Information'} },
  { path: '/student/', name: 'View Profile', component: StudentProfile, meta: {title: 'Profile'} },
  { path: '/student/Edit', name: 'Edit Profile', component: StudentEdit, meta: {title: 'Edit'} },
  { path: '/admin', name: 'Students', component: AdminStudents, meta: {title:'Students'} },
  { path: '/admin/teams', name: 'Teams', component: AdminTeams, meta: {title: 'Teams'} },
  { path: '/admin/teams/edit', name: 'Edit Teams', component: AdminEditTeams, meta: {title: 'Edit'} },
  { path: '/admin/edit', name: 'Edit Info', component: AdminEdit, meta: {title: 'Edit'} },
  { path: '/admin/projects', name: 'Projects', component: AdminProjects, meta: {title: 'Projects'} },
  { path: '/notRegistered', name: 'Not Registered', component: NotFound, meta: {title: 'Not Found'} },
  { path: '/error', name: 'Error', component: Error, meta: {title: 'An error occurred'} }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  /* It will change the title when the router is change*/
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router
