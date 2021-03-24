import React, { useState, useEffect, useRef } from 'react'
import CanvasDraw from './drawing/index'
// import { GithubPicker, TwitterPicker, CompactPicker, SliderPicker, SketchPicker } from 'react-color'
import { ChromePicker } from 'react-color'
import axios from 'axios'

function App() {
  const [color, setColor] = useState('#000') //* setting initial color for the brush 
  // eslint-disable-next-line no-unused-vars
  const [artwork, setArtwork] = useState('') //* setting state for artwork which we get from the built in  CanvasDraw package 
  let doodleRef = useRef(null) //? top canvas = doodleRef DON'T MESS WITH IT 
  let doodleShow = useRef(null)//? show canvas = doodleShow DON'T MESS WITH IT 

  useEffect(() => {
    setColor(color)
  }, [])


  const handleSave = () => {
    localStorage.setItem(
      'savedDrawing',
      doodleRef.getSaveData(),
      console.log('save data', doodleRef.getSaveData())
    )
    // const artwork = localStorage.getItem('savedDrawing')
    const artwork =  doodleRef.getSaveData()
    console.log('🤖 ~ file: App.js ~ line 26 ~ artwork', artwork)
    
    const sendArtwork = async(artwork) => {
      const response = await axios.post('api/artwork', artwork)
      console.log('🤖 ~ file: App.js ~ line 30 ~ response', response)

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
