var passport = require('passport');
const CustomStrategy = require('passport-custom').Strategy;
const config = require('../config/shib_config');
const db = require("../models");
const User = db.users;
const Student = db.students;
const Op = db.Sequelize.Op;

passport.serializeUser((user,done) => {
  //To create a cookie find a student with matching email to the user
  Student.findOne({
    where:{
      email: user.email
    }
  })
  //when/if that student is found return a cookie containing userID, studentID, email, and is_admin
  .then((studentFound) => {
    done(null, {
    uid: user.id,
    sid: studentFound.id,
    email: user.mail,
    minAcc: user.is_admin
    });
  })
});
passport.deserializeUser((information,done) => {
  var id = information.user.id;
  var Uemail = information.user.email;
  //if a student return student id or if admin return user id
  done(null, {
    user: {
      uid: user.id,
      sid: studentFound.id,
      email: user.mail,
      minAcc: user.is_admin
    }
  });
});

passport.use(new CustomStrategy(
  function(req, done) {
    var envvar864 = req.header['!~passenger-envvars'];
    var envvarDump = new Buffer(envvar864, 'base64').toString('binary');
    var ary = envvarDump.split("\0");
    var result = {};
    var i;

    for (i = 0; i < ary.length - 1; i+=2) {
      result[ary[i]] = ary[i + 1];
    }
    //check if user exists in DB
    const title = result.mail;
    User.findOne({where: {email: title}})
      .then((studentExists) => {
      if(studentExists){
        //Student is part of the course and they can log in
        //Student info is in studentExists
        if(studentExists.name != null){
          studentExists.update({
            name: result.displayName,
          })
          //Add this student to the student table too
          User.findOne({where: {email: title}})
          .then((createStudent) => {
            //create student if user is not an admin
            if(!studentExists.is_admin){
              Student.create({
                name: result.displayName,
                email: result.mail
              })
            }
          });
        }
        done(null , studentExists);
      }
      else{
        res.redirect('/notRegistered');
        done(null);
      }
    })
  })
);


module.exports = app => {

  app.get('/login',
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