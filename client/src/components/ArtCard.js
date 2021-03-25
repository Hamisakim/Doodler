/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import { Link } from 'react-router-dom'
import CanvasDraw from '../drawing/index'
const ArtCard = ( { title, _id, doodleData }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const handleClick = () => {
    setIsFlipped(!isFlipped)
    console.log('🤖 ~ isFlipped', isFlipped)
  }
  return (
    <>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" onClick={handleClick}>

        <div className='card' onClick={handleClick}>
         
          <div  className='card' > 
            <p>{title}</p>
            <div className='card-image'>
              <CanvasDraw       
                disabled
                hideGrid
                saveData={doodleData}
                //saveData={artwork.doodleData}
              />
            </div> 
          </div>
         
        </div>

        <div >
          <div className="back-card card" onClick={handleClick} >
            <hr/> 
            <p>Porta id tincidunt aliquam ultrices orci pellentesque facilisis Libero. Aliquet fusce. Euismod tristique cum litora interdum eros donec tortor magna.</p>
            <button className="button"  >Click for more information</button>
          </div>
        </div>

      </ReactCardFlip>
    </>
  )
}
export default ArtCard
