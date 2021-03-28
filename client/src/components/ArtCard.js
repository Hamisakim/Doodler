import '../styles/componentStyles/artCard.scss'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import { Link } from 'react-router-dom'
import CanvasDraw from '../drawing/index'
import axios from 'axios'
//import { getTokenFromLocalStorage } from '../helpers/authHelp.js'
import LikeButton from './LikeParts/LikeButton'
import { Card, Icon, Image } from 'semantic-ui-react'


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

  const extra = (
    <a>
      <Icon name='user' />
      16 Friends
    </a>
  )
  

  return (
    <> 
      <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal' onClick={handleClick}>
        <div className='card-front' onClick={handleClick}>
          <Card 
            image={<CanvasDraw className='canvas-container'       
              disabled
              hideGrid
              saveData={doodleData}
              // canvasWidth={350}
              // canvasHeight={350}   
              //!backgroundColor={JSON.parse(doodleData).backgroundColor}               
              //saveData={artwork.doodleData}
            />}
            header='Elliot Baker'
            meta='Friend'
            description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
            extra={extra}
          />
        </div>

        <div className='card-back' onClick={handleClick}>
          <Card
            image={<CanvasDraw className='canvas-container'       
              disabled
              hideGrid
              saveData={doodleData}
            // canvasWidth={350}
            // canvasHeight={350}   
            //!backgroundColor={JSON.parse(doodleData).backgroundColor}               
            //saveData={artwork.doodleData}
            />}
            header='Elliot Baker'
            meta='Friend'
            description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
            extra={extra}
          />
        </div>
      </ReactCardFlip>
    </>
  )

}
export default ArtCard
