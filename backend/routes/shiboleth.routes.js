var passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
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
passport.use(new SamlStrategy(
  {
    path: config.development.passport.saml.path,
    entryPoint: config.development.passport.saml.entryPoint,
    issuer: config.development.passport.saml.issuer
  },
  function(profile, done) {
    console.log(profile._json.email);
    //check if user exists in DB
    const title = profile._json.email;
    const id = profile._json.sub.toString();
    User.findOne({where: {email: title}})
      .then((studentExists) => {
      if(studentExists){
        //Student is part of the course and they can log in
        //Student info is in studentExists
        if(studentExists.name != null){
          studentExists.update({
            name: profile._json.name,
            auth_id: id
          })
          //Add this student to the student table too
          User.findOne({where: {email: title}})
          .then((createStudent) => {
            //create student if user is not an admin
            if(!studentExists.is_admin){
              Student.create({
                name: profile._json.name,
                email: profile._json.email
              })
            }
          });
        }
        done(null , studentExists);
      }
      else{
        done();
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

  app.post(config.passport.saml.path,
    passport.authenticate(config.passport.strategy,
      {
        failureRedirect: 'https://reconnect.mines.edu/notRegistered',
        failureFlash: true
      }),
    function (req, res) {
      res.redirect('/');
    }
  );

  app.get('/logout', function (req, res) {
    req.logout();
    // TODO: invalidate session on IP
    res.redirect('/');
  });

};