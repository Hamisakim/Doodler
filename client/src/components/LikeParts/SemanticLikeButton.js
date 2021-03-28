import React from 'react'
import { getTokenFromLocalStorage } from '../../helpers/authHelp'
import redHeart from  '../../assets/645px-Love_Heart_SVG.svg.png'
import axios from 'axios'

//* Pass in the ID as props from parent component. 
//* will send authentication header to DB
//* Add check to see if user is logged in so they can like! 
//?______________________________________________________________________

const LikeButton = ({ id }) => {
  //?____________Function ______________________________________________________

  const handleLike = async () => {
    const token = getTokenFromLocalStorage()
    // console.log('🐝 ~ file: ArtCard.js ~ line 26 ~ token', token)

    try {
      await axios.post(`api/${id}/like`, null, { headers: { Authorization: `Bearer ${token}` } } )
      //console.log('🐝 ~ file: ArtCard.js ~ line 25 ~ postResponse', postResponse)
    } catch (err) {
      console.log('🔴 ~ file: ArtCard.js ~ line 31~ err', err.message)
      
    }
  }


  return (
    <div>
      <img src={redHeart} width={'60rem'} height={'60rem'} onClick={handleLike} className="like-btn " />
      {/* //* class to remove later  card-footer-item */}
    </div>
  )
}

export default LikeButton
