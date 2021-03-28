/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const history = useHistory()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  console.log('🐝 ~ file: Login.js ~ line 11 ~ formData', formData)
  const handleChange = (event) => {
    //?get the value of what's being typed in the form and updating state
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    console.log('🐝 ~ file: Login.js ~ line 14 ~ event', event)
    setFormData(newFormData)
  }
  const handleSubmit = async (event) => {
    console.log('🐝 ~ file: Login.js ~ line 21 ~ handleSubmit', )
    //?sending to our api
    event.preventDefault()
    try {
      const response = await axios.post('api/login', formData)
      //* adding token
      window.localStorage.setItem('token',response.data.token)
      console.log('🐝 ~ file: Login.js ~ line 26 ~ response', response)
      history.push('/doodle-new') 
    } catch (err) {
      // const errorMessageToSend = `${response.data.message}. Please contact us if you have forgotten your password`
      //console.log('🐝 ~ file: Login.js ~ line 29 ~ errorMessageToSend', errorMessageToSend)
      console.log('🐝 ~ file: Login.js ~ line 32 ~ err', err)
    }
  }
  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="columns">
            <form onSubmit={handleSubmit}className="box column is-half is-offset-one-quarter">
              <legend className='has-text-centered'> <h1>Login </h1></legend>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="username"
                    name="username"
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    //value={formData.password}
                  />
                </div>
              </div>
              <div className="field">
                <button className="button is-block is-info is-large is-fullwidth">Login</button><br />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Login
