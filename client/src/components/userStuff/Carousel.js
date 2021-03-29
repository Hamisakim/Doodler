import React from 'react'
// import ReactDOM from 'react-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

const DemoCarousel = () => {

  return (
    <Carousel className="hero">

      <div>
        <img className="carousel-images" src="https://i.imgur.com/Huco3rp.jpg" />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img className="carousel-images" src="https://i.imgur.com/g77ip9x.jpg" />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img className="carousel-images" src="https://i.imgur.com/H7iBOQY.jpg" />
        <p className="legend">Legend 3</p>
      </div>

    </Carousel>
  )

}


export default DemoCarousel


