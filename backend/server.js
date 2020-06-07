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

//cookie settings
app.use(cookieSession({
  maxAge: 1000 * 60 * 60,
  keys: [keys.cookie.keyOne]

}));

var corsOptions = {
  origin: ["http://localhost:8081", "https://accounts.google.com", "https://reconnect.mines.edu"],
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

//require("./routes/routes.google")(app);
require("./routes/shiboleth.routes")(app);
require("./routes/client.routes")(app);
require("./routes/student.routes")(app);
require("./routes/project.routes")(app);
require("./routes/prefer_teammate.routes")(app);
require("./routes/avoid_teammate.routes")(app);
require("./routes/project_link.routes")(app);

app.get('/dump', function(req, res){
  var envvar864 = req.header['!~passenger-envvars'];
    var envvarDump = new Buffer(envvar864, 'base64').toString('binary');
    var ary = envvarDump.split("\0");
    var result = {};
    var i;

    for (i = 0; i < ary.length - 1; i+=2) {
      result[ary[i]] = ary[i + 1];
    }
  res.send(result.mail);
})

app.get('/student', function(requests, response){
  response.sendFile(path.resolve(__dirname,"dist",'index.html'));
});
app.get('/admin', function(requests, response){
  response.sendFile(path.resolve(__dirname,"dist",'index.html'));
});
app.get('/student/edit', function(requests, response){
  response.sendFile(path.resolve(__dirname,"dist",'index.html'));
});
app.get('/admin/projects', function(requests, response){
  response.sendFile(path.resolve(__dirname,"dist",'index.html'));
});
app.get('/admin/edit', function(requests, response){
  response.sendFile(path.resolve(__dirname,"dist",'index.html'));
});
app.get('/admin/teams', function(requests, response){
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
