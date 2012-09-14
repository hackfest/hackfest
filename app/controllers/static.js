
module.exports = function (app, passport, auth) {

  app.get('/faq', function (req, res) {
    res.render('static/faq', {
        title: 'FAQ'
    })
  })

  app.get('/about', function (req, res) {
    res.render('static/about', {
        title: 'About'
    })
  })

  app.get('/schedule', function (req, res) {
    res.render('static/schedule', {
        title: 'Hackfest 3 Schedule'
    })
  })

}
