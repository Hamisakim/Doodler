import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'    
import artworkData from './data/artworkData.js'
import Artwork from '../models/artworkModel.js'
import User from '../models/userModel.js'
import userData from '../db/data/userData.js'

const seedDataBase = async () => {

  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    console.log('🚀 Database has connected successfully')

    await mongoose.connection.db.dropDatabase()
    console.log('🟦  DB Dropped 🟦 ')

    const users = await User.create(userData)
    console.log('🐝 ~ file: seeds.js ~ line 18 ~ users', users)
    console.log(`🌱 DB seeded with ${users.length} users`)

    const artworkWithUsers = artworkData.map(artwork => {
      //leave math random to seed random user to seed doodle
      // artwork.owner = users[0]._id
      artwork.owner = users[Math.floor(Math.random() * users.length )]._id
      return artwork
    })

    //* Add artworks 
    const artworks = await Artwork.create(artworkWithUsers)
    console.log(`🌱 DB seeded with ${artworks.length}🌱 `)
    await mongoose.connection.close()
    console.log('BYE FELICIA ✌️')
    
  } catch (err) {
    console.log('🤖 ~ file: seeds.js ~ line 8 ~ err', err)
    await mongoose.connection.close()
    console.log('ERROR TERMINATED ✌️')
  }
}

seedDataBase()