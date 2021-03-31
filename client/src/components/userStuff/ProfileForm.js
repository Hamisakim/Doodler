import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { ImageUploadField } from '../userStuff/ImageUploadField'
import '../../styles/componentStyles/profileForm.scss'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helpers/authHelp'



const ProfileForm = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    location: '',
    age: '',
    bio: '',
    profilePicture: ''
  })
  const [user, setUser] = useState(null)

  const params = useParams()
  console.log('params id', params.id)
  const history = useHistory()

  useEffect(() => {
    const getUserData = async () => {
      const response = await axios.get(`/api/users/${params.id}`)
      setUser(response.data)
      setFormData(response.data)
    }
    getUserData()
    console.log('get user ->', user)
  }, [])

  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    //setFormData({ ...formData, [event.target.name]: event.target.value })
    setFormData(newFormData)
  }

  const handleImageUrl = url => {
    setFormData({ ...formData, profilePicture: url })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
<<<<<<< HEAD
    // window.alert(`Submitting ${JSON.stringify(formData, null, 2)}`)
=======
    //window.alert(`Submitting ${JSON.stringify(formData, null, 2)}`)
>>>>>>> 2e9b632b6ae2b7ffc8f8b2be5d38dd3a31c488c1
    // ! put request for updated form data
    await axios.put(`/api/users/${params.id}`, formData, { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } } )
    history.push(`/profile/${params.id}`)

    // console.log('handleSubmit', handleSubmit)// this line needs to change so that we submit to our db
  }

  //console.log('formdata', formData)
  if (!user) return null
  return (
    <main> 
      <>
        <h1 className="form-title">Tell us a little bit about yourself</h1>
        <form
          onSubmit={handleSubmit}
        >
          <div className="field">
            <label className="label">First Name:</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Last Name:</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <ImageUploadField
              name="profilePicture"
              value={formData.profilePicture}
              handleImageUrl={handleImageUrl}
            />
          </div>

          <div className="field">
            <label className="label">Location:</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Age:</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Bio:</label>
            <div className="control">
              <textarea
                className="textarea"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <button className="button is-fullwidth is-dark" type="submit">Submit</button>
          </div>
        </form>
      </>
    </main>  
  )
}

export default ProfileForm