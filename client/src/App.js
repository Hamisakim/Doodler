import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Canvas from './Canvas'
import Gallery from './components/Gallery'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path='/gallery'>
            <Gallery/>
      
          </Route>

          <Route path='/doodle'>
            <Canvas/>
      
          </Route>
        </Switch>
      </BrowserRouter>

    </>
  )
}

export default App
