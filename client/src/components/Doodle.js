import React, { useState, useEffect, useRef } from 'react'
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

  let doodle = useRef(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    doodleData: ''
  })

  useEffect(() => {
    setBackgroundColor(backgroundColor)
    setBrushColor(brushColor)
    setWidth(width)
    setHeight(height)
    setBrushRadius(brushRadius)
    setLazyRadius(lazyRadius)
  }, [])

  // useEffect(() => {
  //   setFormData(formData)
  // }, [formData])

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

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
        <div>
          <div>
            <input
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <textarea
              placeholder="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
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
      <div>
        <label>BrushColor:</label>
        <div>
          <CompactPicker 
            color={brushColor}
            onChangeComplete={brushColor => {
              setBrushColor(brushColor.hex)
            }}
          />
        </div>
      </div>
      <div>
        <label>BackgroundColor:</label>
        <div>
          <CompactPicker 
            color={backgroundColor}
            onChangeComplete={backgroundColor => {
              setBackgroundColor(backgroundColor.hex)
            }}
          />
        </div>
      </div>
      <CanvasDraw
        ref={canvasDraw => (doodle = canvasDraw)}
        brushColor={brushColor}
        backgroundColor={backgroundColor}
        brushRadius={brushRadius}
        lazyRadius={lazyRadius}
        canvasWidth={width}
        canvasHeight={height}
      />
      <div>
        <button onClick={() => handleSave()}> Save </button>
        <button onClick={() => doodle.clear()}> Clear </button>
        <button onClick={() => doodle.undo()}> Undo </button>
      </div>
    </>
  )
}

export default Doodle