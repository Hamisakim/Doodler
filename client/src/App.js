import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import Doodle from './components/Doodle'
import Navbar from './components/Nav_and_Footer/NavBar'
import Footer from './components/Nav_and_Footer/Footer'
import Home from './components/Home'
import Profile from './components/Profile'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          
          <Route exact path="/">
            <Home />
          </Route>

          <Route path='/gallery'>
            <Gallery />
          </Route>

          <Route path='/doodle'>
            <Doodle />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
          
        </Switch>
        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App
