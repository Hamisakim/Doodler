import React, { useState } from 'react'
import StarsAndRating from './StarsAndRating'
import axios from 'axios'

import { getTokenFromLocalStorage } from '../../helpers/authHelp'

//* need to find way to prevent adding a comment from adding a rating too

const CommentForm = ({ _id }) => {
  const [userComment, setUserComment] = useState({
    commentText: '' 
  })

  
  const [wasCommentSuccessful, setWasCommentSuccessful] = useState(null) //! use this to change classes...easy use template literal 
  const [isThereComment, setIsThereComment] = useState(null)
  
  console.log('🐝 ~ file: CommentForm.js ~ line 12 ~ setWasCommentSuccessful', setWasCommentSuccessful)
  console.log('🐝 ~ file: CommentForm.js ~ line 12 ~ wasCommentSuccessful', wasCommentSuccessful)

  const handleCommentChange = (event) => {
    //?get the value of what's being typed in the form and updating state
    const newUserComment = { ...userComment, [event.target.name]: event.target.value }
    console.log('🐝 ~ file: Login.js ~ line 25 ~ event', event)
    setUserComment(newUserComment)
  }
  
  const handleCommentPost = async(event) => {
    event.preventDefault()
    const isThereComment = !!userComment.commentText
    console.log('🐝 ~ file: CommentForm.js ~ line 28 ~ isThereComment', isThereComment)
    if (!isThereComment) {
      setIsThereComment(false)
      console.log('NO COMMENT')
    }
    try {
      const commentToAdd = { ...userComment }
      await axios.post(`/api/${_id}/comment`, commentToAdd, { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } } )
      console.log('🐝 ~ file: CommentForm.js ~ line 23 ~ commentToAdd', commentToAdd)
    } catch (err) {
      console.log('🐝 ~ file: CommentForm.js ~ line 24 ~ err', err)
    }

  }


  return (
    <div className="box">
      <form>
        <StarsAndRating id={_id}/>
        
        {!isThereComment && 
        <input
          className={'input is-danger'}
          placeholder="leave comment"
          onChange={handleCommentChange}
          name="commentText"
        />
        }

        <button href='#comment-feed' className="button" onClick={handleCommentPost}>Comment</button>
      </form>
    </div>
  )
}

export default CommentForm
