import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/componentStyles/footer.scss'
// import About from '../About'


const Footer = () => {


  return (
    <footer className="footer" id="footer">
      <div className="inner-footer-wrapper">
        <div>
          <hr />
          <Link className="footer-link" to="/about">
            About
          </Link>
        </div>
        <div className="copyright-text">
          <p>
            {`DOODLER © ${new Date().getFullYear()}`}
          </p>
        </div>
        <hr />
      </div>
    </footer>
  )
}

export default Footer
