/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET


export const ImageUploadField = ({ handleImageUrl, value }) => {
  const handleUpload = async event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadUrl, data)
    handleImageUrl(res.data.url)
    console.log('response', res)
  }




  return (
    <>
      {value ?
        <div>
          <img src={value} alt="profile" />
        </div>
        :
        <>
          <label>Profile Image</label>
          <input
            className="input"
            type="file"
            onChange={handleUpload}
          />
        </>
      }
    </>
  )
}
