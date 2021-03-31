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
    console.log('🚀 Database has connected successfully')

    // * body parser
    app.use(bodyParser.json({ limit: '10mb', extended: true }))

    // * Logger middleware
    app.use((req, _res, next) => {
      console.log(`🚨 Incoming request: ${req.method} - ${req.url}`)
      next()
    })

    // * Run the router
    app.use('/api', router)

    // * Server
    app.listen(port, () => console.log(`🚀 Express is up and running on port ${port}`))
  } catch (err) {
    console.log('🆘 Something went wrong starting the app')
    console.log(err)
  }
}
startServer()