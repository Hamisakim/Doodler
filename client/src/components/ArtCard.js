import '../styles/componentStyles/artCard.scss'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import { Link } from 'react-router-dom'
import CanvasDraw from '../drawing/index'

const ArtCard = ( { title, _id, doodleData }) => {
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
                  canvasWidth={350}
                  canvasHeight={350}                  
                //saveData={artwork.doodleData}
                />
              </div> 
            </div>
            <footer className="card-footer">
              <a href="#" className="card-footer-item">❤️</a>
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
              <p>Porta id tincidunt aliquant utricles orci pellentesque facilisis Libero. . fusee. Eliseo critique cum litoral interdum eros donec tortor magna.</p>
              <button className='button'>See more</button>
            </div>
            <footer className="card-footer">
              <a href="#" className="card-footer-item">❤️</a>
                artist name and profile pic
            </footer>   
          </div>
 

        </ReactCardFlip>
      </div>
    </>
  )
}
export default ArtCard
