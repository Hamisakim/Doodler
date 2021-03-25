import React, { useState, useEffect } from 'react'
import axios from 'axios'

import ArtCard from './ArtCard'

const Profile = () => {

  const CheeseIndex = () => {
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
      <div className="container">
        { artwork &&
          <div className="columns is-multiline">
            { artwork.map( art => (
              <ArtCard key={art._id} {...art} />
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default Profile