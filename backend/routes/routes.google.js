
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var SamlStrategy = require('passport-saml').Strategy;
var expressSession = require('express-session');
const keys = require('../config/keys');

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
function(token, tokenSecret, profale, done){
  URLSearchParams.findOrCreate({googleId: profile.id}, function(err, user) {
    return done(err, user);
  });
}
));
module.exports = app => {
  // GET /auth/google
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Google authentication will involve
  //   redirecting the user to google.com.  After authorization, Google
  //   will redirect the user back to this application at /auth/google/callback
  app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
  
  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
  }


