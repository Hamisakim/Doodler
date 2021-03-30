import '../styles/componentStyles/profile.scss'

import React, { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom' //, useHistory 
import axios from 'axios'
import ArtCard from './ArtCard'
import { userIsOwner } from '../helpers/authHelp' // getTokenFromLocalStorage,

import profile from '../assets/Profile.png'
// import ProfileForm from '../components/userStuff/ProfileForm'

const Profile = () => {   //{ username } 
  const [user, setUser] = useState(null)
  const [allArtwork, setAllArtwork] = useState(null)
  const [userArtwork, setUserArtwork] = useState(null)
  // const [formData, setFormData] = useState({
  //   bio: ''
  // })
  
  const params = useParams()
  // const history = useHistory()
  const location = useLocation()

  console.log('🐝 ~ file: Profile.js ~ line 23 ~ userArtwork', userArtwork)


  useEffect(() => {
    getSingleUser()
    console.log('user ->', user)
    getAllArtwork()
  }, [location.pathname])

  const getSingleUser =  async () => {
    const response = await axios.get(`/api/users/${params.id}`)
    console.log('🐝 ~ file: Profile.js ~ line 23 ~ response', response)
    setUser(response.data)
  }

  const getAllArtwork = async () => {
    const response = await axios.get('/api/artwork')
    setAllArtwork(response.data)
  }

  // useEffect(() => {
  //   console.log('fsds',params.id)
  //   if (params.id === undefined) {
  //     history.push('/login')
  //   }
  // }, [])

  useEffect(() => {
    if (!allArtwork) return null
    const userArtworkArray = allArtwork.filter(doodle => {
      return doodle.owner._id === params.id
    })
    setUserArtwork(userArtworkArray)
    console.log(userArtwork)

  }, [allArtwork])

  // const handleChange = (event) => {
  //   const newFormData = { ...formData, [event.target.name]: event.target.value }
  //   setFormData(newFormData)
  // }

  // const handleSaveBio = () => {
  //   const bioToSend = formData.bio
  //   const newFormData = { ...formData, bio: bioToSend, formData }
  //   setFormData(newFormData)

  //   const sendBio = async () => {
  //     await axios.post(`/api/users/${params.id}/bio`, newFormData, { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } })
  //     history.push('/profile')
  //   }
  //   sendBio()

  // }
  
  if (!user) return null
  if (!userArtwork) return null
  return (

    <div className="main">
      <div className="section">
        <div className="box">
          <div className="tile is-vertical">
            <div>
              <img src={profile} alt="Profile" className="title-img"></img>
            </div>
            <div>
              <h1 className="title is-3">{user.username}</h1>
              <figure className="profile-pic image is-128x128">
                <img src={user.profilePicture}></img>
              </figure>
              { user.bio &&
              <>
                <h4 className="title is-5">Bio:</h4>
                <p className="subtitle is-5">{user.bio}</p>
              </> 
              }
              { user.location &&
              <>
                <h4 className="title is-5">Location:</h4>
                <p className="subtitle is-5">{user.location}</p>
              </> 
              }

            </div>
            {userIsOwner(user._id) &&
              <Link to={`/profile/${user._id}/profile-form`}>
                <button className="button is-dark"> Edit profile</button>
              </Link>
            }
          </div>
        </div>
        <div className="box">
          <h2>Your Doodles</h2>
          <div>
            <div className="columns">
              {userArtwork.length > 0 ?
                <>
                  {userArtwork.map(art => (
                    <ArtCard key={art._id} {...art} />
                  ))}
                </>
                :
                <p>no art yet, add a LINK to doodle page</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



export default Profile