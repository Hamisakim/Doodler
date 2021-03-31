import '../styles/componentStyles/artCard.scss'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import { Link } from 'react-router-dom'
import CanvasDraw from '../drawing/index'
import LZString from 'lz-string'
import axios from 'axios'
import LikeButton from './LikeParts/LikeButton'
import SemanticLikeButton from './LikeParts/SemanticLikeButton'
import { Card, Icon, Image } from 'semantic-ui-react'
import ReactStars from 'react-rating-stars-component'



//! WITH SEMANTIC 
const ArtCard = ( { title, _id, doodleData, owner, description, totalFavourites, cardFlip, avgRating  }) => {
  console.log('🐝 ~ file: ArtCard.js ~ line 16 ~ avgRating', avgRating)
  console.log('🐝 ~ file: ArtCard.js ~ line 16 ~ cardFlip', cardFlip)
  const [isFlipped, setIsFlipped] = useState(false)
  const [wantCardFlip, setCardFlip] = useState(true)
  const decompressedDoodleData = LZString.decompressFromEncodedURIComponent(doodleData)

  const handleClick = () => {
    setIsFlipped(!isFlipped)
  }

  const randBool = Boolean(Math.round(Math.random()))

  //-----------------------------------------------------------------
  return (
    <> 
      <ReactCardFlip infinite={randBool} isFlipped={isFlipped} flipDirection='horizontal' >
        <div className='card-front ' onClick={handleClick}>
          
          <div className="ui card">
            <div className="header"> <h1>{title}</h1></div>
            <div className="image">
              <CanvasDraw
                className="canvas"     
                disabled
                hideGrid
                immediateLoading={true}
                //saveData={doodleData}
                saveData={decompressedDoodleData}
                backgroundColor={JSON.parse(decompressedDoodleData).backgroundColor} 
              />
            </div>

            <div className='front-card-content'>
         
              <Link to={`/profile/${owner._id}`} >
                <div className="user-items">Doodled by <span className='username'>{owner.username}</span></div>
              </Link>
              
              <div className="like-button">
                <SemanticLikeButton id={_id}/>
              </div>
              
            </div>
          </div>


        </div>
        <div className='card-back' >
          <Card onClick={handleClick}>
           
            <div className='back-card-content'>

        
              <div className='back-card-top-container'>
                <div className="header"> 
                  <h1>{title}</h1>
                </div>
                <Link to={`/profile/${owner._id}`} >
                  <div className="user-items">Doodled by <span className='username'>{owner.username}</span></div>
                </Link>
                <div className='stars'>{ <ReactStars
                  edit={false}
                  // count={5}
                  // onChange={0}
                  size={16}
                  isHalf={true}
                  value={avgRating}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
                }</div>
              </div>

              { description &&
              <fieldset>
                <legend>Description</legend>
                <p>{description}</p>
              </fieldset>
              }

              <Link to={`/gallery/${_id}`}>See More</Link>
    
            </div>

          </Card>





          {/* 

          <Card>
            <Card.Content onClick={handleClick}>
              <Card.Header>{title}</Card.Header>
              <Card.Description>
                <p>{description}</p>
              </Card.Description>
              <Link to={`/gallery/${_id}`} className='button'>See more </Link>

            </Card.Content>
          </Card> */}
        </div>
      </ReactCardFlip>
    </>
  )

}
export default ArtCard






