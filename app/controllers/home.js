
var Idea = mongoose.model('Idea')
  , async = require('async')
  , trending
  , featured
  , recent

Idea.trending(function (err, ideas) { trending = ideas })
Idea.recent(function (err, ideas) { recent = ideas })
Idea.featured(function (err, ideas) { featured = ideas })

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
            res.render('home/dash', results)
      })
    }
    else
      res.render('home/landing')
  })

}
