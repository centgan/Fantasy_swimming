const mongoose = require('mongoose')
const User = require('../model/userModel')
const Schema = mongoose.Schema
const drafting_month = 1
const drafting_start = 0
const drafting_end = 32

const leagueSchema = new Schema({
    owner_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    score: {
        type: String,
        required: true
    },
    players_id: {
        type: Array,
        required: true
    },
    drafting: {
        type: Boolean,
        required: true
    },
    draft_order: {
        type: Number,
        required: true
    },
    player_roaster: {
        type: Object
    }
})

leagueSchema.statics.makeLeague = async function (owner_id, name, number, score) {
    const current_date = new Date();
    const month = current_date.getMonth();
    const day = current_date.getDate();
    let drafting_ = false

    if (!owner_id || !name || !number || !score) {
        throw Error('fill everything out dick')

    }

    const existn = await this.findOne({owner_id: owner_id, name})

    if (existn) {
        throw Error('league name already in use')
    }

    if ((month === drafting_month) && (drafting_start < day < drafting_end)) {
        drafting_ = true
    }

    let aPlayer = [owner_id]
    // console.log(aPlayer)
    const middle = await this.create({owner_id: owner_id, name, number, score, drafting: drafting_, draft_order: 25, players_id: aPlayer});
    try {
        const user = await User.findById(owner_id);
        user.league_id.push(middle._id);
        const user_up = await User.findByIdAndUpdate(owner_id, user);
    } catch (e) {
        console.log(e.message);
    }
    return middle
}

leagueSchema.statics.updateLeague = async function (_id, body) {
    const exist = await this.findOne({_id})

    if (!exist) {
        throw Error('No such League')
    }
    await this.findOneAndUpdate({_id}, {
        ...body
    })
}

module.exports = mongoose.model('League', leagueSchema)
