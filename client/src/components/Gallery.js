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
          console.log('parsed', JSON.parse(artwork.doodleData).backgroundColor)
          return  <div className="gallery-canvas" key={artwork._id}>
            <CanvasDraw
              // imediate loading on gallery, animated load on individual doodle show page
              //loadTimeOffset={2.75}
              immediateLoading
              disabled
              hideGrid
              canvasHeight={348}
              canvasWidth={348}
              backgroundColor={JSON.parse(artwork.doodleData).backgroundColor}
              saveData={artwork.doodleData}
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
