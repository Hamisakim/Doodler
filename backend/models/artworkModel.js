import mongoose from 'mongoose'

const artworkSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 60 },
  doodleData: { type: Object, required: true },
  description: { type: String, required: false, maxlength: 500 }
})

export default mongoose.model('Artwork', artworkSchema)