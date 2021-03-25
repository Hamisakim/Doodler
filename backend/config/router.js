import express from 'express'
import { getAllArtwork, addArtwork } from '../controllers/artworkController.js'
import { registerUser, loginUser } from '../controllers/authController.js'
const router = express.Router()

router.route('/artwork')
  .get(getAllArtwork)
  .post(addArtwork)

router.route('/login')
  .post(loginUser)


router.route('/join')
  .post(registerUser)


export default router
