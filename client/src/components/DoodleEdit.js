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

  const handleUpdate = () => {
    const artworkToSend = LZString.compressToEncodedURIComponent(doodleRef.getSaveData())
    const newFormData = { ...formData, doodleData: artworkToSend, formData }
    setFormData(newFormData)

    const sendArtwork = async () => {
      // ! PUT request here, make route in back end
      await axios.put(`/api/artwork/${params.id}/edit`, newFormData, { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } } )
      history.push(`/gallery/${params.id}`)
    }
    sendArtwork()
  }

  const handleRevert = () => {
    doodleRef.clear()
    console.log('doodle', doodle)
    console.log('doodleData', doodleData)
    const decompressedDoodleData = LZString.decompressFromEncodedURIComponent(doodle.doodleData)
    const doodleBg = JSON.parse(decompressedDoodleData).backgroundColor
    setBackgroundColor(doodleBg)
    doodleRef.loadSaveData(doodleData, true)
  }

  //if (!doodle) return null
  return (
    <>
      <div className="section-header">
        <svg className="page-sub-title" viewBox="0 0 349 148" version="1.1">
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Artboard" transform="translate(-1569.000000, -232.000000)" fill="#000000" fillRule="nonzero">
              <g id="Asset-4" transform="translate(1569.000000, 232.000000)">
                <path d="M97.52,91.91 C97.8,83.72 98.14,77.91 98.16,72.18 C98.16,65.71 97.8,59.25 97.82,52.78 C97.82,44.87 98.11,36.96 98.18,29.05 C98.18,26.17 98.06,23.28 97.86,20.41 C97.5010371,16.2218457 98.9158888,12.0752419 101.76,8.98 C102.803413,7.90704837 104.126882,7.14830545 105.58,6.79 C108.9,5.94 112.33,5.55 115.65,4.74 C121.01,3.44 126.37,3.68 131.75,4.37 C140.34,5.47 148.95,6.37 157.49,7.8 C170.6,9.92 180.95,16.48 189.02,27.18 C197.8,38.83 201.74,51.95 202.46,66.18 C203.06,77.9 201.17,89.13 195.58,99.69 C192.23,106.02 187.23,110.79 182.29,115.69 C171.86,126 158.94,132 145.19,136.34 C140.140746,137.844733 134.955823,138.849562 129.71,139.34 C126.55,139.69 123.27,138.83 120.05,138.53 C119.536469,138.413998 119.003531,138.413998 118.49,138.53 C110.79,141.99 104.21,138.81 102.49,130.68 C101.37,125.28 100.13,119.88 99.49,114.42 C98.54,106.18 98,97.84 97.52,91.91 Z M117.88,20.91 C118.23,23.91 118.77,26.64 118.88,29.38 C119.2,42.25 119.35,55.12 119.63,67.99 C119.91,80.58 117.88,93.21 120.41,105.77 C121.21,109.77 121.64,113.82 122.33,117.84 C122.41,118.28 123.04,118.97 123.41,118.97 C126.08,118.97 128.85,119.22 131.41,118.6 C136.41,117.37 141.3,115.41 146.33,114.17 C151.705242,112.863175 156.827581,110.677058 161.49,107.7 C166.23,104.7 170.49,100.84 174.88,97.32 C175.454313,96.8368349 175.909443,96.2277132 176.21,95.54 C183.48,78.74 182.52,62.05 175.27,45.54 C174.02,42.71 171.86,40.29 170.16,37.66 C165.880998,30.7776839 158.736894,26.1813746 150.7,25.14 C143.88,24.14 137.01,23.39 130.16,22.52 C126.08,22 122,21.42 117.88,20.86 L117.88,20.91 Z" id="Shape"></path>
                <path d="M18.36,20.81 C20.5183394,37.2209385 21.7502919,53.740453 22.05,70.29 C27.17,69.48 32.2,68.66 37.25,67.92 C39.71,67.56 42.25,66.86 44.64,67.22 C49.64,67.98 52.78,72.32 52.54,77.35 C52.3099734,82.2175576 48.4801259,86.1461567 43.62,86.5 C38.38,86.69 33.1,86.21 27.84,85.99 C26.54,85.94 25.24,85.78 23.36,85.63 C26.4803234,99.7570793 27.6445466,114.245939 26.82,128.69 C31.32,128.69 35.45,128.69 39.57,128.69 C50.19,128.6 60.8,128.46 71.41,128.38 C73.0382544,128.323768 74.6678016,128.444475 76.27,128.74 C81.6,129.91 84.8,134.24 84.2,139.22 C83.66,143.75 79.2,147.32 74.02,147.22 C70.64,147.13 67.27,146.63 63.88,146.48 C54.6,146.07 45.31,145.62 36.02,145.42 C27.73,145.24 19.72,143.42 11.69,141.66 C8.79,141.04 7.26,138.66 7.21,135.66 C7.08723754,134.753678 6.89670363,133.857834 6.64,132.98 C6.13,130.16 5.46,127.36 5.17,124.52 C3.83,111.29 2.44,98.06 1.38,84.81 C0.84,78.07 0.93,71.28 0.79,64.51 C0.62,56.51 0.45,48.58 0.39,40.62 C0.33,31.62 0.23,22.55 0.49,13.53 C0.64,8.59 3.67,5.63 8.49,5.12 C16.66,4.27 24.89,3.88 33.03,2.79 C39.87,1.88 46.37,3.19 52.96,4.47 C56.9,5.24 60.96,5.47 64.85,6.36 C66.8413524,6.8665469 68.7024121,7.79025965 70.31,9.07 C71.898568,10.3360341 72.4712322,12.492663 71.72,14.38 C71.2762369,16.3016788 69.6776446,17.7404118 67.72,17.98 C56.37,19.2 45.13,21.49 33.61,20.84 C28.65,20.57 23.56,20.81 18.36,20.81 Z" id="Path"></path>
                <path d="M304.81,19.18 C300.7,19.18 296.25,19.27 291.81,19.18 C280.696667,18.94 269.59,18.6466667 258.49,18.3 C255.518237,18.1315385 253.186838,15.686413 253.16,12.71 C253.037617,9.73206339 255.289159,7.18914441 258.26,6.95 C263.33,6.52 268.43,6.47 273.49,5.95 C282.17,5.1 290.83,4.08 299.49,3.05 C312.17,1.54 324.86,0.38 337.64,1.05 C339.578948,1.13845764 341.492102,1.52986125 343.31,2.21 C347.084491,3.49143765 349.431621,7.25688584 348.92,11.21 C348.45,14.66 345.42,17.46 341.29,17.91 C338.55,18.21 335.78,18.19 333.02,18.22 C328.02,18.22 323.02,18.22 317.74,18.22 C318.24,22.72 318.65,27 319.19,31.22 C321.107598,47.2492722 321.962799,63.3878357 321.75,79.53 C321.64,96.36 321.64,113.2 321.62,130.03 C321.62,131.91 321.81,133.8 321.76,135.68 C321.55,142.47 315.58,145.96 309.53,142.8 C305.890301,140.969499 303.623398,137.213362 303.7,133.14 C303.59,129.31 303.7,125.48 303.7,121.65 C303.7,95.08 303.56,68.51 303.7,41.94 C303.7,34.3 304.42,26.6 304.81,19.18 Z" id="Path"></path>
                <path d="M238.2,71.58 C237.48,85.19 236.69,96.28 236.39,107.39 C236.19,114.96 236.5,122.56 236.89,130.12 C237.16,135.33 234.27,139.97 229.43,141.12 C224.3555,142.35638 219.206015,139.382982 217.74,134.37 C216.991988,131.910775 216.631007,129.350173 216.67,126.78 C216.92,116.86 217.27,106.95 217.85,97.05 C218.53,85.33 219.5,73.63 220.3,61.92 C221.22,48.58 221.95,35.23 223.05,21.92 C223.5,16.56 224.67,11.25 225.63,5.92 C225.988519,3.23611286 228.292427,1.24110835 231,1.27 C233.664684,1.08001202 235.986845,3.06788889 236.21,5.73 C237.21,13.99 238.53,22.28 238.67,30.59 C238.89,45.08 238.36,59.59 238.2,71.58 Z" id="Path"></path>
              </g>
            </g>
          </g>
        </svg>
        
      </div>

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
            { userIsAuthenticated() && 
            <button className="button is-primary" onClick={() => handleUpdate()}> Update </button>
            }
            <button className="button is-warning" onClick={() => doodleRef.undo()}> Undo </button>
            {/* <button className="button is-danger" onClick={() => doodle.clear()}> Clear </button> */}
            <button className="button is-danger" onClick={() => handleRevert()}> Revert </button>
          </div>

        </div>
      </div>
    </>
  )
}
export default DoodleEdit