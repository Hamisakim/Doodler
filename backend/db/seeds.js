import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'    
import artworkData from './data/artworkData.js'
import Artwork from '../models/artworkModel.js'
import User from '../models/userModel.js'
import userData from '../db/data/userData.js'

const seedDataBase = async () => {

  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    console.log('π Database has connected successfully')

    await mongoose.connection.db.dropDatabase()
    console.log('π¦  DB Dropped π¦ ')

    const users = await User.create(userData)
    console.log('π ~ file: seeds.js ~ line 18 ~ users', users)
    console.log(`π± DB seeded with ${users.length} users`)

    const artworkWithUsers = artworkData.map(artwork => {
      //leave math random to seed random user to seed doodle
      // artwork.owner = users[0]._id
      artwork.owner = users[Math.floor(Math.random() * users.length )]._id
      return artwork
    })

    //* Add artworks 
    const artworks = await Artwork.create(artworkWithUsers)
    console.log(`π± DB seeded with ${artworks.length} doodlesπ± `)
    await mongoose.connection.close()
    console.log('BYE FELICIA βοΈ')
    
  } catch (err) {
    console.log('π€ ~ file: seeds.js ~ line 8 ~ err', err)
    await mongoose.connection.close()
    console.log('ERROR TERMINATED βοΈ')
  }
}

seedDataBase()