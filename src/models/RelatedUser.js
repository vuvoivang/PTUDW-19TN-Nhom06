const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const relatedUserSchema = new Schema({
    userId: {
        type: Number,
        ref: 'Account',
    },
    relatedUserId: {
        type: Number,
        ref: 'Account',
    },
    stateRelatedUser: {
        type: String,
        enum: ['Khỏi bệnh', 'F0', 'F1', 'F2', 'F3'],
        required: true
    },
});

module.exports = mongoose.model('related_users', relatedUserSchema);
