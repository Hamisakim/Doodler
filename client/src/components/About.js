import React from 'react'
import '../styles/componentStyles/about.scss'



const About = () => {  
  return (
    <main>
      <div className="section-header-about section-header-create">
        <h1 className="about-title">Meet the team behind the doodle..</h1>    
      </div>
      <div className="page-wrapper-about box">  
        <div className="section-wrapper-about">  
          <p className="name">Ayo Olawoye</p>
          <p className="about">https://github.com/ayoolawoye</p>
          <p className="about">https://www.linkedin.com/in/ayodeji-olawoye-2481218b/</p>
        </div>
        <br />
        <div className="section-wrapper-about"> 
          <p className="name">Sami Hakim</p> 
          <p className="about">https://github.com/Hamisakim</p>
          <p className="about">https://www.linkedin.com/in/samihakim/</p>
        </div>
        <br />
        <div className="section-wrapper-about">  
          <p className="name">Aida Bourdis</p>
          <p className="about">https://github.com/lesroissamusent</p>
          <p className="about">https://www.linkedin.com/in/aida-bourdis-93b781205/</p>
        </div>
        <br />
        <div className="section-wrapper-about">  
          <p className="name">Eric Petsopoulos</p>
          <p className="about">https://github.com/ericpesto</p>
          <p className="about">https://www.linkedin.com/in/eric-petsopoulos-b5751761/</p>
        </div>
      </div>
    </main>
  )

}

export default About