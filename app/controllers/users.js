
module.exports = function (app, passport) {

  app.get('/login', function (req, res) {
    res.render('users/login')
  })

  app.get('/auth/github', passport.authenticate('github'), function(req, res, next){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  })

  app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function(req, res, next) {
    console.log(req.isAuthenticated())
    // Successful authentication, redirect home.
    res.redirect('/')
  })

  app.get('/logout', function(req, res){
    req.logOut()
    res.redirect('/')
  })

}
