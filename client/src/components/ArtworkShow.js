import '../styles/componentStyles/artworkPage.scss'
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
// import ReactStars from 'react-rating-stars-component'
import CanvasDraw from '../drawing/index'
import LZString from 'lz-string'
import { userIsOwner, userIsAuthenticated } from '../helpers/authHelp'
//import ArtCard from './ArtCard'
//import StarsAndRating from './CommentParts/StarsAndRating'
import CommentForm from './CommentParts/CommentForm'
import CommentFeed from './CommentParts/CommentFeed'

const ArtworkShow = () => {
  const [doodle, setDoodle] = useState(null)

  const params = useParams()
  // console.log('params ->', params.id)

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/artwork/${params.id}`)
      console.log('🐝 ~ file: ArtworkShow.js ~ line 22 ~ response', response)
      setDoodle(response.data)
    }
    getData()
  }, [])

  //! What is this? can we lose it?
  // const [doodles, setDoodles] = useState([])
  // console.log('🤖 ~ file: Gallery.js ~ line 9 ~ doodles', doodles)
  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await axios.get('/api/artwork')
  //     setDoodles(response.data)
  //   }
  //   getData()
  // }, [])

  if (!doodle) return null

  console.log('comments>>>', doodle.comments.commentText)
  const decompressedDoodleData = LZString.decompressFromEncodedURIComponent(doodle.doodleData)
  // console.log('parsed bg', decompressedDoodleData.backgroundColor)
  const { id } = doodle
  console.log('id', id)
  return (
    <div className="main-show">
      <div className="page-wrapper">
        <div className="description-wrapper">
          <div className="desc-top-row">
            <h1 className="title">{doodle.title}</h1>
            <Link to={`/profile/${doodle.owner._id}`}>{doodle.owner.username}</Link>
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
          {/* { userIsAuthenticated() && 
          <CommentForm { ...doodle } />
          } */}

          { !userIsOwner(doodle.owner._id) && userIsAuthenticated() && 
          <CommentForm { ...doodle } />
          }

          <CommentFeed _id={id}  />
          {/* <div className="doodle-show-comments">
          <div className='gallery columns is-multiline'>

            {doodles.map((doodle) => {
              <div key={doodle.comments} className='column  is-one-third art-card-container'>
                <ArtCard {...doodle.comments.commentText} />
              </div>
            })}
          </div>
        </div> */}
          { userIsOwner(doodle.owner._id) && 
        <Link className="button is-warning" to={`/gallery/${params.id}/edit`}>Edit</Link>
          }
        </div>
      </div>
    </div>
  )
}

export default ArtworkShow

