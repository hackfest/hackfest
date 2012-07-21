
var User = mongoose.model('User')

module.exports = function (app, passport, auth) {

  app.param('username', function (req, res, next, username) {
    User
      .findOne({ username: username })
      .exec(function (err, profile) {
        if (err) return next(err)
        if (!profile) return next(new Error ('User not found'))
        req.profile = profile
        next()
      })
  })

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
        if (err) return res.render('404')
        if (!user) return res.render('404')
        res.render('users/account', {
            user: user
        })
      })
  })

  app.get('/profile/:username', ensureAuthenticated, function (req, res) {
    res.render('users/profile', {
      user: req.profile
    })
  })

  app.get('/hackers', ensureAuthenticated, function (req, res) {
    User
      .find()
      .exec(function (err, users) {
        if (err) return res.render('404')
        if (!users) return res.render('404')
        res.render('users/hackers', {
            users: users
        })
      })
  })

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
  }

}
