
/**
 * Module dependencies.
 */

var express = require('express')
  , gzippo = require('gzippo')
  , mongoStore = require('connect-mongodb')
  , url = require('url')
  , passport = require('passport')

exports.boot = function(app, config){
  bootApplication(app, config)
}

// App settings and middleware

function bootApplication(app, config) {

  app.set('showStackError', true)
  app.use(express.static(__dirname + '/public'))

  app.use(express.logger(':method :url :status'))

  app.configure(function(){

    // set views path, template engine and default layout
    app.set('views', __dirname + '/app/views')
    app.set('view engine', 'jade')
    // app.set('view options', { layout: 'layouts/default' })

    // bodyParser should be above methodOverride
    app.use(express.bodyParser())
    app.use(express.methodOverride())

    // cookieParser should be above session
    app.use(express.cookieParser())
    app.use(express.session({
      secret: 'hackfest',
      store: new mongoStore({
        url: config.db,
        collection : 'sessions'
      })
    }))

    app.use(passport.initialize())
    app.use(passport.session())

    app.use(express.favicon())

    // routes should be at the last
    app.use(app.router)
  })

  app.set('showStackError', false)

  app.locals({
      appName: 'Hackfest'
    , title: 'Welcome to Hackfest'
  })

  app.use(function (err, req, res, next) {
    app.locals({
      req: req
    })
    next()
  })

}
