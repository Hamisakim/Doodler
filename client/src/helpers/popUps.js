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
      pauseOnHover: true,
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
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false
    }) 
  }
}

// export const loginPopUp = (wasLoginSuccess) => {
//   //console.log('🐝 ~ file: Login.js ~ line 46 ~ wasLoginSuccess', wasLoginSuccess)
//   if (wasLoginSuccess === true){
//     toast.success('Enjoy doodling!', {
//       position: 'top-center',
//       autoClose: 2500,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       pauseOnFocusLoss: false
//     })
//   } else if (wasLoginSuccess === false) {
//     toast.error('🙀 something went wrong... Please try again!', {
//       position: 'top-center',
//       autoClose: 2500,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       pauseOnFocusLoss: false
//     }) 
//   }
// }

//export const  = () => {}