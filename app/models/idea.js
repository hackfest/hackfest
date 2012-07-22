
var IdeaSchema = new Schema({
    title: {type: String, trim: true}
  , description: {type: String, trim: true}
  , votes: [{ type: Schema.ObjectId, ref: 'User' }]
  , comments: [new Schema({
        user: { type: Schema.ObjectId, ref: 'User' }
      , body: String
      , date: { type: Date, default: new Date() }
    })]
  , author: { type: Schema.ObjectId, ref: 'User' }
  , date: { type: Date, default: new Date() }
}, { strict: true })

// validations
IdeaSchema.path('title').validate(function (title) {
  return title.length > 0
}, 'Title cannot be blank')

IdeaSchema.path('description').validate(function (description) {
  return description.length > 0
}, 'Description cannot be blank')

mongoose.model('Idea', IdeaSchema)
