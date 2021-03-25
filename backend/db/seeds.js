import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'    
import artworkData from './data/artworkData.js'
import Artwork from '../models/artworkModel.js'

const seedDataBase = async () => {

  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    console.log('🚀 Database has connected successfully')

    await mongoose.connection.db.dropDatabase()
    console.log('🟦  DB Dropped 🟦 ')
   
    //* Add artworks 
    const artworks = await Artwork.create(artworkData)
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