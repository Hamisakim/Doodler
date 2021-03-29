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

const StarsAndRating = ( { id } ) => {
  // console.log('🐝 ~ file: StarsAndRating.js ~ line 13 ~ doodles', )
  const [freshRating, setFreshRating] = useState()
  const [currentUserRating, setCurrentUserRating] = useState()
  console.log('🐝 ~ file: StarsAndRating.js ~ line 13 ~ freshRating', freshRating)




  const handleRating = async (newRating) => {
    try {
      const token = getTokenFromLocalStorage()
      console.log('rating🔵')
      //setFreshRating(newRating)
      console.log(newRating)
      const newRatingToSend = { rating: newRating}
      const URL = `api/gallery/${id}/rate`
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
        // isHalf={false}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />
    </div>
  )
}

export default StarsAndRating
