import React, { Component } from 'react'
//import { render } from 'react-dom'
import { CompactPicker } from 'react-color'
import CanvasDraw from './drawing/index'
// ? how to handle 2 bits of state in a class based component? 1) doodleProps 2) formData
// need to map through each object and render a canvas with the save data(doodleData) from that db objec id
class Canvas extends Component {
  state = {
    drawData: {
      color: '#ffc600',
      width: 400,
      height: 400,
      brushRadius: 10,
      lazyRadius: 12
    },
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
    return (
      <div>
        <div>
          <button
            onClick={() => {
              // ? GET REQUEST PAYLOAD HERE ?
              localStorage.setItem(
                'savedDrawing',
                this.saveableCanvas.getSaveData(),
                console.log('save data', this.saveableCanvas.getSaveData())
              )
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              this.saveableCanvas.clear()
            }}
          >
            Clear
          </button>
          <button
            onClick={() => {
              this.saveableCanvas.undo()
            }}
          >
            Undo
          </button>
          <div>
            <label>Width:</label>
            <input
              type="number"
              value={this.state.drawData.width}
              onChange={e =>
                this.setState({ drawData: { width: parseInt(e.target.value, 10) } })
              }
            />
          </div>
          <div>
            <label>Height:</label>
            <input
              type="number"
              value={this.state.drawData.height}
              onChange={e =>
                this.setState({ drawData: { height: parseInt(e.target.value, 10) } })
              }
            />
          </div>
          <div>
            <label>Brush-Radius:</label>
            <input
              type="number"
              value={this.state.drawData.brushRadius}
              onChange={e =>
                this.setState({ drawData: { brushRadius: parseInt(e.target.value, 10) } })
              }
            />
          </div>
          <div>
            <label>Lazy-Radius:</label>
            <input
              type="number"
              value={this.state.drawData.lazyRadius}
              onChange={e =>
                this.setState({ drawData: { lazyRadius: parseInt(e.target.value, 10) } })
              }
            />
          </div>
        </div>
        <CompactPicker 
          color={this.state.drawData.color}
          onChangeComplete={color => {
            this.setState({ drawData: { color: color.hex } })
          }}
        />
        <CanvasDraw
          ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
          brushColor={this.state.drawData.color}
          brushRadius={this.state.drawData.brushRadius}
          lazyRadius={this.state.drawData.lazyRadius}
          canvasWidth={this.state.drawData.width}
          canvasHeight={this.state.drawData.height}
        />
        <p>
          The following is a disabled canvas with a hidden grid that we use to
          load & show your saved drawing.
        </p>
        <button
          onClick={() => {
            this.loadableCanvas.loadSaveData(
              // ! GET REQUEST PAYLOAD HERE
              //JSON.stringify(this.state.allArtwork[0])
            )
          }}
        >
          Load what you saved previously into the following canvas. Either by
          calling `loadSaveData()` on the components reference or passing it
          the `saveData` prop:
        </button>
        <CanvasDraw
          disabled
          hideGrid
          ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
          saveData={localStorage.getItem('savedDrawing')}
        />
        {this.state.allArtwork.map(artwork => {
          return <CanvasDraw
            key={artwork._id}
            disabled
            hideGrid
            ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
            saveData={JSON.stringify(artwork.doodleData)}
          />
        })}
      </div>
    )
  }
}
export default Canvas