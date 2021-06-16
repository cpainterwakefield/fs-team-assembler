<template>
<center>
  <Header />
  <div class="run">
    <v-btn class="primary" @click="doSubmit()">Submit</v-btn>
    <hr>
    <div class="left-pane">
      <div class="left-list">
        <h2 class="h2_2">Remaining</h2>
        <hr>
        <draggable group="projects" :list="nullStuds">
          <div class="element" v-for="(student, i) in nullStuds" :key="i" v-on:click="setStudentInfo(student)">
            <v-app-bar-nav-icon small class="icon1"></v-app-bar-nav-icon>
            <span class="p2">{{student.name}}</span>
        </div>
       </draggable>
       <p/>
      </div>
      <br/>
      <div class="left-list">
        <h2 class="h2_2">Student information</h2>
        <h3>(Click on student to see their preferences)</h3>
        <hr/>
        <h2 class="h2_2">{{ selectedStudentInfo.name }}</h2>
        <h3>Minor: {{ selectedStudentInfo.minor }}</h3>
        <h3>GPA: {{ selectedStudentInfo.gpa }}</h3>
        <h3>Prefers: {{ selectedStudentInfo.selection }}</h3>
        <h3>Projects:</h3>
        <ol>
          <li v-for="p in selectedStudentInfo.projects" :key="p">{{ p }}</li>
        </ol>
        <h3>Preferred teammates:</h3>
        <ul>
          <li v-for="s in selectedStudentInfo.teammates" :key="s">{{ s }}</li>
        </ul>
        <h3>Avoid:</h3>
        <ul>
          <li v-for="s in selectedStudentInfo.avoids" :key="s">{{ s }}</li>
        </ul>
        <h3>Notes:</h3>
        <span>{{ selectedStudentInfo.experience }}</span>
      </div>
    </div>
    <div class="right-list">
      <span class="proj1" v-for="model in models" :key="model.project.id">
        <b class="h2_2">{{model.project.name}} ({{model.project.min_students}}, {{model.project.max_students}})</b>
        <hr>
        <draggable :list="model.students" class="drag1" group="projects" >
          <div class="element" v-for="student in model.students" :key="student.id" v-on:click="setStudentInfo(student)">
            <v-app-bar-nav-icon small class="icon1"></v-app-bar-nav-icon>
            <span v-if="isPairedWithAvoid(student, model)" class="p2 unhappy" >{{student.name}}</span>
            <span v-else-if="isSatisfied(student, model)" class="p2 satisfied" >{{student.name}}</span>
            <span v-else class="p2" >{{student.name}}</span>
          </div>
        </draggable>
      </span>
    </div>
  </div>

</center>
</template>

<script>

import Header from '@/components/HeaderAdmin.vue'
import draggable from 'vuedraggable'
import axios from 'axios'

export default {
  name: 'Profile',
  components: {
    Header,
    draggable
  },
  data() {
    return {
      students: [],
      studentsDetail: {},
      projects: [],
      projectsModel: [],
      nullStuds: [],
      models: [],
      show: true,
      avoids: [],
      prefers: [],
      selectedStudentInfo: {}
    }
  },
  mounted() {
    let self=this;
    const requestStud = axios.get(process.env.VUE_APP_BASE_API_URL + '/students', {withCredentials: true});
    const requestProj = axios.get(process.env.VUE_APP_BASE_API_URL + '/projects', {withCredentials: true});
    const requestAvoids = axios.get(process.env.VUE_APP_BASE_API_URL + '/avoid_teammate', {withCredentials: true});
    const requestPrefers = axios.get(process.env.VUE_APP_BASE_API_URL + '/prefer_teammate', {withCredentials: true});

    axios.all([requestStud, requestProj, requestAvoids, requestPrefers]).then(axios.spread((...responses) => {
      const responseStud = responses[0]
      const responseProj = responses[1]
      const responseAvoids = responses[2]
      const responsePrefers = responses[3]

      // use/access the results
      self.students = responseStud.data
      self.projects = responseProj.data
      self.avoids = responseAvoids.data
      self.prefers = responsePrefers.data
    }))
    .then(() => {
      for (let st of this.students) {
        if (st.project_id === null)
          this.nullStuds.push(st)
      }
      for (let pr of this.projects) {
        let studList=[];
        for (let st of this.students) {
          if (st.project_id === pr.id)
            studList.push(st)
        }
        this.models.push({project: pr, students:  studList})
      }
      for (let st of this.students) {
        let detail = {}
        detail.projects = []
        let p = this.projects.find(p => p.id === st.first_project)
        if (p) detail.projects.push(p.name)
        p = this.projects.find(p => p.id === st.second_project)
        if (p) detail.projects.push(p.name)
        p = this.projects.find(p => p.id === st.third_project)
        if (p) detail.projects.push(p.name)

        detail.teammates = []
        for (let pref of this.prefers) {
          if (pref.studentId === st.id) {
            let s = this.students.find(s => s.id === pref.preferreeId)
            detail.teammates.push(s.name)
          }
        }

        detail.avoids = []
        for (let avoid of this.avoids) {
          if (avoid.studentId === st.id) {
            let s = this.students.find(s => s.id === avoid.avoideeId)
            detail.avoids.push(s.name)
          }
        }

        detail.selection = 'No preference'
        if (st.selection_preference === true) detail.selection = 'Team'
        if (st.selection_preference === false) detail.selection = 'Project'

        detail.name = st.name
        detail.minor = st.minor
        detail.gpa = st.gpa
        detail.experience = st.experience

        this.studentsDetail[st.id] = detail
      }
    })
    .catch(e => {
      // react on errors.
      self.errors.push(e)
    })
  },
  methods: {
    doSubmit: function() {
      for (let pr of this.models) {
        for (let st of pr.students) {
          st.project_id = pr.project.id
          axios.put(process.env.VUE_APP_BASE_API_URL + '/students/id/' + st.id, {
            project_id: st.project_id,
            withCredentials: true
          })
          .then(response => {
            console.log(response)
          })
          .catch(err => {
            this.errors.push(err)
          })
        }
      }
      for (let st of this.nullStuds) {
        st.project_id = null
        axios.put(process.env.VUE_APP_BASE_API_URL + '/students/id/' + st.id, {
          project_id: st.project_id,
          withCredentials: true
        })
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          this.errors.push(err)
        })
      }
    },
    isPairedWithAvoid: function(student, model) {
      return this.avoids.some(avoid =>
              student.id === avoid.studentId
              && model.students.find(other => other.id === avoid.avoideeId)
      )
    },
    isSatisfied: function(student, model) {
      if (student.selection_preference === false || student.selection_preference === null) {
        if (model.project.id === student.first_project) return true
        if (model.project.id === student.second_project) return true
        if (model.project.id === student.third_project) return true
      }
      if (student.selection_preference === true || student.selection_preference === null)
        return this.prefers.some(prefer =>
                student.id === prefer.studentId
                && model.students.find(other => other.id === prefer.preferreeId)
        )
      return false
    },
    setStudentInfo: function(student) {
      this.selectedStudentInfo = this.studentsDetail[student.id]
    }
  },
}
</script>

<style>

  .run {
    border: 2px solid black;
    border-radius: 10px;
    width: 100%;
    background: #D3D3D3;
    margin-bottom: 50px;
    height: 100%;
    overflow: auto;
  }

  .proj1 {
    display: inline-block;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 3px;
    margin-right: 3px;
    border: 2px solid black;
    border-radius: 10px;
    padding: 5px;
    background: white;
    width: 19%;
    word-wrap: break-word;
    height: 220px;
    overflow: auto;
  }

  .element {
    margin: 2px;
    text-align: left;
    padding-left: 0;
    padding-right: 0;
  }

  .left-pane {
    float: left;
    width: 15%;
    display: inline;
    position: fixed;
    top: 170px;
    left: 35px;
  }

  .left-list {
    border: 2px solid black;
    border-radius: 10px;
    background: white;
    margin: 15px;
    min-height: 100px;
    display: block;
    width: 100%;
  }

  .right-list {
    display: inline;
    float: right;
    margin: 15px;
    border: 2px solid black;
    border-radius: 10px;
    width: 82%;
  }
    
  .primary {
    margin: 15px;
  }

  .p2 {
    font-size: 12px;
  }

  .h2_2 {
    font-size: 15px;
  }

  h3 {
    font-size: 12px;
  }

  .icon1 {
    
  }

  li {
    text-align: left;
  }

  .drag1 {
    height: 100%;
  }

  .satisfied {
    color: green;
  }

  .unhappy {
    color: red;
  }

</style>
