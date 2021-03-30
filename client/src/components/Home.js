import React from 'react'
import '../styles/componentStyles/home.scss'
import { Link } from 'react-router-dom'

const Home = () => {


  return (
    <div className="main">
      <div className="section-header">
        <h2 className="section-title">
          <img src="https://i.imgur.com/wNw1Uug.jpg" alt="Airbnb Logo"></img>
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
        {/* <head>
          <title>My Now Amazing Webpage</title>
          <link rel="stylesheet" type="text/css" href="slick/slick.css" />
          <link rel="stylesheet" type="text/css" href="slick/slick-theme.css" />
        </head>
        <body>

          <div className="your-class">
            <div>your content</div>
            <div>your content</div>
            <div>your content</div>
          </div>

          <script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
          <script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
          <script type="text/javascript" src="slick/slick.min.js"></script>

          <script type="text/javascript">
            $(document).ready(function() {
              $('.your-class').slick({
                setting- name: setting-value
              });
            });
          </script>

        </body>
 */}

      </section>
    </div>
  )
}

export default Home