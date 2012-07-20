
module.exports = {
    development: {
        db: 'mongodb://localhost/hackfestD'
      , appId: '5db3f583ed0d38bf2137'
      , secret: 'ac2e59c6cd5073e440d7f3c795271cbbec9beba1'
      , callback: 'http://127.0.0.1:4000/auth/github/callback'
      , redirectPath: '/'
    }
  , production: {
        db: 'mongodb://hackfest:hackfest@staff.mongohq.com:10034/app6024163'
      , appId: '41e7870a61c77d071807'
      , secret: 'd9ce783c038141767db67808dc246c177113fe03'
      , callback: 'http://hackfestin.herokuapp.com/auth/github/callback'
      , redirectPath: '/'
    }
}
