const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const cors = require("cors");
const passport = require("passport");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

db.sequelize.sync();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route


require("./routes/routes.google")(app);
//require("./routes/shiboleth.routes")(app);
require("./routes/client.routes")(app);
require("./routes/student.routes")(app);
require("./routes/project.routes")(app);

app.use(passport.initialize());
app.use(passport.session());

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// To send client queries: 
// curl -H "Content-Type: application/json" -X POST -d '{"name":"test", "description":"uwu", "min_students":"69"}' http://localhost:8080/api/projects
