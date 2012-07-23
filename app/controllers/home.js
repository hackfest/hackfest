
var Idea = mongoose.model('Idea')
  , async = require('async')

module.exports = function (app, passport) {

  app.get('/', function (req, res) {
    if (req.isAuthenticated()) {

      callback = function (err, ideas) { return ideas }

      async.parallel({
              trending: function(callback){
                Idea.trending(callback)
              }
            , featured: function(callback){
                Idea.featured(callback)
              }
            , recent: function(callback){
                Idea.recent(callback)
              }
          }
        , function(err, results) {
            if (err) return res.render('500')
            res.render('home/dash', results)
      })
    }
    else
      res.render('home/landing')
  })

}
