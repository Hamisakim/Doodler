/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
import React, { useState, useEffect } from 'react'
import ReactStars from 'react-rating-stars-component'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helpers/authHelp'
//need to get user rating if already voted on it 
//show average rating ass lit stars on entry or number to side? 
// get ID as props 
//make route for stars 
//pass in prop for being interactive 
// 

const StarsAndRating = ( { id } ) => {
  console.log('🐝 ~ file: StarsAndRating.js ~ line 15 ~ id', id)
  // console.log('🐝 ~ file: StarsAndRating.js ~ line 13 ~ doodles', )
  const [freshRating, setFreshRating] = useState()
  const [currentUserRating, setCurrentUserRating] = useState()
  console.log('🐝 ~ file: StarsAndRating.js ~ line 13 ~ freshRating', freshRating)
  const testId = '6062eddd48b7b2341a693f98'
  
  useEffect(()=>{
    refreshRating()
  },[])
  
  const refreshRating = async () =>{
    console.log('🔵 ~ file: StarsAndRating.js ~ line 28 ~ refreshRatingFN' )
    try {
      const response = await axios.get(`api/artwork/${testId}/avgRating`) //! getting same error with the gallery/api/url
      console.log('🐝 ~ file: StarsAndRating.js ~ line 30 ~ response', response)
    } catch (err) {
      console.log('🐝 ~ file: StarsAndRating.js ~ line 34 ~ err', err)
    }
  }

  
  const handleRating = async (newRating) => {
    try {
      const token = getTokenFromLocalStorage()
      console.log('rating🔵')
      //setFreshRating(newRating)
      console.log(newRating)
      const newRatingToSend = { rating: newRating}
      const URL = `api/gallery/${testId}/rate`
      console.log('🐝 ~ file: StarsAndRating.js ~ line 29 ~ URL', URL)
      const response = await axios.post(`${URL}`, newRatingToSend, { headers: { Authorization: `Bearer ${token}` } } )
      console.log('🐝 ~ file: StarsAndRating.js ~ line 28 ~ response', response)
    } catch (err) {
      console.log('🐝 ~ file: StarsAndRating.js ~ line 39 ~ err', err)
    }
  }

  return (
    <div className='stars-container'>
      <ReactStars
        count={5}
        onChange={handleRating}
        size={24}
        isHalf={false}
        value={4}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />
    </div>
  )
}

export default StarsAndRating
