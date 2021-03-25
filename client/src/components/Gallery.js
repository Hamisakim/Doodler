import React, { useState, useEffect } from 'react'
import axios from 'axios'

import CanvasDraw from '../drawing/index'

const Gallery = () => {
  const [doodles, setDoodles] = useState([])

  useEffect(() => {
    const getData = async() => {
      const response = await axios.get('/api/artwork')
      setDoodles(response.data)
    }
    getData()
  }, [])


  return (
    <div className='container'>
      <div className='columns is-multiline'>
        {doodles.map(artwork => {
          return  <div className="gallery-canvas" key={artwork._id}>
            <CanvasDraw
              disabled
              hideGrid
              saveData={artwork.doodleData}
              //saveData={artwork.doodleData}
            />
            <hr />
            <p>{artwork.title}</p>
          </div>
          
        })}

      </div>
    </div>
  )
}

export default Gallery
