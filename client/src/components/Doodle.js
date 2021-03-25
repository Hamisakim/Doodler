//import React, { useState, useEffect, useRef, Component } from 'react'
import React, { useState, useEffect, useRef } from 'react'
//import { render } from 'react-dom'
import { CompactPicker } from 'react-color'
import CanvasDraw from '../drawing/index'
import axios from 'axios'

const Doodle = () => {
  const [backgroundColor, setBackgroundColor] = useState('#fafafa')
  const [brushColor, setBrushColor] = useState('#ffc600')
  const [width, setWidth] = useState(400)
  const [height, setHeight] = useState(400)
  const [brushRadius, setBrushRadius] = useState(10)
  const [lazyRadius, setLazyRadius] = useState(12)

  let doodle = useRef()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    doodleData: {}
  })

  useEffect(() => {
    setBackgroundColor(backgroundColor)
    setBrushColor(brushColor)
    setWidth(width)
    setHeight(height)
    setBrushRadius(brushRadius)
    setLazyRadius(lazyRadius)
  }, [])

  const handleSave = () => {
    const artworkToSend =  doodle.getSaveData()
    const newFormData = { ...formData, doodleData: artworkToSend }
    setFormData(newFormData)

    const sendArtwork = async() => {
      await axios.post('/api/artwork', formData)
    }
    sendArtwork()
  }


  return (
    <>
      <div>
        <button onClick={() => handleSave()}> Save </button>
        <button onClick={() => doodle.clear()}> Clear </button>
        <button onClick={() => doodle.undo()}> Undo </button>
      </div>
      <div>
        <div>
          <label>Width:</label>
          <input
            type="number"
            value={width}
            onChange={e =>
              setWidth(parseInt(e.target.value, 10))
            }
          />
        </div>
        <div>
          <label>Height:</label>
          <input
            type="number"
            value={height}
            onChange={e =>
              setHeight(parseInt(e.target.value, 10))
            }
          />
        </div>
        <div>
          <label>Brush-Radius:</label>
          <input
            type="number"
            value={brushRadius}
            onChange={e =>
              setBrushRadius(parseInt(e.target.value, 10))
            }
          />
        </div>
        <div>
          <label>Lazy-Radius:</label>
          <input
            type="number"
            value={lazyRadius}
            onChange={e =>
              setLazyRadius(parseInt(e.target.value, 10))
            }
          />
        </div>
      </div>
      <CompactPicker 
        color={brushColor}
        onChangeComplete={brushColor => {
          setBrushColor(brushColor.hex)
        }}
      />
      <CompactPicker 
        color={backgroundColor}
        onChangeComplete={backgroundColor => {
          setBackgroundColor(backgroundColor.hex)
        }}
      />
      <CanvasDraw
        ref={canvasDraw => (doodle = canvasDraw)}
        //ref={doodle}
        brushColor={brushColor}
        backgroundColor={backgroundColor}
        brushRadius={brushRadius}
        lazyRadius={lazyRadius}
        canvasWidth={width}
        canvasHeight={height}
      />
    </>
  )

}


// class Doodle extends Component {
//   state = {
//     drawData: {
//       color: '#ffc600',
//       width: 400,
//       height: 400,
//       brushRadius: 10,
//       lazyRadius: 12
//     },
//     formData: {
//       title: '',
//       description: '',
//       doodleData: ''
//     }
//   }
//   componentDidMount() {
    
//   }

//   render() {
//     console.log('this.state.allArtwork ->', this.state.allArtwork)
//     return (
//       <div>
//         <div>
//           <button
//             onClick={() => {
//               // ? GET REQUEST PAYLOAD HERE ?
//               localStorage.setItem(
//                 'savedDrawing',
//                 this.saveableCanvas.getSaveData(),
//                 console.log('save data', this.saveableCanvas.getSaveData())
//               )
//             }}
//           >
//             Save
//           </button>
//           <button
//             onClick={() => {
//               this.saveableCanvas.clear()
//             }}
//           >
//             Clear
//           </button>
//           <button
//             onClick={() => {
//               this.saveableCanvas.undo()
//             }}
//           >
//             Undo
//           </button>
//           <div>
//             <label>Width:</label>
//             <input
//               type="number"
//               value={this.state.drawData.width}
//               onChange={e =>
//                 this.setState({ drawData: { width: parseInt(e.target.value, 10) } })
//               }
//             />
//           </div>
//           <div>
//             <label>Height:</label>
//             <input
//               type="number"
//               value={this.state.drawData.height}
//               onChange={e =>
//                 this.setState({ drawData: { height: parseInt(e.target.value, 10) } })
//               }
//             />
//           </div>
//           <div>
//             <label>Brush-Radius:</label>
//             <input
//               type="number"
//               value={this.state.drawData.brushRadius}
//               onChange={e =>
//                 this.setState({ drawData: { brushRadius: parseInt(e.target.value, 10) } })
//               }
//             />
//           </div>
//           <div>
//             <label>Lazy-Radius:</label>
//             <input
//               type="number"
//               value={this.state.drawData.lazyRadius}
//               onChange={e =>
//                 this.setState({ drawData: { lazyRadius: parseInt(e.target.value, 10) } })
//               }
//             />
//           </div>
//         </div>
//         <CompactPicker 
//           color={this.state.drawData.color}
//           onChangeComplete={color => {
//             this.setState({ drawData: { color: color.hex } })
//           }}
//         />
//         <CanvasDraw
//           ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
//           brushColor={this.state.drawData.color}
//           brushRadius={this.state.drawData.brushRadius}
//           lazyRadius={this.state.drawData.lazyRadius}
//           canvasWidth={this.state.drawData.width}
//           canvasHeight={this.state.drawData.height}
//         />
//       </div>
//     )
//   }
// }
export default Doodle