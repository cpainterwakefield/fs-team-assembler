var passport = require('passport');
const CustomStrategy = require('passport-custom').Strategy;
const config = require('../config/shib_config');
const db = require("../models");
const User = db.users;
const Student = db.students;
const Op = db.Sequelize.Op;

//This handles creating a cookie to give to the user
passport.serializeUser((user,done) => {
  //attach the id of the user to the cookie
  done(null, user.id);
});
passport.deserializeUser((id,done) => {
  //recieve the id from the cookie
  //find the user in the table of users then
  console.log(id);
  User.findOne({where: {id: id}})
  .then((foundUser) => {
    console.log(foundUser);
    if(foundUser.is_admin){
      //If foundUser is an admin return only foundUser since no student exists
      done(null, {user: foundUser});
    }else{
      var studentEmail = foundUser.email;
      Student.findOne({where: {email: studentEmail}})
      .then((foundStudent) =>{
        //if a student is found 
        if(foundStudent){
          //return user and student so we can access both of those
          done(null, {
            user: foundUser,
            student: foundStudent
          });
        }
      })
    }
  })
});

passport.use(new CustomStrategy(
  function(req, done) {
    var envvar864 = req.headers['!~passenger-envvars'];
    var envvarDump = new Buffer(envvar864, 'base64').toString();
    var ary = envvarDump.split("\0");
    var result = {};
    var i;

    for (i = 0; i < ary.length - 1; i+=2) {
      result[ary[i]] = ary[i + 1];
    }
    //check if user exists in DB
    const title = result.mail;
    User.findOne({where: {email: title}})
      .then((userExists) => {
      //If they exist then add their information from the shibboleth envvar
      if(userExists){
        //if user.name is null then there is no info on that user yet
        //so lets add it
        if(userExists.name == null){
          userExists.update({
            name: result.displayName
          })
        }
        //If user is admin then they should not be added as a student
        if(userExists.is_admin){
          console.log("admin");
          done(null,userExists);
          return;
        }else{
          //Add this user information to student table too if they exist
          Student.findOne({where: {email: title}})
          .then((createStudent) => {
            //if no student exists then create one
            if(!createStudent){
              Student.create({
                name: result.displayName,
                email: result.mail
              })
              //student created now finish
              return done(null, userExists);
            }
          //Student already exists so finish
          else{
            done(null,userExists);
          }
          })        
        }
      }
      //There is no user in the table that has that email
      //Meaning they are not in the class or have not been added yet
      else{
        done();
      }
    })
  })
);


module.exports = app => {

  app.get(config.passport.path,
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
      if(req['user'].user.is_admin){
        res.redirect("/admin");
        return;
      }
      res.redirect("/student");
    }
  );

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

};