
/**
 * Module dependencies.
 */

var express = require('express')
  , gzippo = require('gzippo')
  , mongoStore = require('connect-mongodb')
  , url = require('url')

exports.boot = function(app, config, passport){
  bootApplication(app, config, passport)
}

// App settings and middleware

function bootApplication(app, config, passport) {

  app.set('showStackError', true)
  app.use(express.static(__dirname + '/public'))

  app.use(express.logger(':method :url :status'))

  app.configure(function(){

    // set views path, template engine and default layout
    app.set('views', __dirname + '/app/views')
    app.set('view engine', 'jade')
    // app.set('view options', { layout: 'layouts/default' })

    // cookieParser should be above session
    app.use(express.cookieParser())

    // bodyParser should be above methodOverride
    app.use(express.bodyParser())
    app.use(express.methodOverride())

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

  app.use(function (err, req, res, next) {
    app.locals({
        appName: 'Hackfest'
      , title: 'Welcome to Hackfest'
      , req: req
    })
  })

}
