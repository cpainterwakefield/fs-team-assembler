const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const cors = require("cors");
const passport = require("passport");
const keys = require("./config/keys");
//nom nom nom
const cookieSession = require("cookie-session");

const app = express();

//cookie settings
app.use(cookieSession({
  maxAge: 1000 * 60 * 60,
  keys: [keys.cookie.keyOne]

}));

var corsOptions = {
  origin: "http://localhost:8081",
  credentials: true
};

app.use(cors(corsOptions));

db.sequelize.sync();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());


require("./routes/routes.google")(app);
//require("./routes/shiboleth.routes")(app);
require("./routes/client.routes")(app);
require("./routes/student.routes")(app);
require("./routes/project.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// To send client queries: 
// curl -H "Content-Type: application/json" -X POST -d '{"name":"test", "description":"uwu", "min_students":"69"}' http://localhost:8080/api/projects
// Add an email
//curl -H "Content-Type: application/json" -X POST -d h'{"email":"jnunez@mymail.mines.edu"}' http://localhost:8080/api/users
