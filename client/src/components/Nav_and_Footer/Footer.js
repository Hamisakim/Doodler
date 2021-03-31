import React from 'react'
import { Link } from 'react-router-dom'
// import About from '../About'


const NavBar = () => {


  return (
    <footer className="footer" id="footer">
      <div className="">
        <div className="">
          <Link to="/about">
            About
          </Link>
        </div>
        <div className="">
          <p>
            DOODLER 2021
          </p>
        </div>
      </div>
    </footer>
  )
}

export default NavBar
