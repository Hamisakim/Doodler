// eslint-disable-next-line no-unused-vars
import 'semantic-ui-css/semantic.min.css'
//import '../../styles/componentStyles/artCard.scss'
import React, { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { getTokenFromLocalStorage, userIsOwner, getPayloadFromToken } from '../../helpers/authHelp'
import axios from 'axios'
import { Button, Icon, Label } from 'semantic-ui-react'
import { toast } from 'react-toastify'

//* Pass in the ID as props from parent component. 
//* will send authentication header to DB
//* Add check to see if user is logged in so they can like! 
//* Will keep current likes = to those on database 

const LikeButton = ({ id }) => {
  console.log('🐝 ~ file: SemanticLikeButton.js ~ line 18 ~ id', id)
  const [totalFavourites, setTotalFavourites] = useState(0)
  const [userLikedAlready, setUserLikedAlready] = useState(null)
  console.log('🐝 ~ file: SemanticLikeButton.js ~ line 20 ~ userLikedAlready', userLikedAlready)

  useEffect(() => {
    refreshFavourites()
  }, [])


  //! when we go live set this timer off ---------
  // setInterval(() => { //? refreshes number of likes every x seconds //! don't delete 
  //   refreshFavourites()  
  // }, 5 * 1000) //? x * 1000ms 
  //! -----------------------------------


  const refreshFavourites = async () => {
    const response = await axios.get(`api/artwork/${id}`)
    const data = response.data
    //console.log('🐝 ~ file: SemanticLikeButton.js ~ line 30 ~ data', data)
    const latestTotalFavourites = data.totalFavourites
    setTotalFavourites(latestTotalFavourites)

    const payload = getPayloadFromToken()
    const currentUserId = JSON.stringify(payload.sub)
    console.log('🐝 ~ file: SemanticLikeButton.js ~ line 42 ~ currentUserId', currentUserId)
    userIsOwner(currentUserId)

    const favouritesArray = data.favourites
    console.log('🐝 ~ file: SemanticLikeButton.js ~ line 34 ~ favouritesArray', favouritesArray)
    const hasUserLikedBefore = favouritesArray.find(item => JSON.stringify(item.owner) === currentUserId)
    
    console.log('🐝 ~ file: SemanticLikeButton.js ~ line 49 ~ hasUserLikedBefore', hasUserLikedBefore)
    if (hasUserLikedBefore){
      setUserLikedAlready(true)
    }
  }
  const notifyPopup = (wasLikeSuccess) => { //! put this outside 
    if (wasLikeSuccess === true){ //!for testing = false 
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
    } else toast.error('Unliked!', {
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


  const handleLike = async () => {
    setUserLikedAlready(!userLikedAlready)
    console.log('🐝 ~ file: SemanticLikeButton.js ~ line 59 ~ handleLike' )
    try {   
      console.log('✅')
      const token = getTokenFromLocalStorage()
      const likeResponse = await axios.post(`api/${id}/like`, null, { headers: { Authorization: `Bearer ${token}` } } ) 
      console.log('🐝 ~ file: SemanticLikeButton.js ~ line 57 ~ likeResponse', likeResponse.data.message)
      refreshFavourites()
      if (likeResponse.data.message === 'liked!') {
        notifyPopup(true)
      } else {
        notifyPopup(false)
      }
    } catch (err) {
      console.log('🔴 ~ file: ArtCard.js ~ line 31~ err', err.message)
      notifyPopup(false)
    }
  }





  return (
    <div className='like-btn-and-counter '>
      <Button as='div' labelPosition='right'>
        { !userLikedAlready && 
        <Button  color='red' onClick={handleLike}>
          <Icon name='heart' />
        Like
        </Button>
        }
        { userLikedAlready &&  
        <Button onClick={handleLike}  color='blue' >
          <Icon name='heart' />
        Unlike
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
