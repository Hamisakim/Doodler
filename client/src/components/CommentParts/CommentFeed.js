import React, { useState, useEffect } from 'react'
import axios from 'axios'
// need id of artowrk comments feed is based on
// then we can get the comments via api get request 
// get username too to show beside the comment 
// have set interval to geg

const CommentFeed = ({ _id }) => {
  console.log(_id)
  // eslint-disable-next-line no-unused-vars
  const [commentsArray, setCommentsArray] = useState([])
  console.log('🐝 ~ file: CommentFeed.js ~ line 12 ~ commentsArray', commentsArray)

  useEffect(() => {
    getComments()
  }, [])

  const getComments = async () =>{ 
    const response = await axios.get(`/api/artwork/${_id}/getComments`) 
    // console.log('🐝 ~ file: CommentFeed.js ~ line 21 ~ response', response)
    const newCommentsArray = response.data
    console.log('🐝 ~ file: CommentFeed.js ~ line 23 ~ newCommentsArray', newCommentsArray)
    setCommentsArray(newCommentsArray)
  }

  //! when we go live set this timer off ---------
  setInterval(() => { //? refreshes number of likes every x seconds //! don't delete 
    console.log(' GETT🔵')
    getComments()  
  }, 10 * 1000) //? x * 1000ms 
  //! -----------------------------------



  return (
    <div className="box">
      {commentsArray.map(comment => {
        return <>
          <div key={comment._id}>
            <p>{comment.username} - {comment.commentText}</p>
            <p>{comment.createdAt}</p>
          </div>
          <hr/>
        </>
      })}
      
      
    </div>
  )
}

export default CommentFeed
