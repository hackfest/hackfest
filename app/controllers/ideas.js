
var User = mongoose.model('User')
  , Idea = mongoose.model('Idea')

module.exports = function (app, passport, auth) {

  app.param('ideaId', function (req, res, next, ideaId) {
    Idea
      .findOne({ _id: ideaId })
      .populate('author')
      .populate('comments.user')
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
      , description: req.body.description
      , author: req.user._id
    })

    idea.save(function (err) {
      if (err && Object.keys(err.errors).length) {
        return res.render('ideas/new', {
            title: 'Propose your idea for the hackfest'
          , errors: err.errors
        })
      }

      res.redirect('/ideas/'+idea.id)
    })
  })

  app.get('/ideas/:ideaId', auth.requiresLogin, function (req, res) {
    res.render('ideas/show', {
        idea: req.idea
      , title: req.idea.title
    })
  })

  app.get('/ideas/:ideaId/edit', auth.requiresLogin, function (req, res) {
    res.render('ideas/edit', {
        idea: req.idea
      , title: req.idea.title
    })
  })

  app.put('/ideas/:ideaId', auth.requiresLogin, function (req, res) {
    var idea = req.idea

    idea.title = req.body.title
    idea.description = req.body.description

    idea.save(function (err) {
      if (err && Object.keys(err.errors).length) {
        return res.render('ideas/edit', {
            title: 'Propose your idea for the hackfest'
          , idea: idea
          , errors: err.errors
        })
      }

      res.redirect('/ideas/'+idea.id)
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

  app.post('/ideas/:ideaId/vote', auth.requiresLogin, function (req, res) {
    var idea = req.idea

    if (idea.votes.indexOf(req.user._id) === -1) {
      idea.votes.push(req.user._id)
      idea.save(function (err) {
        if (err) return res.render('500')
        res.redirect('/ideas/'+idea.id)
      })
    }
    else
      res.redirect('/ideas/'+idea.id)
  })

  app.del('/ideas/:ideaId/vote', auth.requiresLogin, function (req, res) {
    var idea = req.idea
    if (idea.votes.indexOf(req.user._id) !== -1) {
      idea.votes.splice(idea.votes.indexOf(req.user._id), 1)
      idea.save(function (err) {
        if (err) return res.render('500')
        res.redirect('/ideas/'+idea.id)
      })
    }
    else
      res.redirect('/ideas/'+idea.id)
  })

  app.post('/ideas/:ideaId/comment', auth.requiresLogin, function (req, res) {
    var idea = req.idea
    if (!req.body.comment.body.length)
      return res.redirect('/ideas/'+idea.id+'#comments')
    idea.comments.push({
        user: req.user._id
      , body: req.body.comment.body
    })
    idea.save(function (err) {
      if (err) return res.redirect(400, '/ideas/'+idea.id+'#comments')
      res.redirect('/ideas/'+idea.id+'#comments')
    })
  })

}
