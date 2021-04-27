// export const port = 4000
// export const dbURI = 'mongodb://localhost/doodle-app' // * address of where our db lives, creates db with the name we give here


export const secret = 'This is a secret'

export const port = process.env.PORT || 4000
export const dbURI = process.env.MONGODB_URI || 'mongodb+srv://admin:insomnia123@cluster0.f6ck9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


// export const secret = 'This is a secret'
// export const port = process.env.PORT || 4000
// export const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/doodle-app'