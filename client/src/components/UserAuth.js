/* eslint-disable no-undef */
import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/authHelp'
const UserAuth = () => {
  // pass in props wether user clicked on the login or the register 
  // use conditional return to check each form. 
  //data is the same so . but is it worth it ? yes 
  // simple button will switch the condition to true or false if user has account or not 
  // easy 

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
      console.log('🟢 ~ file: UserAuth.js ~ line 44 ~ response', response)
      console.log('signup 🥳')
      
      history.push('/login') //!change back to /
    } catch (err) {
      setErrors(err.response.data)
      console.log('🔴 ~ file: UserAuth.js ~ line 44 ~ response',err.response.data.message.message)
    }
  }
  const token = () =>{
    getTokenFromLocalStorage()
    console.log(getTokenFromLocalStorage())
  }
  console.log('🐝 ~ file: UserAuth.js ~ line 57 ~ token', token)

  return (<>
    { !token() && 
    <h1 className="box"> you are logged in in already </h1>
    }
    {getTokenFromLocalStorage && 
    <div className="container has-text-centered">
      <div className="column is-4 is-offset-4">
        <div className="box">
          <p className="subtitle is-4">Please signup or login to proceed.</p>
          <br />
          <form className='signup-form' onSubmit={handleSubmit}>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input className="input is-medium" 
                  name="email" 
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleChange}
                />
                <span className="icon is-medium is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="icon is-medium is-right">
                  <i className="fas fa-check"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input className="input is-medium" 
                  name="username" 
                  placeholder="Username" 
                  value={formData.username}
                  onChange={handleChange}
                />
                <span className="icon is-medium is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="icon is-medium is-right">
                  <i className="fas fa-check"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input className="input is-medium" 
                  //type="password" 
                  name='password'
                  placeholder="Password" 
                  value={formData.password}
                  onChange={handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input className="input is-medium" 
                  name="passwordConfirmation" 
                  placeholder="Confirm Password" 
                  value={formData.passwordConfirmation}
                  onChange={handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
              
            <button className="button is-block is-info is-large is-fullwidth">Sign Up</button><br />
                
          </form>
        </div>
            

      </div>
    </div>
    }
  </>
  )
}

export default UserAuth
