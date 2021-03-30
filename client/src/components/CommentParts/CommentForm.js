import React from 'react'
import StarsAndRating from './StarsAndRating'

const CommentForm = ({ doodles }) => {
  //? get ID from doodles and pass into the startsAndRating
  //? may be worth doing like u originally said and have this handle the whole rating and comment it's self 
  
  
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
      </form>
    </div>
  )
}

export default CommentForm
