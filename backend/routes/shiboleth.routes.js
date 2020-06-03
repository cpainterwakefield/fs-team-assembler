var passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const config = require('../config/shib_config');

passport.serializeUser(function (user, done) {
  
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  
  done(null, user);
});
passport.use(new SamlStrategy(
  {
    path: config.development.passport.saml.path,
    entryPoint: config.development.passport.saml.entryPoint,
    issuer: config.development.passport.saml.issuer,
    cert: config.development.passport.saml.cert
  },
  function (profile, done) {
    return done(null,
      {
        id: profile.uid,
        email: profile.email,
        displayName: profile.cn,
        firstName: profile.givenName,
        lastName: profile.sn
      });
  })
);


module.exports = app => {

  app.get('/student', function (req, res) {
    if (req.isAuthenticated()) {
      res.render('student',
        {
          user: req.user
        });
    } else {
      res.render('student',
        {
          user: null
        });
    }
  });

  app.get('/auth/login',
    passport.authenticate(config.passport.strategy,
      {
        successRedirect: '/student',
        failureRedirect: '/notRegistered'
      })
  );

  app.post(config.passport.saml.path,
    passport.authenticate(config.passport.strategy,
      {
        failureRedirect: '/',
        failureFlash: true
      }),
    function (req, res) {
      res.redirect('/');
    }
  );

  app.get('/profile', function (req, res) {
    if (req.isAuthenticated()) {
      res.render('profile',
        {
          user: req.user
        });
    } else {
      res.redirect('/login');
    }
  });

  app.get('/logout', function (req, res) {
    req.logout();
    // TODO: invalidate session on IP
    res.redirect('/');
  });

};