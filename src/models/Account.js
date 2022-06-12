const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const accountSchema = new Schema({
    _id: {
        type: Number,
        unique: true,
        required: true
    },
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
    },
    dateOfBirth: {
        type: Date,
    },
    avatarUrl: {
        type: String,
    },
    ifHasAvatar: {
        type: Boolean,
    },
    cardID: {
        type: String,
        $regex: /^([0-9]{12})$/
    },
    state: {
        type: String,
        enum: ['F0', 'F1', 'F2', 'F3']
    },
    isBlock: {
        type: Boolean,
    },
    permission: {
        type: String,
        enum: ['ADMIN', 'ACTIVE_MANAGER', 'INACTIVE_MANAGER', 'USER']
    },
    quarantineLocation: [{
        type: ObjectId,
        ref: 'QuarantineLocation',
    }]
}, {
    _id: false, // mongodb can't interfere this field
    timestamps: true,
});

accountSchema.plugin(AutoIncrement, {
    id: "account_seq",
    collection_name: "account_counters"
});
module.exports = mongoose.model('accounts', accountSchema);
