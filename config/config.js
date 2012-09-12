
module.exports = {
    development: {
        db: 'mongodb://localhost/hackfestD'
      , appId: '5db3f583ed0d38bf2137'
      , secret: 'ac2e59c6cd5073e440d7f3c795271cbbec9beba1'
      , callback: 'http://127.0.0.1:4000/auth/github/callback'
      , redirectPath: '/'
      , twitterConsumerKey: '4ZudNWebfZIwzZNdivvfA'
      , twitterConsumerSecret: 'dTjMwP4s6Kj2ah30TgCG8wCqWI8Z82GFXm62NbL9ZvM'
      , twitterCallback: 'http://127.0.0.1:4000/auth/twitter/callback'
    }
  , production: {
        db: 'mongodb://hackfest:hackfest@staff.mongohq.com:10034/app6024163'
      , appId: '99bb569ae97361d8b1e7'
      , secret: 'dc6b174f96ff645740ed10260074f047dc27691c'
      , callback: 'http://churn.hackfest.in/auth/github/callback'
      , redirectPath: '/'
      , twitterConsumerKey: 'vz1h1rQdEBeQYcTsOlEA'
      , twitterConsumerSecret: 'TXGwlXkttGVBmI3KR9tEqYFg6BV29kT9Xt4LpvdRPI'
      , twitterCallback: 'http://churn.hackfest.in/auth/twitter/callback'
    }
}
