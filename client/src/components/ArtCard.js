import '../styles/componentStyles/artCard.scss'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import { Link } from 'react-router-dom'
import CanvasDraw from '../drawing/index'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/authHelp.js'
import LikeButton from './LikeParts/LikeButton'

const ArtCard = ( { title, id, doodleData, owner, description, totalFavourites  }) => {
  console.log('🐝 ~ file: ArtCard.js ~ line 12 ~ totalFavourites', totalFavourites)
  console.log('🐝 ~ file: ArtCard.js ~ line 10 ~ id', id)
  const [isFlipped, setIsFlipped] = useState(false)

  const [width, setWidth] = useState(400)
  const [height, setHeight] = useState(400)



  const handleClick = () => {
    setIsFlipped(!isFlipped)
    console.log('🤖 ~ isFlipped', isFlipped)
  }

  return (
    <>
      <div className='has-text-centered'>
      
        <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal' onClick={handleClick}>

          <div  className='card' onClick={handleClick}>
            <div  className='' > 
              <div className='card-header-title'>
                <h1>{title}</h1>
              </div>
              <div className='card-image'>
                <CanvasDraw className='canvas-container'       
                  disabled
                  hideGrid
                  saveData={doodleData}
                  // canvasWidth={350}
                  // canvasHeight={350}   
                  //!backgroundColor={JSON.parse(doodleData).backgroundColor}               
                //saveData={artwork.doodleData}
                />
              </div> 
            </div>
            <footer className="card-footer">
              
              <div className='card-footer-item'>
                <div className='card-like-btn-things'>
                  <LikeButton id={id} />
                  {/* </div> */}
                  {/* <div className='card-footer-item'> */}
                  {/* <h2>{totalFavourites}</h2> */}
                  <h2>{totalFavourites}</h2>
                  
                </div>
              </div>
            </footer>   
          </div>


          <div className='card' onClick={handleClick} >
            <div className='card-header-title'>
              <h1>
                {title}
              </h1>
              <h2>Owner</h2>

            </div>
            <hr/> 
            <div className='card-content'>
              <p>{description}</p>
              <button className='button'>See more</button>
            </div>
            <footer className="card-footer">
              <LikeButton id={id} /> 
                artist name and profile pic
            </footer>   
          </div>
 

        </ReactCardFlip>
      </div>
    </>
  )
}
export default ArtCard
