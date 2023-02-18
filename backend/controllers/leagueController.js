const League = require('../model/leagueModel')
const User = require('../model/userModel')

const buildLeague = async (req, res) => {
    const user_id = req.user._id
    const {name, number, score} = req.body

    try {
        const leagues = await League.makeLeague(user_id, name, number, score)
        // console.log('here')
        res.status(200).json(leagues)

    } catch (e) {
        console.log(e)
        res.status(400).json({error: e.message})
    }
}

const fetchAll = async (req, res) => {
    const user_id = req.user._id
    let emp = []
    try {
        const user = await User.findById(user_id);
        // const All = await League.find({owner_id: user_id})
        // emp = await League.find({owner_id: user_id})
        for (let i = 0; i < user.league_id.length; i++) {
            const All = await League.find({_id: user.league_id[i]})
            emp.push(All[0]);
        }
    } catch (e) {
        console.log(e.message)
    }
    res.status(200).json(emp)
}

const fetchLeague = async (req, res) => {
    const {id} = req.params
    // console.log(id)
    try {
        const league = await League.findById(id)
        res.status(200).json(league)
    } catch (e) {
        return res.status(404).json({error: 'No such workout;'})
    }
    // const {user_id, name} = req.body
    // console.log(user_id, name)
    // try {
    //     const league = await League.getLeague(user_id, name)
    //     console.log(league, 'this the leagyeing')
    //     res.status(200).json({league})
    // } catch (e) {
    //     console.log('error')
    //     res.status(400).json({error: e.message})
    // }
}

const updateLeague = async (req, res) => {
    const {id} = req.params

    try {
        const league = await League.updateLeague(id, req.body);
        res.status(200).json(league)
    } catch (e) {
        console.log(e);
        res.status(400).json({error: e.message})
    }
}


module.exports = { buildLeague, fetchLeague, fetchAll, updateLeague }
