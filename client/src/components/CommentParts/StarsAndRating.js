
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
  const [avgRating, setAvgRating] = useState('No rating')
  console.log('🐝 ~ file: StarsAndRating.js ~ line 15 ~ avgRating', avgRating)

  useEffect(()=>{
    refreshRating()
    const interval = setInterval(refreshRating, 2000)
    return () => {
      clearInterval(interval)
    }
  },[])
  
  const refreshRating = async () =>{
    try { 
      const response = await axios.get(`/api/artwork/${id}/avgRating`) //
      const avgRatingToSet = response.data
      setAvgRating(avgRatingToSet)
    } catch (err) {
      console.log('🔴 ~ file: StarsAndRating.js ~ line 37 ~ err', err)
    }
  }

  
  const handleRating = async (newRating) => {
    try {
      const token = getTokenFromLocalStorage()
      console.log(newRating)
      const newRatingToSend = { rating: newRating }
      await axios.post(`/api/gallery/${id}/rate`, newRatingToSend, { headers: { Authorization: `Bearer ${token}` } } )
    } catch (err) {
      console.log('🐝 ~ file: StarsAndRating.js ~ line 39 ~ err', err)
    }
  }

  return (
    <div className="stars-and-rating-component">
      <div className='stars-container'>
        <ReactStars
          count={5}
          onChange={handleRating}
          size={24}
          isHalf={true}
          value={0}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
        />
      </div>
      <div className='rating-container' > 
        {/* {numberOfVotes} */}
        <h1 className='average-rating'>Average:{avgRating}  </h1>
      </div>
    </div>
  )
}

export default StarsAndRating
