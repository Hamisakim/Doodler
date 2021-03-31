import React from 'react'
// import ReactDOM from 'react-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

const DemoCarousel = () => {

  // function Slider() {
  //   let sliderArr = [
  //     <ImgComp src={pro1} />,
  //     <ImgComp src={pro2} />,
  //     <ImgComp src={pro3} />,
  //     <ImgComp src={pro1} />,
  //     <ImgComp src={pro2} />,
  //     <ImgComp src={pro3} />
  //   ];

  //   const [x, setX] = useState(0);
  //   useEffect(() => {
  //     const interval = setInterval(() => {setX(x => x + 100)}, 1000); // for automatic slider
  //     //return() =>{}
  //   }, []);

  //   const goLeft = () => {
  //     clearInterval(interval) // to stop slider 
  //     x === 0 ? setX(-100 * (sliderArr.length - 1)) : setX(x + 100);
  //   };
  //   const goRight = () => {
  //     x === -100 * (sliderArr.length - 1) ? setX(0) : setX(x - 100);
  //   };


  //   return (
  //     <div className="slider">
  //       {sliderArr.map((item, index) => {
  //         return (
  //           <div
  //             key={index}
  //             className="slide"
  //             style={{ transform: translateX(${x}%) }} >
  //             {item}
  //           </div>
  //         );
  //       })}
  //       <button id="goLeft" onClick={goLeft}  >
  //         <i>
  //           <IoIosArrowBack />
  //         </i>
  //       </button>
  //       <button id="goRight" onClick={goRight}>
  //         <i>
  //           <IoIosArrowForward />
  //         </i>
  //       </button>
  //     </div>
  //   );


  return (
    <Carousel className="hero">
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


