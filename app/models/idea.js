
var IdeaSchema = new Schema({
    title: {type: String, trim: true}
  , description: {type: String, trim: true}
  , votes: [{ type: Schema.ObjectId, ref: 'User' }]
  , votesCount: Number
  , comments: [new Schema({
        user: { type: Schema.ObjectId, ref: 'User' }
      , body: String
      , date: { type: Date, default: new Date() }
    })]
  , featured: { type: Boolean, default: false }
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

// statics
IdeaSchema.statics.trending = function (cb) {
  return this.find().sort('votesCount', -1).limit(5).exec(cb)
}

IdeaSchema.statics.recent = function (cb) {
  return this.find().sort('date', -1).limit(5).exec(cb)
}

IdeaSchema.statics.featured = function (cb) {
  return this.find().where('featured', true).sort('date', -1).limit(5).exec(cb)
}

// pre-save hooks
IdeaSchema.pre('save', function (next) {
  this.votesCount = this.votes.length
  next()
})

mongoose.model('Idea', IdeaSchema)
