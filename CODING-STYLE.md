## Coding Style

1. Comma first
2. Two space indentation (no tabs)
3. No semicolons
4. Use single quotes for strings. Double quotes used only for html attributes

For example
```js
var express = require('express')
  , User = mongoose.model('User')
  , auth = require('./authorization')
  , arr = [1, 2, 3, 4]

User
  .findOne({ name: 'abc' })
  .run(function (err, user) {
    if (err) return res.send(400)
    if (!user) {
      // do something
      return res.send(403)
    }
    res.json(user)
  })
```

**Similar coding styles**

1. [npm coding style](http://npmjs.org/doc/coding-style.html)
2. [Github javascript styling guide](https://github.com/styleguide/javascript)
3. [idiomatic.js](https://github.com/rwldrn/idiomatic.js#readme)

**Note** : _If you are committing and pushing changes, please make sure you keep up to the standards_
