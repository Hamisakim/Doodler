// eslint-disable-next-line no-unused-vars
import 'semantic-ui-css/semantic.min.css'
//import '../../styles/componentStyles/artCard.scss'
import React, { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { getTokenFromLocalStorage, userIsOwner, getPayloadFromToken, userIsAuthenticated } from '../../helpers/authHelp'
import axios from 'axios'
import { Button, Icon, Label } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { userNeedsToLogin } from '../../helpers/popUps'

//* Pass in the ID as props from parent component. 
//* will send authentication header to DB
//* Add check to see if user is logged in so they can like! 
//* Will keep current likes = to those on database 

const LikeButton = ({ id }) => {
  const [totalFavourites, setTotalFavourites] = useState(0)
  const [userLikedAlready, setUserLikedAlready] = useState(null)
  useEffect(() => {
    refreshFavourites()
    const interval = setInterval(refreshFavourites, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  // useEffect(() => {
  //   refreshFavourites()
  // },[userLikedAlready])

  const refreshFavourites = async () => {
    const response = await axios.get(`/api/artwork/${id}`)
    const data = response.data
    const latestTotalFavourites = data.totalFavourites
    setTotalFavourites(latestTotalFavourites)
    const payload = getPayloadFromToken()
    const currentUserId = JSON.stringify(payload.sub)
    userIsOwner(currentUserId)
    const favouritesArray = data.favourites
    const hasUserLikedBefore = favouritesArray.find(item => JSON.stringify(item.owner) === currentUserId)
    if (hasUserLikedBefore){
      setUserLikedAlready(true)
    } else if (!hasUserLikedBefore){
      setUserLikedAlready(false)
    }
  }
  
  const notifyPopup = (wasLikeSuccess) => { //! put this outside 
    if (wasLikeSuccess === true){ //!for testing = false 
      toast.success('Liked!', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        pauseOnFocusLoss: false
      })
    } else toast.error('Unliked!', {
      position: 'top-right', 
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false
    })
  } 

  const handleLike = async () => {

    if (!userIsAuthenticated()){
      userNeedsToLogin('Please login to like!')
      return null
    }
    try {   
      const token = getTokenFromLocalStorage()
      const likeResponse = await axios.post(`/api/${id}/like`, null, { headers: { Authorization: `Bearer ${token}` } } ) 
      refreshFavourites()
      if (likeResponse.data.message === 'liked!') {
        notifyPopup(true)
        // setUserLikedAlready(true)
      } else {
        notifyPopup(false)
      }
    } catch (err) {
      notifyPopup(false)
    }
  }


  return (
    <div className='like-btn-and-counter '>
      <Button as='div' labelPosition='right'>
        { !userLikedAlready && 
        <Button  color='#42c298' onClick={handleLike}>
          <Icon name='heart' />
        Like
        </Button>
        }
       
        { userLikedAlready &&  
        <Button onClick={handleLike}  color='red' >
          <Icon name='heart' />
        Unlike
        </Button>
        }
        
        <Label as='a' basic color='black' pointing='left'>
          {totalFavourites}
        </Label>
         
      </Button>
    </div>
  )
}

export default LikeButton
