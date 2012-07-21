
module.exports = function (app, passport) {

  app.get('/', function (req, res) {
    if (req.isAuthenticated())
      res.render('home/dash')
    else
      res.render('home/landing')
  })

}
