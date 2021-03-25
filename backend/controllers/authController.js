import User from '../models/userModel.js'

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