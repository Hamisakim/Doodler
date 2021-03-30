import '../styles/componentStyles/gallery.scss'
import Loader from 'react-loader-spinner'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ArtCard from './ArtCard'
//import LZString from 'lz-string'

import gallery from  '../assets/Gallery.png'


const Gallery = () => {
  const [doodles, setDoodles] = useState([])
  console.log('🤖 ~ file: Gallery.js ~ line 9 ~ doodles', doodles)
  
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/api/artwork')
      console.log('🐝 ~ file: Gallery.js ~ line 17 ~ response', response)
      //setDoodles(null)
      setDoodles(response.data)
    }
    getData()
  }, [])


  if (!doodles) return ( //!  loader from package if no pull from api
    <div className='container'>
      <Loader className='loader-container' type="CIRCLES" color="#00BFFF" height={'20vh'} width={'20vh'} />
    </div>

  )

  
  return (
    <div className='main'>
      <img src={ gallery } alt="Gallery" className="title-img"></img>

      <div className='columns is-multiline'>
        {/* {doodles.map(artwork => {
          console.log('parsed', JSON.parse(artwork.doodleData).backgroundColor)
          return <div className="gallery-canvas" key={artwork._id}>
            <CanvasDraw
              // immediate loading on gallery, animated load on individual doodle show page
              immediateLoading
              //loadTimeOffset={2.75}
              disabled
              hideGrid
              backgroundColor={JSON.parse(artwork.doodleData).backgroundColor}
              saveData={artwork.doodleData}
            />
            <hr />
            <p>{artwork.title}</p>
          </div>

        })} */}

      </div>
      <div className='gallery columns is-multiline'>
        {doodles.map((artwork) => {

          return (
            <div key={artwork._id} className='column  is-one-third art-card-container'>
              <ArtCard {...artwork} />
            </div>
          )

        })}
      </div>
    </div>

  )
}
export default Gallery
