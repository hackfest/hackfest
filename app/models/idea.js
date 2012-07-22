
var IdeaSchema = new Schema({
    title: String
  , description: String
  , author: { type: Schema.ObjectId, ref: 'User' }
}, { strict: true })

// validations
IdeaSchema.path('title').validate(function (title) {
  return title.length > 0
}, 'Title cannot be blank')

IdeaSchema.path('description').validate(function (description) {
  return description.length > 0
}, 'Description cannot be blank')

mongoose.model('Idea', IdeaSchema)
