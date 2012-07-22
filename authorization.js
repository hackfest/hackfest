

module.exports = {

    requiresLogin: function (req, res, next) {
      if (req.isAuthenticated()) { return next() }
      res.redirect('/login')
      next()
    }

  , idea: {
      hasAccess: function (req, res, next) {
        if (req.idea.author._id.toString() !== req.user._id.toString())
          res.redirect('/ideas/'+req.idea.id)
        next()
      }
    }

}
