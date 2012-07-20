
var UserSchema = new Schema({
    name: String
  , email: String
  , username: String
  , github: {}
}, { strict: true })

// validations


// virtual attributes

mongoose.model('User', UserSchema)
