import '../styles/componentStyles/doodle.scss'
import React, { useState, useEffect, useRef } from 'react'
import { CompactPicker } from 'react-color'
import CanvasDraw from '../drawing/index'
import axios from 'axios'

const Doodle = () => {
  const [backgroundColor, setBackgroundColor] = useState('#fff')
  const [brushColor, setBrushColor] = useState('#B3B3B3')
  const [brushRadius, setBrushRadius] = useState(10)
  const [lazyRadius, setLazyRadius] = useState(12)

  let doodle = useRef(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    //doodleData: '{"lines":[],"width":400,"height":400}'
    doodleData: ''
  })
  useEffect(() => {
    setBackgroundColor(backgroundColor)
    setBrushColor(brushColor)
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
    const artworkToSend = doodle.getSaveData()
    const newFormData = { ...formData, doodleData: artworkToSend }
    setFormData(newFormData)

    const sendArtwork = async () => {

      await axios.post('/api/artwork', newFormData)
    }
    sendArtwork()
  }
  const handleClear = () => {
    doodle.clear()
    setBackgroundColor('#fff')
  }
  console.log(formData)
  return (
    <>
      <div className="page-wrapper">
        <div className="split-col-wraper">
          <div className="col">
            <CanvasDraw
              className="doodle-canvas"
              ref={canvasDraw => (doodle = canvasDraw)}
              brushColor={brushColor}
              backgroundColor={backgroundColor}
              brushRadius={brushRadius}
              lazyRadius={lazyRadius}
            />
          </div>
          <div className="col">
            <div>
              <div>
                <div>
                  <label>Brush-Radius:</label>
                  <div className="slidecontainer">
                    <input type="range" min="1" max="30" value={brushRadius} className="slider" id="myRange" onChange={e =>
                      setBrushRadius(parseInt(e.target.value, 10))
                    } />
                  </div>
                </div>
                <div>
                  <label>Lazy-Radius:</label>
                  <div className="slidecontainer">
                    <input type="range" min="1" max="100" value={lazyRadius} className="slider" id="myRange" onChange={e =>
                      setLazyRadius(parseInt(e.target.value, 10))
                    } />
                  </div>
                </div>
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
          </div>
        </div>
        <div className="doodle-details-wrapper">
          <div>
            <hr />
            <div>
              <input
                className="input"
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <hr />
            <div>
              <textarea
                className="textarea"
                placeholder="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>
          <hr />
          <div>
            <button className="button is-primary" onClick={() => handleSave()}> Save </button>
            <button className="button is-warning" onClick={() => doodle.undo()}> Undo </button>
            {/* <button className="button is-danger" onClick={() => doodle.clear()}> Clear </button> */}
            <button className="button is-danger" onClick={() => handleClear()}> Clear </button>
          </div>

        </div>
      </div>
    </>
  )
}
export default Doodle