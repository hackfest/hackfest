/* Main application entry file. Please note, the order of loading is important.
 * Configuration loading and booting of controllers and custom error handlers */

var express = require('express')
  , fs = require('fs')
  , passport = require('passport')

// Load configurations
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]

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

var app = express()                // express app
require('./settings').boot(app, config)         // Bootstrap application settings

// Bootstrap controllers
var controllers_path = __dirname + '/app/controllers'
  , controller_files = fs.readdirSync(controllers_path)
controller_files.forEach(function (file) {
  require(controllers_path+'/'+file)(app, passport)
})

// Start the app by listening on <port>
var port = process.env.PORT || 4000
app.listen(port)
console.log('Express app started on port '+port)
