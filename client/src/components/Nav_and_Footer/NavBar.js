import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="navbar is-light">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/">
            <span role="img" aria-label="logo" className="title">😎</span>
          </Link>
        </div>
        <div className="navbar-start">
          <Link to="/profile" className="navbar-item">Profile</Link>
          <Link to="/doodle-new" className="navbar-item">Doodle</Link>
          <Link to="/gallery" className="navbar-item">Gallery</Link>
        </div>
        <div className="navbar-end">
          <Link to="/join" className="navbar-item">
            Join
          </Link>
          <Link to="/login" className="navbar-item">
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
