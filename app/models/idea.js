
var IdeaSchema = new Schema({
    title: String
  , description: String
  , author: { type: Schema.ObjectId, ref: 'User' }
}, { strict: true })

// validations


// virtual attributes

mongoose.model('Idea', IdeaSchema)
