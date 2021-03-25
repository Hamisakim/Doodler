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
    <div className='columns'>
      <div className='column'>
        {doodles.map(artwork => {
          return  <div div key={artwork._id}>
            <p>{artwork.title}</p>
            <CanvasDraw       
              disabled
              hideGrid
              saveData={artwork.doodleData}
              //saveData={artwork.doodleData}
            />
          </div>
        })}
      </div>
    </div>
  )
}

export default Gallery
