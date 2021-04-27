import React, { useState } from 'react'
import axios from 'axios'
import ReactStars from 'react-rating-stars-component'
import { getTokenFromLocalStorage,userIsAuthenticated } from '../../helpers/authHelp'
import { commentPopup, ratingPopup, userNeedsToLogin } from '../../helpers/popUps'
import SemanticLikeButton from '../LikeParts/SemanticLikeButton'
//* need to find way to prevent adding a comment from adding a rating too
// ? comment clears field on submit




const CommentForm = ({ _id }) => {
  const [userComment, setUserComment] = useState({
    commentText: '',
    rating: 1
  })
  const [userRating, setUserRating] = useState(null)
  
  const [isThereComment, setIsThereComment] = useState(null)
  const [isThereRating, setIsThereRating] = useState(null)
  console.log('🐝 ~ file: CommentForm.js ~ line 25 ~ isThereRating', isThereRating)



  const handleCommentChange = (event) => {
    //?get the value of what's being typed in the form and updating state
    const newUserComment = { ...userComment, [event.target.name]: event.target.value }
    // console.log('🐝 ~ file: Login.js ~ line 25 ~ event', event)
    setUserComment(newUserComment)
  }

  const handleRatingChange = (event) => {
    console.log('🐝 ~ file: CommentForm.js ~ line 65 ~ event', event)
    setIsThereRating(true)
    setUserRating(event)
  }


  const handleCommentPost = async(event) => {
    event.preventDefault()
    const isThereComment = !!userComment.commentText
    if (!userIsAuthenticated()) {
      userNeedsToLogin('Please login to review and comment!☺️')
    }
    if (!isThereComment) {
      setIsThereComment(false)
      console.log('NO COMMENT')
      commentPopup(0)
      return 0
    } if (!isThereRating) {
      ratingPopup(false)
      return 0
    }
    try {
      const commentToAdd = { ...userComment, rating: userRating }
      await axios.post(`/api/${_id}/comment`, commentToAdd, { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } } )
      console.log('🐝 ~ file: CommentForm.js ~ line 23 ~ commentToAdd', commentToAdd)
      commentPopup(true)
      setUserComment({ commentText: '' })
    } catch (err) {
      console.log('🔴 ~ file: CommentForm.js ~ line 24 ~ err', err)
    }
  }



  return (
    <div className="box">
      <form className='comment-form'>
        <ReactStars
          count={5}
          onChange={handleRatingChange}
          size={24}
          isHalf={true}
          value={0}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
        />
        {!isThereComment && 
        <input
          className={`input ${!isThereComment ? 'is-danger' : ''}`}
          // className={classToAdd}
          placeholder="leave comment"
          onChange={handleCommentChange}
          name="commentText"
          value={userComment.commentText}
        />
        }
        <div className='btn-container'>
          <button href='#comment-feed' className="button comment-btn box hover-box" onClick={handleCommentPost}>Comment</button>
        </div>
      </form>
      <SemanticLikeButton id={_id} />


    </div>
  )
}

export default CommentForm
