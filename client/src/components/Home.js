import React from 'react'
import '../styles/componentStyles/home.scss'
import { Link } from 'react-router-dom'

const Home = () => {


  return (
    <>
      <div className="section-header">
        <h2 className="section-title">
          <img src="https://i.imgur.com/wNw1Uug.jpg" alt="Airbnb Logo" className="second-logo"></img>
        </h2>
      </div>
      <section className="hero is-medium is-link">
        <div className="hero-body" id="hero-body">
        </div>

      </section>
      <section className="section">
        <ul className="grid">
          <li className="grid-item">
            <Link to="/doodle" className="homepage page-doodle">
              <h3 className="homepage-title shadow">Doodle</h3>
            </Link>
          </li>
          <li className="grid-item">
            <Link to="/gallery" className="homepage page-gallery">
              <h3 className="homepage-title shadow">Gallery</h3>
            </Link>
          </li>
        </ul>
      </section>
      <section>
        // To use lazy loading, set a data-lazy attribute
        // on your img tags and leave off the src

        <img data-lazy="img/lazyfonz1.png" />

        {/* $('.lazy').slick({
          lazyLoad: 'ondemand',
          slidesToShow: 3,
          slidesToScroll: 1
        }); */}

        $('.autoplay').slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
        });
      </section>
    </>
  )
}

export default Home