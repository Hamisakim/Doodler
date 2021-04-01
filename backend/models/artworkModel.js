import mongoose from 'mongoose'

//! comment schema 
const commentSchema = new mongoose.Schema({
  commentText: { type: String, required: false }, //! Sami change to false for star rating 
  rating: { type: Number, required: false, min: 1, max: 5 },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: false },
  username: { type: String , required: false }
},
{ timestamps: true
})

//? Like schema 
const favouriteSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: false } //? need ref to find who liked what 
},
{ timestamps: true }
)

const artworkSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 60 },
  description: { type: String, required: false, maxlength: 500 },
  doodleData: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true  },
  comments: [commentSchema],
  favourites: [ favouriteSchema ]
},
{ timestamps: true }
)

//!* Total likes/favourites 
artworkSchema
  .virtual('totalFavourites')
  .get(function(){
    if (this.favourites.length === 0) return 0
    const total = this.favourites.length
    //console.log('🐝 ~ file: artworkModel.js ~ line 36 ~ total', total)
    return total
  })

artworkSchema.set('toJSON', { virtuals: true })

//* need to find a way to make sure the rating is put in front end 
artworkSchema
  .virtual('avgRating')
  .get(function() {
    if (!this.comments.length) return 1
    const sum = this.comments.reduce((acc, curr) => {
      return acc + curr.rating
    }, 0)
    return sum / this.comments.length
  })

artworkSchema.set('toJSON', { virtuals: true })


export default mongoose.model('Artwork', artworkSchema)
