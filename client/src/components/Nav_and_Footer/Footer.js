import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {


  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <Link to="/about">
          About
        </Link>
        <p>
          DOODLER 2021
        </p>
      </div>
    </footer>

  )
}

export default NavBar
