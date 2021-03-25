//import React, { Component } from 'react'
//import { render } from 'react-dom'

import React, { useState, useEffect } from 'react'
import axios from 'axios'

import CanvasDraw from '../drawing/index'

const Gallery = () => {
  const [doodles, setDoodles] = useState([])

  useEffect(() => {
    const getData = async() => {
      const response = await axios.get('/api/artwork')
      setDoodles(response.data)
    }
    getData()
  }, [])


  return (
    <div className='columns'>
      <div className='column'>
        {doodles.map(artwork => {
          //if (artwork === undefined) return null
          return  <div div key={artwork._id}>
            <p>{artwork.title}</p>
            <CanvasDraw       
              disabled
              hideGrid
              saveData={artwork.doodleData}
              //saveData={artwork.doodleData}
            />
          </div>
        })}
      </div>
    </div>
  )
}

// class Gallery extends Component {
//   state = {
//     allArtwork: [],
//     formData: {
//       title: '',
//       description: '',
//       doodleData: ''
//     }
//   }
//   componentDidMount() {
//     const getDoodles = async () => {
//       try {
//         const res = await fetch('api/artwork')
//         const data = await res.json()
//         this.setState({ allArtwork: data })
//         //console.log(data)
//         //console.log(data[4].doodleData)
//       } catch (err) {
//         console.log(err)
//       }
//     }
//     getDoodles()
//   }
//   render() {
//     console.log('this.state.allArtwork ->', this.state.allArtwork)
//     //if (this.state.allArtwork[0] === undefined) return <div>hi</div>
//     return (
//       <div className='columns'>
//         <div className='column'>
//           {this.state.allArtwork.map(artwork => {
//             //if (artwork === undefined) return null
//             return  <div div key={artwork._id}>
//               <p>{artwork.title}</p>
//               <CanvasDraw       
//                 disabled
//                 hideGrid
//                 saveData={artwork.doodleData}
//                 //saveData={artwork.doodleData}
//               />
//             </div>
//           })}
//         </div>
//       </div>
//     )
//   }
// }
export default Gallery
