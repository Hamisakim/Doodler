import '../styles/componentStyles/profile.scss'

import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ArtCard from './ArtCard'

import { getTokenFromLocalStorage, userIsAuthenticated } from '../helpers/authHelp'


const Profile = () => {   //{ username } 
  const [user, setUser] = useState(null)
  const [artwork, setArtwork] = useState(null)
  const [bio, setBio] = useState(null)

  const doodle = useRef(null)
  const params = useParams()

  useEffect(() => {

    const getSingleUser = async () => {
      const response = await axios.get(`/api/users/${params.id}`)
      setUser(response.data)
    }
    getSingleUser()

    const getArtwork = async () => {
      const response = await axios.get('api/artwork')
      setArtwork(response.data)
    }
    getArtwork()

    const saveBio = async () => {
      const response = await axios.put(`/api/users/${params.id}/bio`)
      setBio(response.data)
    }
    saveBio()
  }, [])

  
  console.log('user ->', user)
  console.log('bio ->', bio)


  const [formData, setFormData] = useState({
    bio: ''
  })
  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }
  const handleSave = () => {
    const bioToSend = doodle.getSaveData()
    const newFormData = { ...formData, bio: bioToSend, formData }
    setFormData(newFormData)

    const sendBio = async () => {
      await axios.post('/api/artwork', newFormData, { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } } )
      history.push('/profile')
    }
    sendBio()
  }

  return (

    <div className="main">
      <div className="section">
        <div className="box">
          <div className="tile is-vertical">
            <div>
              <h1 className="title">Profile</h1>
            </div>
            <div>
              <h1>username</h1>
              <figure className="profile-pic image is-128x128">
                <img src="https://bulma.io/images/placeholders/128x128.png"></img>
              </figure>
            </div>
            <div>
              <input
                className="input"
                placeholder="Tell us a little bit about yourself.."
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              { userIsAuthenticated() && 
                <button className="button is-primary" onClick={() => handleSave()}> Save </button>
              }
            </div>
          </div>
        </div>
        <div className="box">
          <h2>Your Doodles</h2>
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