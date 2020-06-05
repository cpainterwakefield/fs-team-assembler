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

const app = express();
app.use(serveStatic("./dist"));

//app.use(serveStatic(path.join()))

//cookie settings
app.use(cookieSession({
  maxAge: 1000 * 60 * 60,
  keys: [keys.cookie.keyOne]

}));

var corsOptions = {
  origin: ["http://localhost:8081", "https://accounts.google.com"],
  methods: ["OPTIONS", "POST", "GET","PUT","DELETE"],
  credentials: true,
  allowedHeaders: ["Origin", "Content-Type", "Authorization", "Accept", "X-Requested-With"],
  exposedHeaders: ["Origin"]
};

app.use(cors(corsOptions));

db.sequelize.sync();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());


//app.use('/student', routes);

require("./routes/routes.google")(app);
//require("./routes/shiboleth.routes")(app);
require("./routes/client.routes")(app);
require("./routes/student.routes")(app);
require("./routes/project.routes")(app);
require("./routes/prefer_teammate.routes")(app);
<<<<<<< HEAD
require("./routes/avoid_teammate.routes")(app);
require("./routes/vue.routes")(app);

=======
//require("./routes/vue.routes")(app, path);

app.get('/student', function(requests, response){
  response.sendFile(path.resolve(__dirname,"dist",'index.html'));
})
app.get('/admin', function(requests, response){
  response.sendFile(path.resolve(__dirname,"dist",'index.html'));
})
app.get('/student/edit', function(requests, response){
  response.sendFile(path.resolve(__dirname,"dist",'index.html'));
})
app.get('/admin/projects', function(requests, response){
  response.sendFile(path.resolve(__dirname,"dist",'index.html'));
})
app.get('/admin/edit', function(requests, response){
  response.sendFile(path.resolve(__dirname,"dist",'index.html'));
})
app.get('/admin/teams', function(requests, response){
  response.sendFile(path.resolve(__dirname,"dist",'index.html'));
})
>>>>>>> d1805f42c4f143d069ea084d46353d5cc6033af3

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// To send client queries: 
// curl -H "Content-Type: application/json" -X POST -d '{"name":"test", "description":"uwu", "min_students":"69"}' http://localhost:8080/api/projects
// Add an email
//curl -H "Content-Type: application/json" -X POST -d h'{"email":"jnunez@mymail.mines.edu"}' http://localhost:8080/api/users
