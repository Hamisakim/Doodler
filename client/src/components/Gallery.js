/* eslint-disable no-unused-vars */
import '../styles/componentStyles/gallery.scss'
import Loader from 'react-loader-spinner'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ArtCard from './ArtCard'



const Gallery = () => {
  const [doodles, setDoodles] = useState([])
  console.log('🤖 ~ file: Gallery.js ~ line 9 ~ doodles', doodles)
  useEffect(() => {
    const getData = async() => {
      //const response = await axios.get('/api/artwork')
      setDoodles(null)
      // setDoodles(response.data)
    }
    getData()
  }, [])
    

  if (!doodles) return (
    <div className='container'> 
      <Loader className='loader-container' type="Circles" color="#00BFFF" height={'80vh'} width={'80vh'}/>
    </div>
  
  )
  return (
    <div className='gallery columns is-multiline'>
      {doodles.map((artwork)=>{

        return (
          <div key={artwork._id} className='column  is-one-third art-card-container'>
            <ArtCard {...artwork} />
          </div>
        )

      })}
    </div>
 
  )
}
export default Gallery
