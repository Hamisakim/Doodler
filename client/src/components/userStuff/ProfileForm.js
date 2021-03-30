import React, { useState } from 'react'
// import axios from 'axios'
import { ImageUploadField } from '../userStuff/ImageUploadField'
// import Select from 'react-select'



const ProfileForm = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    location: '',
    age: '',
    bio: '',
    profileImage: ''
  })
  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  const handleSubmit = event => {
    event.PreventDefault()
    // window.alert(`Submitting ${JSON.stringify(formData, null, 2)}`)
    window.alert(`Submitting ${JSON.stringify(formData)}`)
    console.log('handleSubmit', handleSubmit)// this line needs to change so that we submit to our db
  }

  const handleImageUrl = url => {
    setFormData({ ...formData, profileImage: url })
  }

  return (
    <>
      <h1>ProfileForm</h1>
      <form onSubmit={handleSubmit}>
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
            name="profileImage"
            value={formData.profileImage}
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
  )
}

export default ProfileForm