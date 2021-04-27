import { toast } from 'react-toastify'

//**** just import the function and pass in parameter!! */

export const loginPopUp = (wasLoginSuccess) => { //* boolean
  //console.log('🐝 ~ file: Login.js ~ line 46 ~ wasLoginSuccess', wasLoginSuccess)
  if (wasLoginSuccess === true){
    toast.success('User Logged in 😁 Enjoy doodling!', {
      position: 'top-center',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false
    })
  } else if (wasLoginSuccess === false) {
    toast.error('🙀 something went wrong... Please try again!', {
      position: 'top-center',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false
    }) 
  }
}

export const commentPopup = (wasCommentSuccessful) => {
  if (wasCommentSuccessful === 0) {
    toast('Please write a comment', {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false
    })
  }
  //console.log('🐝 ~ file: Login.js ~ line 46 ~ wasLoginSuccess', wasLoginSuccess)
  if (wasCommentSuccessful === true){
    toast.success('Thanks for commenting!', {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false
    })
  } else if (wasCommentSuccessful === false) {
    toast.error('🙀 something went wrong... Please try again!', {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false
    }) 
  }
}

export const ratingPopup = (isThereRating) => {
  if (isThereRating === false) {
    toast.error('Please leave a rating', {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false
    })
  }
  //console.log('🐝 ~ file: Login.js ~ line 46 ~ wasLoginSuccess', wasLoginSuccess)
}

export const doodlePopup = (isThereTitle) => {
  if (isThereTitle === false) {
    toast.error('Please leave a title', {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false
    })
  } else if (isThereTitle === true)  {
    toast.success('🥳 Doodle saved 🥳', {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false
    })
  }
}


export const userNeedsToLogin = (message) => {
  toast.error(`${message}`, {
    position: 'top-right',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: false
  })

}