const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const League = require("../model/leagueModel");

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '1d' });
}

// login user
const loginUser = async (req, res) => {
    const {username, password} = req.body
    console.log(username, password)
    try {
        const user = await User.login(username, password)

        let cred = user.username
        let _id = user._id
        const token = createToken(user._id)
        res.status(200).json({cred, _id, token})
    } catch (Error) {
        console.log('error')
        res.status(400).json({error: Error.message})
    }
}


// sign up user
const signUser = async (req, res) => {
    const {username, email, password} = req.body

    try {
        const user = await User.signup(username, email, password)

        let cred = user.username
        let _id = user._id
        const token = createToken(user._id)
        res.status(200).json({cred, _id, token})
    } catch (Error) {
        res.status(400).json({error: Error.message})
    }
}

// update information
const updateUser = async (req, res) => {
    const {_id, username, email, password, league_id} = req.body
    try {
        const league = await User.updating(_id, username, email, password, league_id)

        res.status(200).json({username})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

module.exports = { loginUser, signUser, updateUser }
