const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    league_id: {
        type: Array
    }
})

// static signup method
userSchema.statics.signup = async function (username, email, password) {

    if (!email || !password || !username) {
        throw Error('must fill out')
    }
    if (!email.includes('@')) {
        throw Error('enter a valid email')
    }
    if (password.length < 8) {
        throw Error('password not strong enough')
    }

    const existE = await this.findOne({ email })
    const existU = await this.findOne({ username })

    if (existE) {
        throw Error('email in use')
    }else if (existU) {
        throw Error('username in use')
    }

    const salt = await bcrypt.genSalt(10);
    const after = await bcrypt.hash(password, salt);

    return await this.create({ username, email, password: after })
}

userSchema.statics.login = async function (username, password) {
    let em, exist;
    if (!username || !password) {
        throw Error('must fill out')
    }
    if (username.includes('@')) {
        em = true;
    }
    if (em) {
        exist = await this.findOne({ email: username })
        if (!exist) {
            throw Error('Incorrect username or password')
        }
    } else {
        exist = await this.findOne({ username })
        if (!exist) {
            throw Error('Incorrect username or password')
        }
    }
    console.log(exist, "hello")
    const match = await bcrypt.compare(password, exist.password)

    if (!match) {
        throw Error('Incorrect username or password')
    }
    return exist
}

userSchema.statics.updating = async function (_id, body) {
    const exists = this.findOne({_id})
    if (!exists) {
        throw Error('user not a thing')
    }
    await this.findByIdAndUpdate({_id}, {
        ...body
    })
}

module.exports = mongoose.model('User', userSchema)
