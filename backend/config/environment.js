// export const port = 4000
// export const dbURI = 'mongodb://localhost/doodle-app' // * address of where our db lives, creates db with the name we give here
export const secret = 'This is a secret'
export const port = process.env.PORT || 4000
export const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/doodle-app'