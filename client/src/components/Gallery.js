import '../styles/componentStyles/gallery.scss'
import Loader from 'react-loader-spinner'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ArtCard from './ArtCard'
//import LZString from 'lz-string'
import ReactStars from 'react-rating-stars-component'
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

  const [filterRating, setFilterRating] = useState(1)
  const [filterCriteriaRating, setFilterCriteriaRating] = useState(true)
  const [filterCriteriaLikes, setFilterCriteriaLikes] = useState(false)
  console.log('🐝 ~ file: Gallery.js ~ line 33 ~ filterRating', filterRating)
 
  const handleRatingFilter = (event) => {
    setFilterCriteria('rating')
    console.log('🐝 ~ file: Gallery.js ~ line 34 ~ event', event)
    setFilterRating(event)
  }
  
  return (
    <>
      <div className="section-header">
        <img src={ gallery } alt="Gallery" className="title-img"></img>
      </div>
      <div className='gallery-filter'>
        <div className='rating-filter-select'>
          <h1>Filter by rating!</h1> 
          <ReactStars
            count={5}
            onChange={handleRatingFilter}
            size={24}
            isHalf={true}
            value={0}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
        </div>
      </div>
      <div className='gallery columns is-multiline '>
      
        {/* {doodles.map((artwork) => {
          return (
            <div key={artwork._id} className='column'>
              <ArtCard {...artwork} />
            </div>
          )
        })} */}


        { // sort by likes
        // need to change the  in filter 
        // .totalFavourites

        }

        { !        

        doodles.filter(artwork => artwork.avgRating >=  filterRating)
          .map(filteredArtwork => (
            console.log('🐝 ~ file: Gallery.js ~ line 64 ~ filteredArtwork', filteredArtwork),
            <div key={filteredArtwork._id} className='column'>
              <ArtCard {...filteredArtwork} />
            </div>
          ))
            
        }


  







      </div>
    </>
  )
}
export default Gallery
