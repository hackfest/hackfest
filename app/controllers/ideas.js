
var User = mongoose.model('User')
  , Idea = mongoose.model('Idea')

module.exports = function (app, passport, auth) {

  app.param('ideaId', function (req, res, next, ideaId) {
    Idea
      .findOne({ _id: ideaId })
      .populate('author')
      .exec(function (err, idea) {
        if (err) return next(err)
        if (!idea) return next(new Error('Idea not found'))
        req.idea = idea
        next()
      })
  })

  app.get('/ideas/new', auth.requiresLogin, function (req, res) {
    res.render('ideas/new', {
        title: 'Propose your idea for the hackfest'
    })
  })

  app.post('/ideas', auth.requiresLogin, function (req, res) {
    var idea = new Idea({
        title: req.body.title
      , description: require("github-flavored-markdown").parse(req.body.description)
      , author: req.user._id
    })

    idea.save(function (err) {
      console.log(err)
      if (err) return res.render('500')
      res.redirect('/ideas/'+idea.id)
    })
  })

  app.get('/ideas/:ideaId', auth.requiresLogin, function (req, res) {
    res.render('ideas/show', {
        idea: req.idea
      , title: req.idea.title
    })
  })

  app.get('/ideas', auth.requiresLogin, function (req, res) {
    Idea
      .find()
      .populate('author')
      .exec(function (err, ideas) {
        if (err) return res.render('500')
        res.render('ideas', {
            ideas: ideas
          , title: 'Ideas for hackfest'
        })
      })
  })

}
