
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var expressSession = require('express-session');
const keys = require('../config/keys');
const db = require("../models");
const User = db.users;
const Student = db.students;
const Op = db.Sequelize.Op;

passport.serializeUser((user,done) => {
  //attach the id of the user to the cookie
  done(null, user.id);
});
passport.deserializeUser((id,done) => {
  //recieve the id from the cookie
  //find the user in the table of users then
  User.findByPk(id)
  .then((foundUser) => {
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



// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
  //These are keys i have and will not be putting on github ;)
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
  callbackURL: "/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {
  console.log(profile._json.email);
  //check if user exists in DB
  const title = profile._json.email;
  const id = profile._json.sub.toString();
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
          done(null,userExists);
        }
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
            done(null, userExists)
          }
          //Student already exists so finish
          else{
            done(null,userExists)
          }
        })        
      }
      //There is no user in the table that has that email
      //Meaning they are not in the class or have not been added yet
      else{
        done(null);
      }
    })
    done(null);
  })

}
));
module.exports = app => {
  // GET /auth/google
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Google authentication will involve
  //   redirecting the user to google.com.  After authorization, Google
  //   will redirect the user back to this application at /auth/google/callback
  // IMPORTANT: WHATEVER IS IN SIDE THE CLOSED BRACKETS AFTER SCOPE: BELOW IS THE INFORMATION WE GET BACK
  app.get('/auth/login',
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  }));
  
  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get('/auth/google/callback', 
  passport.authenticate('google', {
    failureRedirect: "http://localhost:8081/notRegistered",
    successRedirect: "http://localhost:8081/Student"
  }),(req, res) => {
    console.log('you have logged in ^_^');
  });
  }


