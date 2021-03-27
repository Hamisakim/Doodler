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
  }}
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

//!ignore
// export const checkIfLiked = async (req, _res) => {
//   console.log('Check')
//   const { id } = req.params
//   const artworkToLike = await Artwork.findById(id)
//   const favouritesArray = artworkToLike.favourites
 
//   console.log('🐝 ~ file: artworkController.js ~ line 100 ~ likedAlready', artworkToLike)
// }

//! this function is super messy atm.... Struggling to find a way to check if user has liked already...
export const addLike = async (req, res) => {
  const currentUser = req.currentUser._id
  console.log('🐝 ~ file: artworkController.js ~ line 97 ~ currentUser', currentUser)  
  try {
    console.log('🟩 Adding Like 🟩' )
    const { id } = req.params

    const artworkToLike = await Artwork.findById(id)
    const favouritesArray = artworkToLike.favourites
    
    //console.log('🐝 ~ file: artworkController.js ~ line 104 ~ favouritesArray', favouritesArray)
    const filteredArrayWithLikeOwnerId = favouritesArray.map((item)=>{
      const owner = item.owner
      let isLiked = false
      console.log('🐝 ~ file: artworkController.js ~ line 115 ~ ownerID',  owner._id)
      if (owner._id === currentUser){
        console.log('🐝 ~ file: artworkController.js ~ line 121 ~ currentUser', currentUser)
        console.log('found same')
        isLiked = true
      } else {
        console.log('not liked ')
        isLiked = false
      }
      return isLiked
    })
    console.log('🐝 ~ file: artworkController.js ~ line 129 ~ filteredArrayWithLikeOwnerId', filteredArrayWithLikeOwnerId)
    //console.log('🐝 ~ file: artworkController.js ~ line 109 ~ filteredArrayWithLikeOwnerId', filteredArrayWithLikeOwnerId)
    //const userLikedAlready =  filteredArrayWithLikeOwnerId.find((item) => {
    //return item === currentUser
    //})

    //console.log('🐝 ~ file: artworkController.js ~ line 111 ~ checkIfLiked', userLikedAlready)
    //console.log('🐝 ~ file: artworkController.js ~ line 108 ~ req.currentUser._id', req.currentUser._id)


    
    const newLike = { owner: req.currentUser }
  

    
    //console.log('🐝 ~ file: artworkController.js ~ line 115 ~ currentUser', currentUser)
    artworkToLike.favourites.push(newLike)
    await	artworkToLike.save()
    
    
    // const checkIfLiked = favouritesArray.map((item)=>{
    //   console.log('🐝 ~ file: artworkController.js ~ line 108 ~ item.owner', item.owner)
    //   if (item.owner === req.currentUser._id){
    //     console.log('matched like')
    //     return true 
    //   } 
    // })
    // const checkIfLiked =  favouritesArray.find(item => item.owner === currentUser)
    
    
   
    //const hasUserLikedAlready = 0
    //console.log('🐝 ~ file: artworkController.js ~ line 104 ~ hasUserLikedAlready', hasUserLikedAlready)


    // const checkIfLiked = favouritesArray.filter((item)=>{
    //   item.owner === req.currentUser._id 
    //   if (item.owner === req.currentUser._id){
    //     console.log('already likes')
    //   }
    //   console.log('🐝 ~ file: artworkController.js ~ line 112 ~ item', item)
    // })

    
    // const hasUserLikedAlready = () => {
    // }
    // hasUserLikedAlready()

    if (!artworkToLike) {
      throw new Error('🟥 no artwork found to like 🟥 ')
    }
    res.status(200).json( { message: 'liked!' })

  } catch (err) {
    console.log('🐝 ~ file: artworkController.js ~ line 107 ~ error', err)
    res.status(500).json( { message: err.message })
		
  }
}

export const deleteLike = async (req, res) => {


}


//!-----------------------------------------------------------------
// only logged in people can add
// we need to add the user ref to the post body req.