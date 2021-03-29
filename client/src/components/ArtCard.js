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

  const likeButton = (
    <a>
      <SemanticLikeButton id={id} totalFavourites={totalFavourites}/>
    </a>
  )
  
  return (
    <> 
      <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal' >
       
        {/* <div className='card-front' onClick={handleClick}>
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
            extra={likeButton}
          > 
            <Card.Header>{title}</Card.Header>
          </Card>
        </div> */}


        <div className='card-front' onClick={handleClick}>
          <div className="ui card">
            <div className="image">
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
            <div className="content"></div>
            <div className="header">{title}</div>
            <div className="">
              <SemanticLikeButton id={id}/>
            </div>
          </div>
        </div>
    


        <div className='card-back' >
          {/* <Card
            header={title}
            meta=''
            description={description}
            extra={likeButton}
          /> */}
          <Card>
            <Card.Content onClick={handleClick}>
              <Card.Header>{title}</Card.Header>
              <Card.Description>
                {description}
              </Card.Description>
            </Card.Content>
            <div className="content">
              <SemanticLikeButton id={id} />
            </div>
          </Card>
        </div>
       
      </ReactCardFlip>
    </>
  )

}
export default ArtCard






