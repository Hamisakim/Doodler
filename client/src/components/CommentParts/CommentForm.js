import React from 'react'
import StarsAndRating from './StarsAndRating'
import axios from 'axios'

const CommentForm = ({ doodles }) => {
  //? get ID from doodles and pass into the startsAndRating
  //? may be worth doing like u originally said and have this handle the whole rating and comment it's self 
  
  const handleCommentPost = async() => {
    await axios.post(`/api/${doodles.id}/comment`)


  }

  router.route('/:id/comment')
  .post(secureRoute, addComment)

  return (
    <div className="doodle-add-comment">
      <form>
        <StarsAndRating 
          doodles={doodles} 
          //id={id} 
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
        />
        <button onClick={handleCommentPost}></button>
      </form>
    </div>
  )
}

export default CommentForm
