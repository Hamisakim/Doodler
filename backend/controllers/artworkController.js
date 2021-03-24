import Artwork from '../models/artworkModel.js'

export const getAllArtwork = async(req, res) => {
  const artwork = await Artwork.find()
  return res.status(200).json(artwork)
}

export const addArtwork = async(req, res) => {
  try {
    const newArtwork = { ...req.body }
    const artworkToAdd = await Artwork.create(newArtwork)
    return res.status(201).json(artworkToAdd)
  } catch (err) {
    console.log('🆘 Cannot add new show')
    console.log(err)
    return res.status(422).json(err)
  }
}