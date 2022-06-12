const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const relatedUserSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'Account',
    },
    relatedUserId: {
        type: ObjectId,
        ref: 'Account',
    },
    stateRelatedUser: {
        type: String,
        enum: ['F0', 'F1', 'F2', 'F3'],
        required: true
    },
});

module.exports = mongoose.model('related_users', relatedUserSchema);
