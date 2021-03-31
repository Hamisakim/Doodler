import React from 'react'
// import ReactDOM from 'react-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

const DemoCarousel = () => {




  return (
    <Carousel
      // className="hero"
      autoPlay={true}
      showThumbs={false}>
      <div>
        <img className="carousel-images" src="https://i.imgur.com/Huco3rp.jpg" />
      </div>
      <div>
        <img className="carousel-images" src="https://i.imgur.com/g77ip9x.jpg" />
      </div>
      <div>
        <img className="carousel-images" src="https://i.imgur.com/H7iBOQY.jpg" />
      </div>
    </Carousel>
  )

}


export default DemoCarousel


