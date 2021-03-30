import express from 'express'
//! import add like
import { getAllArtwork, addArtwork, getOneArtwork, editArtwork, addComment, deleteComment, deleteArtwork, addLike, newRating, getAvgRating } from '../controllers/artworkController.js'
import { getAllUsers, getSingleUser, addBio } from '../controllers/userController.js'
import { registerUser, loginUser } from '../controllers/authController.js'
import { secureRoute } from './secureRoute.js'

const router = express.Router()

router.route('/artwork')
  .get(getAllArtwork)

router.route('/artwork')
  .post(secureRoute, addArtwork)

router.route('/artwork/:id')
  .get(getOneArtwork)
  .delete(secureRoute, deleteArtwork)

router.route('/artwork/:id/edit')  
  .put(secureRoute, editArtwork)
  
router.route('/login')
  .post(loginUser)


router.route('/join')
  .post(registerUser)

//* ADD comment
router.route('/:id/comment')
  .post(secureRoute, addComment)

//* delete comment
router.route('/:id/comment/:commentId')
  .delete(secureRoute, deleteComment)

//* add a like / favourite 
router.route('/:id/like')
  //.post(secureRoute, checkIfLiked)
  .post(secureRoute,addLike)
	
router.route('/:id/:likeId')
// router.route('/:id/favourite')

router.route('/users')
  .get(getAllUsers)

router.route('/users/:id')
  .get(getSingleUser)

router.route('/users/:id/bio') //* front end make sure userId is being passed
  .post(addBio)

// router.route('/users/:id/bio/:bio-id') //* front end make sure userId is being passed
//   .put(addBio)

// router.route('/gallery/:id/rate')
//   .post(secureRoute, newRating)
router.route('/gallery/:id/rate')
  .post(secureRoute, newRating)

router.route('/artwork/:id/avgRating')
  .get(getAvgRating)

  


export default router
