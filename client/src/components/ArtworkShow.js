import '../styles/componentStyles/artworkPage.scss'
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import ReactStars from 'react-rating-stars-component'
import CanvasDraw from '../drawing/index'
import LZString from 'lz-string'
import { userIsOwner } from '../helpers/authHelp'
import ArtCard from './ArtCard'


const ArtworkShow = () => {
  const [doodle, setDoodle] = useState(null)

  const params = useParams()
  // console.log('params ->', params.id)

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/artwork/${params.id}`)
      setDoodle(response.data)
    }
    getData()
  }, [])

  const handleRating = (newRating) => {
    console.log(newRating)
  }

  // STUUFFFF
  const [doodles, setDoodles] = useState([])
  // console.log('🤖 ~ file: Gallery.js ~ line 9 ~ doodles', doodles)
  
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/api/artwork')
      // console.log('🐝 ~ file: Gallery.js ~ line 17 ~ response', response)
      //setDoodles(null)
      setDoodles(response.data)
    }
    getData()
  }, [])

  // STUFFF

  if (!doodle) return null

  console.log('comments>>>', doodle.comments.commentText)
  const decompressedDoodleData = LZString.decompressFromEncodedURIComponent(doodle.doodleData)
  // console.log('parsed bg', decompressedDoodleData.backgroundColor)


  return (
    <div className="page-wrapper">
      <div className="description-wrapper">
        <div className="desc-top-row">
          <h1 className="title">{doodle.title}</h1>
          <p>{doodle.owner.username}</p>
        </div>
        { doodle.description &&
        <p>{doodle.description}</p>
        }
      </div>
      <div className="doodle-display-wrapper">
        <div className='canvas-container'>
          <CanvasDraw       
            disabled
            hideGrid
            loadTimeOffset={2.2}
            saveData={decompressedDoodleData}
            backgroundColor={JSON.parse(decompressedDoodleData).backgroundColor} 
          />
        </div>
      </div>
      <div className="doodle-comments-wrapper">
        <div className="doodle-add-comment">
          <form>
            <ReactStars
              count={5}
              onChange={handleRating}
              size={24}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
            <input
              className="input"
              placeholder="leave comment"
            />
          </form>
        </div>
        <div className="doodle-show-comments">
          <div className='gallery columns is-multiline'>
            {doodles.map((doodle) => {
              <div key={doodle.comments} className='column  is-one-third art-card-container'>
                <ArtCard {...doodle.comments.commentText} />
              </div>
            })}
          </div>
        </div>
        { userIsOwner(doodle.owner._id) && 
        <Link className="button is-warning" to={`/gallery/${params.id}/edit`}>Edit</Link>
        }
      </div>
    </div>
  )
}

export default ArtworkShow

