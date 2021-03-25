import '../styles/gallery.scss'
import React from 'react'
import  ArtCard from './ArtCard.js'

//  const image = ''

const Gallery = () => {
  return (
    <div>
      <div className='columns'></div>
      <div className='column ' >
        <ArtCard />
      </div>
    </div>

  )
}

export default Gallery
