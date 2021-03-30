import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const bioSchema = new mongoose.Schema({
  text: { type: String, required: false, maxlength: 300, default: 'Tell us about yourself' }
})

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 30 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: [bioSchema]
})

//?reverse relationship so we get the user created artwork 
userSchema.virtual('usersArtwork', { 
  ref: 'Artwork',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, json) {
    delete json.password
    return json
  }
})


userSchema
  .virtual('passwordConfirmation') // defining name of virtual field
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function(next) {
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'Passwords do not match')
    }
    next()
  })

userSchema
  .pre('save', function(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })  

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}


export default mongoose.model('User', userSchema)