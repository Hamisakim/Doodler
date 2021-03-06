import express from 'express'
import mongoose from 'mongoose'
import { port, dbURI } from './config/environment.js'
import router from './config/router.js'
import bodyParser from 'body-parser'

const app = express()

// * Function to start server and connect to db
const startServer = async() => {
  try {
    // * Connect to mongodb
    await mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    console.log('๐ Database has connected successfully๐')

    // * body parser
    app.use(bodyParser.json({ limit: '10mb', extended: true }))

    // * Logger middleware
    app.use((req, _res, next) => {
      console.log(`๐จ Incoming request: ${req.method} - ${req.url}๐จ`)
      next()
    })
    
    // * Run the router
    app.use('/api', router)

    // * Server
    app.listen(port, () => console.log(`๐ Express is up and running on port ${port}๐`))
  } catch (err) {
    console.log('๐ Something went wrong starting the app')
    console.log(err)
  }
}
startServer()