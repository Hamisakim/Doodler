import React from 'react'

const Home = () => {


  return (
    <section className="hero is-medium is-link">
      <div className="hero-body" id="hero-body">
        {/* <a href="https://i.imgur.com/Of47BNO.jpg"></a> */}
        <p className="title">
          Medium hero
        </p>
        <p className="subtitle">
          Medium subtitle
        </p>
      </div>
      <div className="columns">
        <div className="column is-one-third">Doodle</div>
        <div className="column is-one-third">Gallery</div>

      </div>
    </section>
  )
}

export default Home