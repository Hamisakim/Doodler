import '../styles/componentStyles/artCard.scss'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import { Link } from 'react-router-dom'
import CanvasDraw from '../drawing/index'
import axios from 'axios'
//import { getTokenFromLocalStorage } from '../helpers/authHelp.js'
import LikeButton from './LikeParts/LikeButton'
import SemanticLikeButton from './LikeParts/SemanticLikeButton'
import { Card, Icon, Image } from 'semantic-ui-react'

//! WITH SEMANTIC 
const ArtCard = ( { title, id, doodleData, owner, description, totalFavourites  }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const [width, setWidth] = useState(400)
  const [height, setHeight] = useState(400)



  const handleClick = () => {
    setIsFlipped(!isFlipped)
  }

  const extra = (
    <a>
      <SemanticLikeButton />
      {totalFavourites}
    </a>
  )
  

  return (
    <> 
      <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal' onClick={handleClick}>
        <div className='card-front' onClick={handleClick}>
          <Card 
            header={title}
            image={<CanvasDraw className='canvas-container'       
              disabled
              hideGrid
              saveData={doodleData}
              // canvasWidth={350}
              // canvasHeight={350}   
              //!backgroundColor={JSON.parse(doodleData).backgroundColor}               
              //saveData={artwork.doodleData}
            />}
            extra={extra}
          />
        </div>

        <div className='card-back' onClick={handleClick}>
          <Card
            header={title}
            meta=''
            description={description}
            extra={extra}
          />
        </div>
       
      </ReactCardFlip>
    </>
  )

}
export default ArtCard






