import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Canvas from './Canvas'
import Gallery from './components/Gallery'
import HomePage from './components/HomePage'
const App = () => {
 
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path='/'>
            <HomePage />
          </Route>

          <Route path='/gallery'>
            <Gallery/>
          </Route>

          <Route path='/canvas'>
            <Canvas/>
          </Route>

        </Switch>
      </BrowserRouter>

    </>
  )
}

export default App
