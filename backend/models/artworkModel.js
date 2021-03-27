import mongoose from 'mongoose'

const artworkSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 60 },
  description: { type: String, required: false, maxlength: 500 },
  doodleData: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true  }
},
{ timestamps: true }
)

export default mongoose.model('Artwork', artworkSchema) 