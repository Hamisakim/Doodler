import React, { useState } from 'react'
import StarsAndRating from './StarsAndRating'
import axios from 'axios'

import { getTokenFromLocalStorage } from '../../helpers/authHelp'

const CommentForm = ({ _id }) => {
  //? get ID from doodles and pass into the startsAndRating
  //? may be worth doing like u originally said and have this handle the whole rating and comment it's self 

  const [userComment, setUserComment] = useState({
    commentText: '' 
  })

  console.log('artwork id ->', _id)

  const handleCommentPost = async(event) => {
    event.preventDefault()
    // const payload = getPayloadFromToken()
    // const userId = payload.sub
    const commentToAdd = { ...userComment }
    await axios.post(`/api/${_id}/comment`, commentToAdd, { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } } )
  }

  const handleCommentChange = (event) => {
    //?get the value of what's being typed in the form and updating state
    const newUserComment = { ...userComment, [event.target.name]: event.target.value }
    console.log('🐝 ~ file: Login.js ~ line 25 ~ event', event)
    setUserComment(newUserComment)
  }

  // useEffect(() => {
  //   const payload = getPayloadFromToken()
  //   const userId = payload.sub
  //   console.log('payload', payload)
  //   console.log('userId', userId)
  //   setUserId(userId)
  // }, [getPayloadFromToken()])

  return (
    <div className="box">
      <form>
        <StarsAndRating 
          //doodle={doodle} 
          id={_id} 
        />
        {/* <ReactStars
          count={5}
          onChange={handleRating}
          size={24}
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
        /> */}
        <input
          className="input"
          placeholder="leave comment"
          onChange={handleCommentChange}
          name="commentText"
        />
        <button className="button" onClick={handleCommentPost}>Submit Comment</button>
      </form>
    </div>
  )
}

export default CommentForm
