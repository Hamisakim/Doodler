import '../../styles/componentStyles/navbar.scss'
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

import { getPayloadFromToken, userIsAuthenticated } from '../../helpers/authHelp'

// userIsOwner

const NavBar = () => {
  const [userId, setUserId] = useState(null)

  const location = useLocation()
  useEffect(() => {

  }, [location.pathname])

  const history = useHistory()
  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  useEffect(() => {
    const payload = getPayloadFromToken()
    const userId = payload.sub
    console.log('payload', payload)
    console.log('userId', userId)
    setUserId(userId)
  }, [getPayloadFromToken()])

  //acess payload from local storage and pass into usi is owner function
  return (
    <nav className="navbar is-light">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/">
            <span role="img" aria-label="logo" className="title">😎</span>
          </Link>
        </div>
        <div className="navbar-start">
          { userIsAuthenticated() &&
        <>
          <Link to={`/profile/${userId}`} className="navbar-item">Profile</Link>
          <Link to="/doodle-new" className="navbar-item">Doodle</Link>
        </>
          }
          {/* <Link to="/doodle-new" className="navbar-item">Doodle</Link> */}
          <Link to="/gallery" className="navbar-item">Gallery</Link>
        </div>
        <div className="navbar-end">
          { !userIsAuthenticated() &&
        <>
          <Link to="/join" className="navbar-item">
            Sign Up
          </Link>

          <Link to="/login" className="navbar-item">
            Login
          </Link>
        </>
          }
          { userIsAuthenticated() &&
        <>
          <div className="navbar-item" onClick={handleLogout}>
            Logout
          </div>
        </>
          }
        </div>
      </div>
    </nav>
  )
}

export default NavBar
