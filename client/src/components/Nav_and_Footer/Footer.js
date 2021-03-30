import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {


  return (
    <footer className="footer" id="footer">
      <div className="level">
        <div className="level-item has-text-centered">
          <Link to="/about">
            About
          </Link>
        </div>
        <div className="level-item has-text-centered">
          <p>
            DOODLER 2021
          </p>
        </div>
      </div>

    </footer>

  )
}

export default NavBar
