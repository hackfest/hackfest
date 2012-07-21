/* Main application entry file. Please note, the order of loading is important.
 * Configuration loading and booting of controllers and custom error handlers */

var express = require('express')
  , fs = require('fs')
  , passport = require('passport')

// Load configurations
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , auth = require('./authorization')

// Bootstrap db connection
exports = mongoose = require('mongoose')
mongoose.connect(config.db)
exports = Schema = mongoose.Schema

// Bootstrap models
var models_path = __dirname + '/app/models'
  , model_files = fs.readdirSync(models_path)
model_files.forEach(function (file) {
  require(models_path+'/'+file)
})

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// authentication strategy
var GitHubStrategy = require('passport-github').Strategy
passport.use(new GitHubStrategy({
    clientID: config.appId,
    clientSecret: config.secret,
    callbackURL: config.callback
  },
  function(accessToken, refreshToken, profile, done) {
    var User = mongoose.model('User')
    User.findOne({ 'github.id': profile.id }, function (err, user) {
      if (!user) {
        user = new User({
            name: profile.displayName
          , email: profile.emails[0].value
          , username: profile.username
          , github: profile._json
        })
        user.save()
      }
      return done(err, user)
    })
  }
))

var app = express()                                       // express app
require('./settings').boot(app, config, passport)         // Bootstrap application settings

// Bootstrap controllers
var controllers_path = __dirname + '/app/controllers'
  , controller_files = fs.readdirSync(controllers_path)
controller_files.forEach(function (file) {
  require(controllers_path+'/'+file)(app, passport, auth)
})

// assume "not found" in the error msgs
// is a 404. this is somewhat silly, but
// valid, you can do whatever you like, set
// properties, use instanceof etc.
app.use(function(err, req, res, next){
  // treat as 404
  if (~err.message.indexOf('not found')) return next()

  // log it
  console.error(err.stack)

  // error page
  res.status(500).render('500')
})

// assume 404 since no middleware responded
app.use(function(req, res, next){
  res.status(404).render('404', { url: req.originalUrl })
})


// Start the app by listening on <port>
var port = process.env.PORT || 4000
app.listen(port)
console.log('Express app started on port '+port)
