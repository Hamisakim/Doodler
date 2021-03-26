import { secret } from '../config/environment.js'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

export const secureRoute = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error('Missing header') // check if token has been sent with request

    const token = req.headers.authorization.replace('Bearer ', '')
    console.log('TOKEN >>', token)
    const payload = jwt.verify(token, secret)
    console.log('PAYLOAD >>', payload)
    const userToVerify = await User.findById(payload.sub)
    console.log('USER TO VERIFY', userToVerify)

    if (!userToVerify) throw new Error('User not found')

    req.currentUser = userToVerify

    next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'Unauthorized' })
  }
}