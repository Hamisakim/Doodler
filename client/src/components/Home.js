/* eslint-disable no-unused-vars */
import React from 'react'
import '../styles/componentStyles/home.scss'
import { Link } from 'react-router-dom'

import DemoCarousel from '../components/userStuff/Carousel'
import ProfileForm from './userStuff/ProfileForm'

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
        <DemoCarousel />
      </section>
      <section>
        <ProfileForm />
      </section>
    </div>
  )
}
export default Home