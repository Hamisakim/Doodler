import express from 'express'
//! import add like
import { getAllArtwork, addArtwork, getOneArtwork, addComment, deleteComment, deleteArtwork,  checkIfLiked } from '../controllers/artworkController.js'
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
  .post(secureRoute, checkIfLiked)
  // .post(secureRoute,addLike)
	

// router.route('/:id/favourite')





export default router
