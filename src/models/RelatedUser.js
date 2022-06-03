const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const RelatedUser = new Schema({
    userId: {
        type: ObjectId,
        ref: 'Account',
    },
    relatedUserId: {
        type: ObjectId,
        ref: 'Account',
    },
    state: {
        type: String,
        required: true
    }


});

module.exports = mongoose.model('RelatedUser', RelatedUser);
