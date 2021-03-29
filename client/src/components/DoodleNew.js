import '../styles/componentStyles/doodle.scss'
import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { CompactPicker } from 'react-color'
import CanvasDraw from '../drawing/index'
import axios from 'axios'
import LZString from 'lz-string'

import { getPayloadFromToken, getTokenFromLocalStorage, userIsAuthenticated } from '../helpers/authHelp'
 
const DoodleNew = () => {
  const [backgroundColor, setBackgroundColor] = useState('#fff')
  const [brushColor, setBrushColor] = useState('#B3B3B3')
  const [brushRadius, setBrushRadius] = useState(10)
  const [lazyRadius, setLazyRadius] = useState(12)
  const [userId, setUserId] = useState(null)

  let doodle = useRef(null)

  const history = useHistory()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    doodleData: ''
  })
  useEffect(() => {
    setBackgroundColor(backgroundColor)
    setBrushColor(brushColor)
    setBrushRadius(brushRadius)
    setLazyRadius(lazyRadius)
  }, [])

  useEffect(() => {
    const payload = getPayloadFromToken()
    const userId = payload.sub
    console.log('payload', payload)
    console.log('userId', userId)
    setUserId(userId)
  }, [getPayloadFromToken()])

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSave = () => {
    const artworkToSend = LZString.compressToEncodedURIComponent(doodle.getSaveData())
    const newFormData = { ...formData, doodleData: artworkToSend, formData }
    setFormData(newFormData)

    // const compressed = LZString.compress(doodle.getSaveData())
    // console.log('original', doodle.getSaveData())
    // console.log('compressed', compressed)
    // console.log('decompressed', LZString.decompress(compressed))

    const sendArtwork = async () => {
      await axios.post('/api/artwork', newFormData, { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } } )
      history.push(`/profile/${userId}`)
    }
    sendArtwork()
  }

  const handleClear = () => {
    doodle.clear()
    setBackgroundColor('#fff')
  }

  console.log(formData)
  // const compressed = LZString.compress('hi there')
  // console.log('compressed', compressed)
  // console.log('compressed', LZString.decompress(compressed))

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
                  <label>Brush Radius:</label>
                  <div className="slidecontainer">
                    <input type="range" min="1" max="60" value={brushRadius} className="slider" id="myRange" onChange={e =>
                      setBrushRadius(parseInt(e.target.value, 10))
                    } />
                  </div>
                </div>
                <div>
                  <label>Lazy Radius:</label>
                  <div className="slidecontainer">
                    <input type="range" min="1" max="100" value={lazyRadius} className="slider" id="myRange" onChange={e =>
                      setLazyRadius(parseInt(e.target.value, 10))
                    } />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label>Brush Color:</label>
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
              <label>Background Color:</label>
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
            { userIsAuthenticated() &&
          <>
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
          </>
            }
          </div> 
          <hr />
          <div> 
            { userIsAuthenticated() && 
            <button className="button is-primary" onClick={() => handleSave()}> Save </button>
            }
            <button className="button is-warning" onClick={() => doodle.undo()}> Undo </button>
            {/* <button className="button is-danger" onClick={() => doodle.clear()}> Clear </button> */}
            <button className="button is-danger" onClick={() => handleClear()}> Clear </button>
            { !userIsAuthenticated() &&
            <>
              {/* <button className="button"> Save </button> */}
              <p>*sign up to save(insert link to login page here)</p>
            </> 
            }
          </div>

        </div>
      </div>
    
    </>
  )
}
export default DoodleNew