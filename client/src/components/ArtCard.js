
import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import { Link } from 'react-router-dom'

const ArtCard = () => {
  const [isFlipped, setIsFlipped] = useState(false)
  
  const handleClick = () => {
    setIsFlipped(!isFlipped)
    console.log('🤖 ~ isFlipped', isFlipped)
  }

  return (
    <>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      
        <div onClick={handleClick} >
          <div className="card" onClick={handleClick}  >
          
            <img src="https://i.ytimg.com/vi/392YCxAU6bU/maxresdefault.jpg"/>
          </div>s
        </div>


        <div >
          <div className="back-card card" onClick={handleClick} >
            <hr/> 
            <p>Porta id tincidunt aliquam ultrices orci pellentesque facilisis Libero. Aliquet fusce. Euismod tristique cum litora interdum eros donec tortor magna.</p>
            <Link to='#'>
              <button className="button"  >Click for more information</button>
            </Link>
          </div>
        </div>
      </ReactCardFlip>
      
    </>
  )
}


export default ArtCard
