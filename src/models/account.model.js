const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const accountSchema = new mongoose.Schema({
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
        required: true,
        select: false
    },
    role: {
        type: String,
        default: 'user'
    },
    auth: {
        type: String,
        default: 'normal'
    },
    displayName: {
        type: String,
        default: this.username
    }
})

accountSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)
    next()
})

accountSchema.methods.correctPassword = async function(candidate, password) {
    return await bcrypt.compare(candidate, password)
}

const Account = mongoose.model('Accounts', accountSchema)

module.exports = Account