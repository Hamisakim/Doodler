import '../styles/componentStyles/profile.scss'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ArtCard from './ArtCard'

const Profile = () => {   //{ username } 
  const [artwork, setArtwork] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('api/artwork')
      setArtwork(response.data)
    }
    getData()
  }, [])

  // const [formData, setFormData] = useState({
  //   description: '',
  // })
  // const handleChange = (event) => {
  //   const newFormData = { ...formData, [event.target.name]: event.target.value }
  //   setFormData(newFormData)
  // }
  // const handleSave = () => {
  //   const artworkToSend = doodle.getSaveData()
  //   const newFormData = { ...formData, doodleData: artworkToSend, formData }
  //   setFormData(newFormData)

  return (

    <div className="main">
      <div className="section">
        <div className="box">
          <div className="tile is-vertical">
            <div className="tile">
              <h1>username</h1>
              <figure className="image is-128x128">
                <img src="https://bulma.io/images/placeholders/128x128.png"></img>
              </figure>
            </div>
            <div>
              <h1 className="title">User Info</h1>
            </div>
            {/* <div>
              <input
                className="input"
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div> */}
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
      </div>
    </div>  
  )
}


export default Profile