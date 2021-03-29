import express from 'express'
import { getAllArtwork, addArtwork, getOneArtwork } from '../controllers/artworkController.js'
import { registerUser, loginUser } from '../controllers/authController.js'
import { secureRoute } from './secureRoute.js'

const router = express.Router()

router.route('/artwork')
  .get(getAllArtwork)

router.route('/artwork')
  .post(secureRoute, addArtwork)

router.route('/artwork/:id')
  .get(getOneArtwork)


router.route('/login')
  .post(loginUser)


router.route('/join')
  .post(registerUser)


export default router
