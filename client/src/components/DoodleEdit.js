/* eslint-disable no-unused-vars */

import '../styles/componentStyles/doodle.scss'
import React, { useState, useEffect, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { CompactPicker } from 'react-color'
import CanvasDraw from '../drawing/index'
import axios from 'axios'
import LZString from 'lz-string'



import { userIsAuthenticated, getTokenFromLocalStorage } from '../helpers/authHelp'

const DoodleEdit = () => {
  const [backgroundColor, setBackgroundColor] = useState('#fff')
  const [brushColor, setBrushColor] = useState('#B3B3B3')
  const [brushRadius, setBrushRadius] = useState(10)
  const [lazyRadius, setLazyRadius] = useState(12)
  const [doodle, setDoodle] = useState(null)
  const [doodleData, setDoodleData] = useState('')

  let doodleRef = useRef(null)

  const history = useHistory()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    doodleData: ''
  })

  const params = useParams()

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/artwork/${params.id}`)
      setDoodle(response.data)
      setFormData(response.data)
    }
    getData()
  }, [])

  useEffect(() => {
    setBrushColor(brushColor)
    setBrushRadius(brushRadius)
    setLazyRadius(lazyRadius)

    if (!doodle) return null
    const decompressedDoodleData = LZString.decompressFromEncodedURIComponent(doodle.doodleData)
    console.log('parsed bg', decompressedDoodleData.backgroundColor)
    const doodleBg = JSON.parse(decompressedDoodleData).backgroundColor
    setDoodleData(decompressedDoodleData)
    setBackgroundColor(doodleBg)
    console.log('doodle', doodle)
  }, [doodle])
  
  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSave = () => {
    const artworkToSend = LZString.compressToEncodedURIComponent(doodleRef.getSaveData())
    const newFormData = { ...formData, doodleData: artworkToSend, formData }
    setFormData(newFormData)

    const sendArtwork = async () => {
      // ! PUT request here, make route in back end
      await axios.put(`/api/artwork/${params.id}/edit`, newFormData, { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } } )
      history.push('/profile')
    }
    sendArtwork()
  }

  const handleClear = () => {
    doodleRef.clear()
    setBackgroundColor('#fff')

  }

  //if (!doodle) return null
  return (
    <>
      <div className="page-wrapper">
        <div className="split-col-wraper">
          <div className="col">
            <CanvasDraw
              className="doodle-canvas"
              ref={canvasDraw => (doodleRef = canvasDraw)}
              brushColor={brushColor}
              backgroundColor={backgroundColor}
              brushRadius={brushRadius}
              lazyRadius={lazyRadius}
              saveData={doodleData}
              immediateLoading={true}
            />
          </div>
          <div className="col">
            <div>
              <div>
                <div>
                  <label>Brush Radius:</label>
                  <div className="slidecontainer">
                    <input type="range" min="1" max="30" value={brushRadius} className="slider" id="myRange" onChange={e =>
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
            <hr />
            <div>
              <input
                className="input"
                placeholder="Title"
                name="title"
                value={formData.title}
                //value={doodle.title}
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
                //value={doodle.description}
                onChange={handleChange}
              />
            </div>
          </div>
          <hr />
          <div>
            { !userIsAuthenticated() &&
            <>
              <button className="button"> Save </button>
              <p>*sign up to save</p>
            </> 
            }
            { userIsAuthenticated() && 
            <button className="button is-primary" onClick={() => handleSave()}> Save </button>
            }
            <button className="button is-warning" onClick={() => doodleRef.undo()}> Undo </button>
            {/* <button className="button is-danger" onClick={() => doodle.clear()}> Clear </button> */}
            <button className="button is-danger" onClick={() => handleClear()}> Clear </button>
          </div>

        </div>
      </div>
    </>
  )
}
export default DoodleEdit