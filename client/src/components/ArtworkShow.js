import '../styles/componentStyles/artworkPage.scss'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import CanvasDraw from '../drawing/index'
import LZString from 'lz-string'

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

  if (!doodle) return null

  const decompressedDoodleData = LZString.decompressFromEncodedURIComponent(doodle.doodleData)
  console.log('parsed bg', decompressedDoodleData.backgroundColor)

  return (
    <div className="page-wrapper">
      <div className="description-wrapper">
        <h1 className="title">{doodle.title}</h1>
        { doodle.description &&
        <p>{doodle.description}</p>
        }
      </div>
      <div className="doodle-display-wrapper">
        <div className='canvas-container'>
          <CanvasDraw       
            disabled
            hideGrid
            loadTimeOffset={2.2}
            saveData={decompressedDoodleData}
            backgroundColor={JSON.parse(decompressedDoodleData).backgroundColor} 
          />
        </div>
      </div>
      <div className="doodle-comments-wrapper">
        <div className="doodle-add-comment">
          <form>
            <ipnut
              placeholder="leave comment"
              value={6}
            />
            <div>star wrapper: select checkboxes, with values 1-5</div>
          </form>
        </div>
        <div className="doodle-show-comments"></div>
      </div>
    </div>
  )
}

export default ArtworkShow

//scale canvas to make it larger in screen
