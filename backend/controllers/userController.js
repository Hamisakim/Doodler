import User from '../models/userModel.js'

export const getAllUsers = async(req, res) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (err) {
    console.log('🆘 Something went wrong!', err)
    return res.status(404).json({ 'message': 'Not found' })
  }
}

export const getSingleUser = async(req, res) => {
  try {
    const { id } = req.params
    console.log('id ->', id)
    // ! dont forget to .populate()
    const singleUser = await User.findById(id)
    if (!singleUser) {
      throw new Error('no user exists with that id')
    }
    res.status(200).json(singleUser)
  } catch (err) {
    console.log('🆘 Something went wrong!', err)
    return res.status(404).json({ 'message': 'Not found' })
  }
}


//*-----Bio---------------------------------------------------


export const addBio = async (req, res) => {
  try {
    const { id } = req.params
    console.log('🐝 ~ file: userController.js ~ line 36 ~ req.params', req.params)
    const profileToEdit = await User.findById(id)
    console.log('🐝 ~ file: userController.js ~ line 38 ~ profileToEdit', profileToEdit)
    if (!profileToEdit) throw new Error('profile not found')
    
    console.log('🐝 ~ file: userController.js ~ line 41 ~ profileToEdit.bio.length', profileToEdit.bio.length)
    
    if (profileToEdit.bio.length === 0) {
      profileToEdit.bio.push(req.body)
      await profileToEdit.save()
    } else if (profileToEdit.bio.length > 0) {
      profileToEdit.bio.pop()
      profileToEdit.bio.push(req.body)
      await profileToEdit.save()
    }

    res.status(200).json(profileToEdit)
  } catch (err) {
    console.log('🆘 Something went wrong!', err)
    return res.status(404).json({ 'message': 'Couldnt add bio' })
  }

}