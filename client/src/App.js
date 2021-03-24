import React, { useState, useEffect, useRef } from 'react'
import CanvasDraw from './drawing/index'
// import { GithubPicker, TwitterPicker, CompactPicker, SliderPicker, SketchPicker } from 'react-color'
import { ChromePicker } from 'react-color'


function App() {
  const [color, setColor] = useState('#000')

  let doodleRef = useRef(null)
  let doodleShow = useRef(null)

  useEffect(() => {
    setColor(color)
  }, [])

  return (
    <>
      <div>
        <button
          onClick={() => {
            localStorage.setItem(
              'savedDrawing',
              doodleRef.getSaveData(),
              console.log('save data', doodleRef.getSaveData())
            )
          }}
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
