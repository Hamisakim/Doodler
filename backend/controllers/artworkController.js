import Artwork from '../models/artworkModel.js'
//? get all artworks 
export const getAllArtwork = async(req, res) => {
  const artwork = await Artwork.find().populate('owner')
  return res.status(200).json(artwork)
}

//?Add artwork 
export const addArtwork = async(req, res) => {
  try {
    console.log('⭐️  Adding artwork')
    console.log('req.current user', req.currentUser._id)
    //console.log('req.body', req.body)
    const newArtwork = { ...req.body, owner: req.currentUser }
    console.log('newArtwork ->', newArtwork)
    const artworkToAdd = await Artwork.create(newArtwork)
    return res.status(201).json(artworkToAdd)
  } catch (err) {
    console.log('🆘 Cannot add new artwork')
    console.log(err)
    return res.status(422).json(err)
  }
}

export const getOneArtwork = async (req, res) => {
  try {
    const { id } = req.params
    const singleArtwork = await Artwork.findById(id).populate('owner')
    if (!singleArtwork) {
      throw new Error('no artwork exists with that id')
    }
    return res.status(200).json(singleArtwork)
  } catch (err) {
    console.log('🆘 Something went wrong')
    console.log(err)
    return res.status(404).json({ 'message': 'Not found' })
  }
}

// only logged in people can add
// we need to add the user ref to the post body req.