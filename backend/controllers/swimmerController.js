const Swimmer = require('../model/swimmerModel');

const createSwimmer = async (req, res) => {
    const {name, nationality, front, back, breast, fly} = req.body

    try {
        const swimmers = await Swimmer.makeSwimmer(name, nationality, front, back, breast, fly)
        res.status(200).json({name, nationality, front, back, breast, fly})
    } catch (e) {
        console.log(e)
        res.status(400).json({error: e.message})
    }
}

const fetchAllSwimmer = async (req, res) => {
    const All = await Swimmer.find()

    res.status(200).json(All)
}

const fetchSwimmer = async (req, res) => {
    const {id} = req.params
    // console.log(id)

    try {
        const swimmer = await Swimmer.findById(id)
        res.status(200).json(swimmer)
    } catch (e) {
        res.status(404).json({error: 'no such swimmer'})
    }
}

const updateSwimmer = async (req, res) => {
    const {id} = req.params

    try  {
        const updating = await Swimmer.updateSwimmer(id,req.body);
        res.status(200).json(updating)
    } catch (e) {
        console.log(e)
        res.status(400).json({error: e.message})
    }
}

const deleteSwimmer = async (req, res) => {
    const {id} = req.params

    try {
        const deleting = await Swimmer.findByIdAndDelete(id);
        res.status(200).json(deleting)
    } catch (e) {
        console.log(e)
        res.status(400).json({error: e.message})
    }
}

module.exports = {createSwimmer, fetchAllSwimmer, fetchSwimmer, updateSwimmer, deleteSwimmer}
