import mongoose from 'mongoose'

const artworkSchema = new mongoose.Schema({
  title: { type: String, required: false, maxlength: 60 },
  description: { type: String, required: false, maxlength: 500 },
  doodleData: { type: Object, required: true }
})

export default mongoose.model('Artwork', artworkSchema)