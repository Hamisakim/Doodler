import '../styles/componentStyles/home.scss'
import React from 'react'

const Home = () => {


  return (
    <>
      <section className="hero is-medium is-link">
        <div className="hero-body" id="hero-body">
          {/* <p className="title">
            Medium hero
          </p> */}
          {/* <p className="subtitle">
            Medium subtitle
          </p> */}
        </div>

      </section>
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">
            <img src="https://i.imgur.com/wNw1Uug.jpg" alt="Airbnb Logo" className="second-logo"></img>
          </h2>
        </div>
        <ul className="grid">
          <li className="grid-item">
            <div className="homepage page-doodle">
              <h3 className="homepage-title shadow">Doodle</h3>
            </div>
          </li>
          <li className="grid-item">
            <div className="homepage page-gallery">
              <h3 className="homepage-title shadow">Gallery</h3>
            </div>
          </li>

        </ul>

      </section>
    </>
  )
}

export default Home