const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// all need to required later but for development purposes I'm going to leave it not required
const swimmerSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    nationality: {
        required: true,
        type: String
    },
    front: {
        type: Number
    },
    back: {
        type: Number
    },
    breast: {
        type: Number
    },
    fly: {
        type: Number
    },
    picked: {
        type: Boolean
    }
})

swimmerSchema.statics.makeSwimmer = async function (name, nationality, front, back, breast, fly) {
    if (!name || !nationality) {
        throw Error('fill everything out')
    }
    const exist = await this.findOne({name})

    if (exist) {
        throw Error('Swimmer already there')
    }

    return await this.create({name, nationality, front, back, breast, fly, picked: false})
}

swimmerSchema.statics.updateSwimmer = async function (_id, body) {
    const exist = await this.findById(_id)

    if (!exist) {
        throw Error('No such swimmer')
    }
    await this.findOneAndUpdate({_id}, {
        ...body
    })
}

module.exports = mongoose.model('Swimmer', swimmerSchema)
