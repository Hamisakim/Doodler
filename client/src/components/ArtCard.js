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


//! WITH SEMANTIC 
const ArtCard = ( { title, _id, doodleData, owner, description, totalFavourites  }) => {
  const [isFlipped, setIsFlipped] = useState(false)


  const decompressedDoodleData = LZString.decompressFromEncodedURIComponent(doodleData)

  const handleClick = () => {
    setIsFlipped(!isFlipped)
  }


  
  return (
    <> 
      <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal' >
        <div className='card-front' onClick={handleClick}>
          <div className="ui card">
            <div className="image">
              <CanvasDraw       
                disabled
                hideGrid
                immediateLoading={true}
                //saveData={doodleData}
                saveData={decompressedDoodleData}
                backgroundColor={JSON.parse(decompressedDoodleData).backgroundColor} 
              />
            </div>
            <hr/> 
            <div className='card-content'>
              <p>{description}</p>
              <Link to={`/gallery/${_id}`} className='button'>See more</Link>
              <div className="content"></div>
              <div className="header">{title}</div>
              <div className="">
                <SemanticLikeButton id={_id}/>
              </div>
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
            {/* <div className="content">
              <SemanticLikeButton id={id} />
            </div> */}
          </Card>
        </div>
      </ReactCardFlip>
    </>
  )

}
export default ArtCard






