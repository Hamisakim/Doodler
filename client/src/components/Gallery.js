import React, { Component } from 'react'
//import { render } from 'react-dom'


import CanvasDraw from '../drawing/index'
class Gallery extends Component {
  state = {
    allArtwork: [],
    formData: {
      title: '',
      description: '',
      doodleData: ''
    }
  }
  componentDidMount() {
    const getDoodles = async () => {
      try {
        const res = await fetch('api/artwork')
        const data = await res.json()
        this.setState({ allArtwork: data })
        //console.log(data)
        //console.log(data[4].doodleData)
      } catch (err) {
        console.log(err)
      }
    }
    getDoodles()
  }
  render() {
    console.log('this.state.allArtwork ->', this.state.allArtwork)
    //if (this.state.allArtwork[0] === undefined) return <div>hi</div>
    return (
      <div className='columns'>
        <div className='column'>
          {this.state.allArtwork.map(artwork => {
            //if (artwork === undefined) return null
            return  <div div key={artwork._id}>
              <p>{artwork.title}</p>
              <CanvasDraw       
                disabled
                hideGrid
                saveData={JSON.stringify(artwork.doodleData)}
              />
            </div>
          })}
        </div>
      </div>
    )
  }
}
export default Gallery
