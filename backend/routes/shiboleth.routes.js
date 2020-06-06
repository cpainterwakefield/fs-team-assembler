var passport = require('passport');
const CustomStrategy = require('passport-custom').Strategy;
const config = require('../config/shib_config');
const db = require("../models");
const User = db.users;
const Student = db.students;
const Op = db.Sequelize.Op;

passport.serializeUser((user,done) => {
  done(null, user.id);
});
passport.deserializeUser((id,done) => {
  User.findByPk(id).then((user) => {
    done(null,user);
  })
});

passport.use(new CustomStrategy(
  function(req, callback) {
    var envvar864 = req.header['!~passenger-envvars'];
    var envvarDump = new Buffer(envvar864, 'base64').toString('binary');

    var ary = envvarDump.split("\0");
    var result = {};
    var i;

    for (i = 0; i < ary.length - 1; i+=2) {
      result[ary[i]] = ary[i + 1];
    }
    res.send(result);
    //check if user exists in DB
    const title = result._json.email;
    const id = result._json.sub.toString();
    User.findOne({where: {email: title}})
      .then((studentExists) => {
      if(studentExists){
        //Student is part of the course and they can log in
        //Student info is in studentExists
        if(studentExists.name != null){
          studentExists.update({
            name: result._json.name,
            auth_id: id
          })
          //Add this student to the student table too
          User.findOne({where: {email: title}})
          .then((createStudent) => {
            //create student if user is not an admin
            if(!studentExists.is_admin){
              Student.create({
                name: result._json.name,
                email: result._json.email
              })
            }
          });
        }
        callback(null , studentExists);
      }
      else{
        callback();
      }
    })
  })
);


module.exports = app => {

  app.get('/',
    passport.authenticate(config.passport.strategy,
      {
        successRedirect: 'https://reconnect.mines.edu/student',
        failureRedirect: 'https://reconnect.mines.edu/notRegistered'
      })
  );
  
  app.post(config.passport.path,
    passport.authenticate(config.passport.strategy,
      {
        failureRedirect: 'https://reconnect.mines.edu/notRegistered',
        failureFlash: true
      }),
    function (req, res) {
      res.redirect('https://reconnect.mines.edu/student');
    }
  );

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

};