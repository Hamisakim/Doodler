/* eslint-disable no-undef */
import '../../styles/componentStyles/Join.scss'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { loginPopUp } from '../../helpers/popUps.js'

const JoinPage = () => {
  // pass in props wether user clicked on the login or the register 
  // use conditional return to check each form. 
  //data is the same so . but is it worth it ? yes 
  // simple button will switch the condition to true or false if user has account or not 
  // easy 

  // eslint-disable-next-line no-unused-vars
  const [ wasLoginSuccess, setWasLoginSuccess ] = useState(null)
  console.log('🐝 ~ file: JoinPage.js ~ line 20 ~ wasLoginSuccess', wasLoginSuccess)
  const [isUserLoggedIn, setIsUserLoggedIn]  = useState(false)
  console.log('🐝 ~ file: JoinPage.js ~ line 14 ~ isUserLoggedIn', isUserLoggedIn)
  
  useEffect(() => {
    const token = window.localStorage.getItem('token')
    // const token = getTokenFromLocalStorage()
    console.log('🐝 ~ file: JoinPage.js ~ line 19 ~ token', token)
    setIsUserLoggedIn(!!token)
  },[isUserLoggedIn])


  const history = useHistory()
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })
  
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })
  console.log(errors, setErrors)
  
  const handleChange = (event) => {
    console.log('LOGGING')
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }
  

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const dataToSend = formData
      console.log('🤖 ~ formData', formData)
      const response =  await axios.post('api/join', dataToSend)
      console.log('🟢 ~ file: JoinPage.js ~ line 44 ~ response', response)
      console.log('signup 🥳')
      if (response){
        //const formToSendToLogin = { }
        const username  =  formData.username 
        console.log('🐝 ~ file: JoinPage.js ~ line 66 ~ username', username)
        const password = formData.password
        const loginData = { usernameOrEmail: username, password: password }
        console.log('🐝 ~ file: JoinPage.js ~ line 69 ~ password', password)
        console.log('🐝 ~ file: JoinPage.js ~ line 67 ~ loginData', loginData)
        const loginResponse = await axios.post('api/login',loginData )
        console.log('🐝 ~ file: Login.js ~ line 26 ~ response', loginResponse.data.message)
        loginPopUp(true)
        window.localStorage.setItem('token',loginResponse.data.token)
      }
      history.push('/doodle-new') 
      //history.push('/login') //!change back to /
    } catch (err) {
      setErrors(err.response)
      console.log('🔴 ~ file: JoinPage.js ~ line 44 ~ response',err.response)
      //setWasLoginSuccess(false)
      loginPopUp(false)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/login')
    // eslint-disable-next-line no-undef
    setIsUserLoggedIn(false)
  }

  return (
    <div className="main">
      { // check if user is logged in or not   
        isUserLoggedIn ? 
          <div className="box"> 
            <h1>you are logged in in already </h1>
            <button className='button is-danger' onClick={handleLogout} >Logout</button>
          </div>
          : //? conditional render 
          <div className="container has-text-centered">
            <div>
              <p className="subtitle is-4">Please sign up to proceed. 🎨</p>
              <br />
              <form className="signup-form box column is-half is-offset-one-quarter" onSubmit={handleSubmit}>
                <div className="field">
                  <p className="control ">
                    <input className="input is-medium" 
                      name="username" 
                      placeholder="Username" 
                      value={formData.username}
                      onChange={handleChange}
                    />

                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input className="input is-medium" 
                      name="email" 
                      placeholder="Email" 
                      value={formData.email}
                      onChange={handleChange}
                    />

                  </p>
                </div>
                <div className="field">
                  <p className="control ">
                    <input className="input is-medium" 
                    //type="password" 
                      name='password'
                      placeholder="Password" 
                      value={formData.password}
                      onChange={handleChange}
                      type='password'
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control password-confirmation-control ">
                    <input className="input is-medium" 
                      name="passwordConfirmation" 
                      placeholder="Confirm Password" 
                      value={formData.passwordConfirmation}
                      onChange={handleChange}
                      type='password'
                    />

                  </p>
                </div>
                <div className="field-button">
                  <button className="button box is-fullwidth hover-box">Sign Up</button><br />
                </div>
              </form>
        
            </div>
          </div>
      }
    </div>
  )
}

export default JoinPage
