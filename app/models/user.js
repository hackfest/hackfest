
// sometimes users might not have provided their name
var getName = function (name) {
  return name ? name : this.username
}

var UserSchema = new Schema({
    name: { type: String, get: getName }
  , email: String
  , username: String
  , github: {}
}, { strict: true })

// validations


// virtual attributes
UserSchema.virtual('avatar').get(function () {
  return this.github.avatar_url
})

mongoose.model('User', UserSchema)
