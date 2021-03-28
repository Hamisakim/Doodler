import '../styles/componentStyles/artworkPage.scss'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ArtworkShow = () => {
  const [doodle, setDoodle] = useState(null)

  const params = useParams()
  console.log('params ->', params.id)

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/artwork/${params.id}`)
      setDoodle(response.data)
    }
    getData()
  }, [])

  //console.log('doodle ->', doodle.description)
  if (!doodle) return null
  return (
    <div className="page-wrapper">
      <div className="description-wrapper">
        <h1>{doodle.title}</h1>
        { doodle.description &&
        <p>{doodle.description}</p>
        }
      </div>
      <div className="doodle-display-wrapper"></div>
      <div className="doodle-add-comment"></div>
      <div className="doodle-show-comments"></div>
    </div>
  )
}

export default ArtworkShow

//scale canvas to make it larger in screen
