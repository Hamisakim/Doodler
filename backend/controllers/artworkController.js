import Artwork from '../models/artworkModel.js'
//*----- Artworks -------------------------------------------------
export const getAllArtwork = async(req, res) => {
  const artwork = await Artwork.find().populate('owner')
  return res.status(200).json(artwork)
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
export const deleteArtwork = async (req, res) => {
  try {
    const { id } = req.params
    const artworkToDelete = await Artwork.findById(id).populate('owner')
    if (!artworkToDelete) {
      throw new Error('🟥 no artwork found to delete 🟥 ')
    }
    if (!artworkToDelete.owner.equals(req.currentUser._id)) throw new Error('🟥 Unauthorized 🟥')
    artworkToDelete.remove()
    return res.status(200).json(`DELETED ${artworkToDelete}`)
  } catch (err) {
    console.log('🆘 Something went wrong')
    console.log('⭐️',err.message)
    return res.status(404).json( { message: err.message } )
  }
}
//! ---------------------------------------------------------------
//*-----Comments---------------------------------------------------
export const addComment = async (req, res) => {
  try {
    const { id } = req.params
    const artworkToAddTo = await Artwork.findById(id) 
    if (!artworkToAddTo) throw new Error('🔴 No artwork found to add 🔴')
    const newComment = { ...req.body,username: req.currentUser.username , owner: req.currentUser }
    artworkToAddTo.comments.push(newComment)
    await artworkToAddTo.save()
    return res.status(200).json({ message: 'comment added ' })
  } catch (err) {
    console.log('🐝 ~ file: artworkController.js ~ line 49 ~ err', err)
    return res.status(500).json({ message: err.message })
  }
}
export const deleteComment = async (req, res) => {
  console.log('Deleting')
  try {
    const { id, commentId } = req.params
    const artwork = await Artwork.findById(id)
    if (!artwork) throw new Error('No artwork	found to delete comment')
    const commentToDelete = artwork.comments.id(commentId) 
    console.log('🐝 ~ file: artworkController.js ~ line 63 ~ commentToDelete', commentToDelete)
    if (!commentToDelete) throw new Error('🟥 Comment to delete not found 🟥')
    if (!commentToDelete.owner.equals(req.currentUser._id)) throw new Error('🟥 Unauthorized 🟥')
    await commentToDelete.remove()
    await artwork.save()
    return res.status(202).json({ message: `comment: ${commentToDelete.commentText} deleted` })
  } catch (err) {
    console.log('🐝 ~ file: artworkController.js ~ line 71 ~ err', err)
    return res.status(500).json({ message: err.message })
  }
}
//! ---------------------------------------------------------------
//*-----Likes/Favourites-------------------------------------------
//* this will like / unlike based on if user has liked the artwork already, based on their id

export const addLike = async (req, res) => {
// const currentUser = req.currentUser._id
  try {
    const { id } = req.params
    const artworkToLike = await Artwork.findById(id)
    if (!artworkToLike) {
      throw new Error('🟥 no artwork found to like 🟥 ')
    }
    const newLike = { owner: req.currentUser }
    const favouritesArray = artworkToLike.favourites 
    const currentUserLoggedInId = JSON.stringify(req.currentUser._id)
    const hasUserLikedBefore = await favouritesArray.find(item => JSON.stringify(item.owner._id) === currentUserLoggedInId) 
    
    console.log('🐝 ~ file: artworkController.js ~ line 107 ~ hasUserLikedBefore', hasUserLikedBefore)
    if (hasUserLikedBefore) {

      const likeToRemove = await artworkToLike.favourites.id(hasUserLikedBefore._id)

      await likeToRemove.remove()
      await	artworkToLike.save()
      res.status(200).json( { message: 'Dis-liked!' })
    } else if (!hasUserLikedBefore) {

      artworkToLike.favourites.push(newLike)
      await	artworkToLike.save()

      res.status(200).json( { message: 'liked!' })
    }
    

  } catch (err) {
    console.log('🐝 ~ file: artworkController.js ~ line 128 ~ error', err)
    res.status(500).json( { message: err.message })
  }
}
//!-----------------------------------------------------------------
// only logged in people can add
// we need to add the user ref to the post body req.