import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ArtCard from './ArtCard'


const Profile = ({ username } ) => {


  const [artwork, setArtwork] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('api/artwork')
      setArtwork(response.data)
    }
    getData()
  }, [])

  return (
    <div className="section">
      <div className="box">
        <div className="tile is-vertical">
          <div className="tile">
            <figure className="image is-128x128">
              <img src="https://bulma.io/images/placeholders/128x128.png"></img>
            </figure>
          </div>
          <div>
            <h1>User Info</h1>
            <h1>{username}</h1>
          </div>
          <div>
            <h1>This is my profile, and this is my bio. Lalalalalalalala. Spring is in the air, and I am a flower, with nothing interesting to say.</h1>
          </div>
        </div>
      </div>
      <div className="box">
        <h1>Your Doodles</h1>
        <div>
          { artwork &&
            <div className="columns">
              { artwork.map( art => (
                <ArtCard key={art._id} {...art} />
              ))}
            </div>
          }
        </div>
      </div>
      <div className="box">
        <h1>Your Favourites</h1>
        <div>
          { artwork &&
            <div className="columns">
              { artwork.map( art => (
                <ArtCard key={art._id} {...art} />
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  )
}


export default Profile