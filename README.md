# Doodler ReadMe 
## Team members
Sami Hakim 
Eric Petso
## **Deployed app here [Doodler](https://doodler.netlify.app/)
Create an account and login to see the full features! 
# Project Overview - 7 days
*Note - no extra work has been done to this apart from deployment. This is to give an accurate representation of what can be accomplished in a set time frame.

Doodler is a social site for users to create and share their doodles. 
https://user-images.githubusercontent.com/76621344/117347278-cfd86d80-aea0-11eb-94fe-6664fea3c4bd.png
https://user-images.githubusercontent.com/76621344/117347330-df57b680-aea0-11eb-9bd9-b775a9393255.png


# Initialisation

* Make sure mongoDB is running  `mongod --dbpath ~/data/db`
* Server directory  `cd backend`
* `yarn`
* `yarn seed`
* `yarn serve`
* Front end  `cd client`
* Install front-end dependencies: `yarn`
* Start front-end server: `yarn start`

# Project brief
* **Build a full-stack application** by making your own backend and your own front-end
* **Use a MongoDB and Node.js API** using express framework to serve your data from a MongoDB database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** 
* **Be deployed online** so it’s publicly accessible
# Technologies Used
* MongoDB/Mongoose
* Express
* React.js (hooks)
* Node.js
* SCSS
* Bulma
* Axios
* Nodemon
* HTTP-proxy-middleware
* Bcrypt
* Body-parser
* jsonwebtoken
* Git/GitHub

## Approach Taken 
While discussing ideas we found a canvas component that allows users to make a doddle. We knew we wanted this as the focus of our app and got to work. 

We met and had some wireframes drawn up of how we want the app to look like
Screenshot 2021-05-04 at 15 02 14](https://user-images.githubusercontent.com/76621344/117347413-feeedf00-aea0-11eb-9e10-3bae4086906a.png

https://user-images.githubusercontent.com/76621344/117347353-e8e11e80-aea0-11eb-83aa-149b94732de5.png

Screenshot 2021-05-04 at 15 02 51](https://user-images.githubusercontent.com/76621344/117347367-f0a0c300-aea0-11eb-999d-5bbf5e927476.png
)
We used Trello to track our progress and raise issues.
https://user-images.githubusercontent.com/76621344/117347379-f4344a00-aea0-11eb-8636-85a235de9940.png



# Backend development
The doodles are referred as artwork in our schematics. They contain both  embedded and reference relationships
## Schemas
``` javascript
const commentSchema = new mongoose.Schema({
  commentText: { type: String, required: false }, //! Sami change to false for star rating 
  rating: { type: Number, required: false, min: 1, max: 5 },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: false },
  username: { type: String , required: false }
},
{ timestamps: true
})

const favouriteSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: false }
},
{ timestamps: true }
)

const artworkSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 60 },
  description: { type: String, required: false, maxlength: 500 },
  doodleData: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true  },
  comments: [commentSchema],
  favourites: [ favouriteSchema ]
},
{ timestamps: true }
)
```

## Controllers
Example of controller for liking / adding to favourites
``` javascript
export const addLike = async (req, res) => {
// const currentUser = req.currentUser._id
  try {
    const { id } = req.params
    const artworkToLike = await Artwork.findById(id)
    if (!artworkToLike) {
      throw new Error('🟥 no artwork found to like 🟥 ')
    }
    const newLike = { owner: req.currentUser }
    const favouritesArray = artworkToLike.favourites 
    const currentUserLoggedInId = JSON.stringify(req.currentUser._id)
    const hasUserLikedBefore = await favouritesArray.find(item => JSON.stringify(item.owner._id) === currentUserLoggedInId) 
    
    console.log('🐝 ~ file: artworkController.js ~ line 107 ~ hasUserLikedBefore', hasUserLikedBefore)
    if (hasUserLikedBefore) {
      const likeToRemove = await artworkToLike.favourites.id(hasUserLikedBefore._id)
      await likeToRemove.remove()
      await	artworkToLike.save()
      res.status(200).json( { message: 'Dis-liked!' })
    } else if (!hasUserLikedBefore) {
      artworkToLike.favourites.push(newLike)
      await	artworkToLike.save()
      res.status(200).json( { message: 'liked!' })
    }
  } catch (err) {
    console.log('🐝 ~ file: artworkController.js ~ line 128 ~ error', err)
    res.status(500).json( { message: err.message })
  }
}
```
* We ran into a problem often with the payload size but managed to overcome this! By using [lz-string](https://pieroxy.net/blog/pages/lz-string/guide.html)
https://user-images.githubusercontent.com/76621344/117347467-0f9f5500-aea1-11eb-8b34-39a4f0aeff95.png

* this changed the data from an object with line coordinates to a single string 
https://user-images.githubusercontent.com/76621344/117347475-11691880-aea1-11eb-8ce1-8cea4686376a.png

https://user-images.githubusercontent.com/76621344/117347484-14fc9f80-aea1-11eb-8bcf-7e78a246ca04.png



# Front end
My focus was on the gallery page, user authentication and the like and comment features.

# My Highlights
I really Like how the gallery page turned out with the cards and getting the filter feature to work.
https://user-images.githubusercontent.com/76621344/117347501-18902680-aea1-11eb-94ed-28aa5cf69990.png

Making the nabber responsive was also one of my highlights 
https://user-images.githubusercontent.com/76621344/117347537-22b22500-aea1-11eb-8299-977623cbb4e0.png

https://user-images.githubusercontent.com/76621344/117347557-29d93300-aea1-11eb-88f4-6188f85064f6.png

https://user-images.githubusercontent.com/76621344/117347568-2cd42380-aea1-11eb-8392-c1c25fda8a07.png


# Wins 
* Working as a team to create a really cool interactive app!
# Challenges 
* Managing and splitting work proved challenging initially 


