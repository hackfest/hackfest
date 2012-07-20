
var User = mongoose.model('User')

module.exports = function (app, passport, auth) {

  app.get('/login', function (req, res) {
    res.render('users/login')
  })

  app.get('/auth/github', passport.authenticate('github'), function(req, res, next){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  })

  app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function(req, res, next) {
    // Successful authentication, redirect home.
    res.redirect('/')
  })

  app.get('/logout', function(req, res){
    req.logOut()
    res.redirect('/')
  })

  app.get('/account', ensureAuthenticated, function (req, res) {
    User
      .findOne({ _id: req.user._id })
      .exec(function (err, user) {
        if (err) return res.render('400')
        if (!user) return res.render('404')
        res.render('users/account', {
            user: user
        })
      })
  })

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
  }

}
