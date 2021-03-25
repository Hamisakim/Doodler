import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'

export const registerUser = async(req, res) => {
  console.log('🤖 ~ file: authController.js ~ line 4 ~ req.body', req.body)
  try {
    const newUser = await User.create(req.body)
    return res.status(202).json({ message: `welcome ${newUser.username}` })
  } catch (err) {
    console.log('🤖 ~ file: authController.js ~ line 10 ~ err', err)
    return res.status(422).json({ message: err })
  }
}

export const loginUser = async(req, res) => {
  try {
    const userToLogIn = await User.findOne({ username: req.body.username })
    console.log('🤖 ~ file: authController.js ~ line 19 ~ userToLogIn', userToLogIn)
    if (!userToLogIn || !userToLogIn.validatePassword(req.body.password)) {
      throw new Error('x')
    }
    const token = jwt.sign({ sub: userToLogIn._id }, secret, { expiresIn: '7 days' })
    return res.status(200).json({ message: `Welcome back ${userToLogIn.username }`, token })
  } catch (err) {
    console.log(err)
    return res.status(422).json({ message: 'Unauthorized' })
  }
}