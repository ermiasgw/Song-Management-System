const User = require('../models/User')


const getAllUsers = async (req, res) => {
    const users = await User.find().select('-password').lean()

    res.json(users)
}


module.exports = {
    getAllUsers,
}