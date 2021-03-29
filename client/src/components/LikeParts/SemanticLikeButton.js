// eslint-disable-next-line no-unused-vars
import 'semantic-ui-css/semantic.min.css'
//import '../../styles/componentStyles/artCard.scss'
import React, { useState, useEffect } from 'react'
import { getTokenFromLocalStorage } from '../../helpers/authHelp'
import axios from 'axios'
import { Button, Icon, Label } from 'semantic-ui-react'
import { toast } from 'react-toastify'
//* Pass in the ID as props from parent component. 
//* will send authentication header to DB
//* Add check to see if user is logged in so they can like! 

const LikeButton = ({ id }) => {
  const [totalFavourites, setTotalFavourites] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [likeSuccess, setLikeSuccess] = useState(false) 
  //console.log('🐝 ~ file: SemanticLikeButton.js ~ line 15 ~ likeSuccess', likeSuccess)
  // eslint-disable-next-line no-unused-vars
  const [likeId, setLikeId] = useState('') 


  useEffect(() => {
    refreshFavourites()
  }, [])

  setInterval(() => { //? refreshes number of likes every x seconds
  
    refreshFavourites()  
  }, 5 * 1000) //? x * 1000ms
    
  const refreshFavourites = async () => {
    const response = await axios.get(`api/artwork/${id}`)
    const data = response.data
    const latestTotalFavourites = data.totalFavourites
    setTotalFavourites(latestTotalFavourites)
  }
  //! set likeId to state 


  const handleLike = async () => {
    const notifyPopup = (wasLikeSuccess) => {
      if (wasLikeSuccess === false){ //!for testing = false 
        toast.success('Liked!', {
          position: 'top-center',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false
        })
      } 
    }
    try {   
      const token = getTokenFromLocalStorage()
      const likeResponse = await axios.post(`api/${id}/like`, null, { headers: { Authorization: `Bearer ${token}` } } ) 
      console.log('🐝 ~ file: SemanticLikeButton.js ~ line 57 ~ likeResponse', likeResponse)
      refreshFavourites()
      setLikeSuccess(true)
      notifyPopup(true)
      
      console.log('🔴 click above 1 ')
      //console.log('🐝 ~ file: ArtCard.js ~ line 25 ~ postResponse', postResponse)
    } catch (err) {
      console.log('🔴 ~ file: ArtCard.js ~ line 31~ err', err.message)
      setLikeSuccess(false)
      notifyPopup(false)
    }
  }

  //! get  id for the like from the response in the above function
  //! make backend send id in response in the like function 
  const removeLike = async () => {
    const likeToRemove = await axios.delete('api/artwork/${id}/:likeId')
    console.log('🐝 ~ file: SemanticLikeButton.js ~ line 41 ~ undo', likeToRemove)
    const token = getTokenFromLocalStorage()
    await axios.post(`api/${id}/${likeId}`, null, { headers: { Authorization: `Bearer ${token}` } } ) 
  }

  return (
    <div className='like-btn-and-counter '>
      <Button as='div' labelPosition='right'>
        { !likeSuccess && 
        <Button  color='red' onClick={handleLike}>
          <Icon name='heart' />
        Like
        </Button>
        }
        { likeSuccess && 
        <Button onClick={removeLike} color='blue' >
          <Icon name='heart' />
        Like
        </Button>
        }
        <Label as='a' basic color='red' pointing='left'>
          {totalFavourites}
        </Label>
         
      </Button>
    </div>
  )
}

export default LikeButton
