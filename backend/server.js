const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const cors = require("cors");
const passport = require("passport");
const keys = require("./config/keys");
const serveStatic = require("serve-static");
//nom nom nom
const cookieSession = require("cookie-session");
const path = require("path");
const {expressCspHeader, INLINE, NONE, SELF} = require('express-csp-header');
const router = require('express').Router();

const app = express();
app.use(serveStatic("./dist"));

//cookie settings
app.use(cookieSession({
  maxAge: 1000 * 60 * 60,
  keys: [keys.cookie.keyOne]

}));
//Cors settigs
var corsOptions = {
  origin: ["http://localhost:8080", "http://localhost:8081", "https://accounts.google.com", "https://reconnect.mines.edu"],
  methods: ["OPTIONS", "POST", "GET","PUT","DELETE"],
  credentials: true,
  allowedHeaders: ["Origin", "Content-Type", "Authorization", "Accept", "X-Requested-With"],
  exposedHeaders: ["Origin"]
};

app.use(cors(corsOptions));
//sync db with sequelize
db.sequelize.sync();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(expressCspHeader({
  directives: {
    'default-src': [SELF, INLINE,"https://fonts.googleapis.com", "https://cdn.jsdelivr.net", "https://fonts.gstatic.com"],
    'img-src': [SELF, INLINE, "https://fonts.googleapis.com", "https://cdn.jsdelivr.net", "https://fonts.gstatic.com"],
    'style-src': [SELF, INLINE, "https://fonts.googleapis.com", "https://cdn.jsdelivr.net", "https://fonts.gstatic.com"],
    'script-src': [SELF, INLINE]
  }
}));
const authcheck = (req,res,next)=>{
  if(!req['user']){
      // if user is not logged in this executes
      res.redirect("/");
  }else{
      //If they are logged in
      next();
  }
}
const ADMINauthcheck = (req,res,next)=>{
  if(!req['user']){
      // if user is not logged in this executes
      res.redirect("/");
  }else{
      //If they are logged in
      if(req['user'].user.is_admin){
          next();
      }
      else{
        res.redirect("/");
      }
  }
}
//app.use('/student', routes);

//require("./routes/routes.google")(app);
require("./routes/shiboleth.routes")(app);
require("./routes/client.routes")(app);
require("./routes/users.routes")(app);
require("./routes/student.routes")(app);
require("./routes/project.routes")(app);
require("./routes/prefer_teammate.routes")(app);
require("./routes/avoid_teammate.routes")(app);
require("./routes/project_link.routes")(app);
require("./routes/run.routes")(app);


app.get('/student/profile', authcheck,function(requests, response){
  response.sendFile(path.resolve(__dirname,"dist",'index.html'));
});
app.get('/admin/students', ADMINauthcheck,function(requests, response){
  response.sendFile(path.resolve(__dirname,"dist",'index.html'));
});
app.get('/student/edit', authcheck,function(requests, response){
  response.sendFile(path.resolve(__dirname,"dist",'index.html'));
});
app.get('/admin/projects', ADMINauthcheck,function(requests, response){
  response.sendFile(path.resolve(__dirname,"dist",'index.html'));
});
app.get('/admin/edit', ADMINauthcheck,function(requests, response){
  response.sendFile(path.resolve(__dirname,"dist",'index.html'));
});
app.get('/admin/teams', ADMINauthcheck,function(requests, response){
  response.sendFile(path.resolve(__dirname,"dist",'index.html'));
});
app.get('/admin/teams/edit', ADMINauthcheck,function(requests, response){
  response.sendFile(path.resolve(__dirname,"dist",'index.html'));
});
app.get('/notRegistered',function(requests, response){
  response.sendFile(path.resolve(__dirname,"dist",'index.html'));
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// To send client queries: 
// curl -H "Content-Type: application/json" -X POST -d '{"name":"test", "description":"uwu", "min_students":"69"}' http://localhost:8080/api/projects
// Add an email
//curl -H "Content-Type: application/json" -X POST -d h'{"email":"jnunez@mymail.mines.edu"}' http://localhost:8080/api/users
