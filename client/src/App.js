import React, { useState, useEffect, useRef } from 'react'
import CanvasDraw from './drawing/index'
// import { GithubPicker, TwitterPicker, CompactPicker, SliderPicker, SketchPicker } from 'react-color'
import { ChromePicker } from 'react-color'
import axios from 'axios'

function App() {
  const [color, setColor] = useState('#000') //* setting initial color for the brush 
  // eslint-disable-next-line no-unused-vars
  const [artwork, setArtwork] = useState('') //* setting state for artwork which we get from the built in  CanvasDraw package 

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    doodleData: {}
  })

  let doodleRef = useRef(null) //? top canvas = doodleRef DON'T MESS WITH IT 
  let doodleShow = useRef(null)//? show canvas = doodleShow DON'T MESS WITH IT 

  useEffect(() => {
    setColor(color)
  }, [])

  const handleSave = () => {
    const artworkToSend =  doodleRef.getSaveData()
    const newFormData = { ...formData, doodleData: artworkToSend }
    setFormData(newFormData)
    console.log('hewllo')
    const sendArtwork = async() => {
      await axios.post('api/artwork', formData)
    }
    sendArtwork()
  }





  
  return (
    <>
      <div>
        <button onClick={() => {
          handleSave()
        }}
          // onClick={() => {
          //   localStorage.setItem(
          //     'savedDrawing',
          //     doodleRef.getSaveData(),
          //     console.log('save data', doodleRef.getSaveData())
          //   )
          // }}
        > Save </button>

        <button
          onClick={() => {
            doodleRef.clear()
          }}
        > Clear </button>
        <button
          onClick={() => {
            doodleRef.undo()
          }}
        > Undo </button>
      </div>
      {/* <GithubPicker />
      <TwitterPicker /> */}
      <ChromePicker 
        color={color}
        onChangeComplete={color => {
          setColor(color.hex)
        }}
      />
      {/* <SliderPicker /> */}
      {/* <SketchPicker /> */}
      <CanvasDraw
        ref={canvasDraw => (doodleRef = canvasDraw)}
        brushColor={color}
      />
      <button
        onClick={() => {
          doodleShow.loadSaveData(
            localStorage.getItem('savedDrawing')
          )
        }}
      > Display saved doodle </button>
      <CanvasDraw
        ref={canvasDraw => (doodleShow = canvasDraw)}
        disabled
        hideGrid 
        saveData={localStorage.getItem('savedDrawing')}
      />
      
    </>
  )
}

export default App
