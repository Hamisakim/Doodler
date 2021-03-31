import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactStars from 'react-rating-stars-component'

//* Todo -change time stamps, show profile pic
//? bonus get user position and set it 

const CommentFeed = ({ _id }) => {
  const [commentsArray, setCommentsArray] = useState([])
  useEffect(() => {
    getComments()
    const interval = setInterval(getComments, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const getComments = async () =>{ 
    const response = await axios.get(`/api/artwork/${_id}/getComments`) 
    const newCommentsArray = response.data
    setCommentsArray(newCommentsArray)
  }
  const formattedTimestamp = (timestamp) =>{
    const date = new Date(timestamp)
    const toString = date.toString()
    const dateSlice = toString.slice(4,10)
    const timeSlice = toString.slice(15,21)
    return `${dateSlice} at ${timeSlice}`
  }
 
  // const ratingShow = <ReactStars
  //   edit={false}
  //   // count={5}
  //   // onChange={0}
  //   size={16}
  //   isHalf={true}
  //   value={comment.rating}
  //   emptyIcon={<i className="far fa-star"></i>}
  //   halfIcon={<i className="fa fa-star-half-alt"></i>}
  //   fullIcon={<i className="fa fa-star"></i>}
  //   activeColor="#ffd700"
  // />

  return (
    <div className="box comment-feed" id='comment-feed'>
      <h1> Whats the chat? </h1>
      {commentsArray.reverse().map(comment => { 
        const  timestamp  = comment.createdAt
        return (
          <div key={comment._id}>
            {/* <p>{comment.commentText} - {comment.rating}</p> */}
            <p>{comment.commentText} - { <ReactStars
              edit={false}
              // count={5}
              // onChange={0}
              size={16}
              isHalf={true}
              value={comment.rating}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
            } </p>
            <p>{comment.username} - {formattedTimestamp(timestamp)}</p>
            <hr/>
          </div>
        )
      })}
      
      
    </div>
  )
}

export default CommentFeed
