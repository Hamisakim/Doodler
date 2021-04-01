import React from 'react'
// import ReactDOM from 'react-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import demoDoodleOne from '../../assets/demo-doodle.png'
import demoDoodleTwo from '../../assets/demo-doodle-2.png'
import demoDoodleThree from '../../assets/demo-doodle-3.png'
import demoDoodleFour from '../../assets/demo-doodle-4.png'
import demoDoodleFive from '../../assets/demo-doodle-5.png'
import '../../styles/componentStyles/home.scss'

const DemoCarousel = () => {

  return (
    <Carousel
      // className="hero"
      autoPlay={true}
      showThumbs={false}
<<<<<<< HEAD
      interval={3000} 
      infiniteLoop={true}
      showArrows={true}
      stopOnHover={false}
      transitionTime={2000}>
=======
      infiniteLoop={true}>
>>>>>>> 3015eff958a9eb52c9dae2c0976ed45defa63f34
      <div>
        <img className="carousel-images" src={demoDoodleOne} />
      </div>
      <div>
        <img className="carousel-images" src={demoDoodleFive} />
      </div>
      <div>
        <img className="carousel-images" src={demoDoodleTwo} />
      </div>
      <div>
        <img className="carousel-images" src={demoDoodleThree} />
      </div>
      <div>
        <img className="carousel-images" src={demoDoodleFour} />
      </div>
    </Carousel>
  )

}


export default DemoCarousel


