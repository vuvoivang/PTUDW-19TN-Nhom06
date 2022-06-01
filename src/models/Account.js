const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const Account = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    fullName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date
    },
    avatarUrl: {
        type: String,
    },
    ifHasAvatar: {
        type: Boolean,
    },
    cardID:{
        type: String,
        required: true,
        $regex: /^([0-9]{12})$/
    },
    state: {
        type: String,
        required: true
    },
    quarantineLocation: [{
        type: ObjectId,
        ref: 'Quarantine_Location',
    }, ]


}, {
    timestamps: true,
});

module.exports = mongoose.model('Account', Account);
