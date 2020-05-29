
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var SamlStrategy = require('passport-saml').Strategy;
var expressSession = require('express-session');
const keys = require('../config/keys');
const students = require('../models/student.model');

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
  students.findOne({id: profile._json.sub}).then((studentExists) => {
    if(studentExists){
      //Student is part of the course and they can log in
      //Student info is in studentExists
      students.update({
        name: profile._json.name,
        username: profile._json.email,
        authid: profile._json.sub
      })
    }
    else{
      //If not in the db then say they are not part of the course
      //If that is a mistake email CPW


    }
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
  app.get('/auth/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  }));
  
  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    console.log('you have logged in ^_^')
  });
  }


