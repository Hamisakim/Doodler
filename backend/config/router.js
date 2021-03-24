import express from 'express'
import { getAllArtwork, addArtwork } from '../controllers/artworkController.js'

const router = express.Router()

router.route('/artwork')
  .get(getAllArtwork)
  .post(addArtwork)

export default router