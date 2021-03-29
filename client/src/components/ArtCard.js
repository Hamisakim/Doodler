import '../styles/componentStyles/artCard.scss'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import { Link } from 'react-router-dom'
import CanvasDraw from '../drawing/index'
import LZString from 'lz-string'
import axios from 'axios'
//import { getTokenFromLocalStorage } from '../helpers/authHelp.js'
import LikeButton from './LikeParts/LikeButton'
import SemanticLikeButton from './LikeParts/SemanticLikeButton'
import { Card, Icon, Image } from 'semantic-ui-react'

//! WITH SEMANTIC 
const ArtCard = ( { title, _id, doodleData, owner, description, totalFavourites  }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  // const [width, setWidth] = useState(400)
  // const [height, setHeight] = useState(400)

  const decompressedDoodleData = LZString.decompressFromEncodedURIComponent(doodleData)
  console.log('parsed bg', decompressedDoodleData.backgroundColor)

  const handleClick = () => {
    setIsFlipped(!isFlipped)
  }

  // return (
  //   <>
  //     <div className='has-text-centered'>
      
  //       <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal' onClick={handleClick}>

  //         <div  className='card' onClick={handleClick}>
  //           <div  className='' > 
  //             <div className='card-header-title'>
  //               <h1>{title}</h1>
  //             </div>
  //             <div className='card-image'>
  //               <CanvasDraw       
  //                 disabled
  //                 hideGrid
  //                 immediateLoading={true}
  //                 //saveData={doodleData}
  //                 saveData={decompressedDoodleData}
  //                 backgroundColor={JSON.parse(decompressedDoodleData).backgroundColor} 
              
  //               />
  //             </div> 
  //           </div>
  //           <footer className="card-footer">
  //             <a href="#" className="card-footer-item">❤️</a>
  //           </footer>   
  //         </div>


  //         <div className='card' onClick={handleClick} >
  //           <div className='card-header-title'>
  //             <h1>
  //               {title}
  //             </h1>
  //             <h2>Owner</h2>

  
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
              <p>Porta id tincidunt aliquant utricles orci pellentesque facilisis Libero. . fusee. Eliseo critique cum litoral interdum eros donec tortor magna.</p>
              <Link to={`/gallery/${_id}`} className='button'>See more</Link>
              <div className="content"></div>
              <div className="header">{title}</div>
              <div className="">
                <SemanticLikeButton id={_id}/>
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
        </div>
      </ReactCardFlip>
    </>
  )

}
export default ArtCard






