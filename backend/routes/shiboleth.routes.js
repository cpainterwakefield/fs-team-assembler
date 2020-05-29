module.exports = function (app, config, passport) {

    app.get('/',
      passport.authenticate(config.passport.strategy,
        {
          successRedirect: '/student',
          failureRedirect: '/'
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