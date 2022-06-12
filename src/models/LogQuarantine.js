const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const logQuarantineSchema = new Schema({
    description: {
        type: String,
        required: true,
        maxLength: 255
    },
    action: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        ref: 'Account',
    },
    state: {
        type: String,
        enum: ['F0', 'F1', 'F2', 'F3']
    },
    quarantineLocation: [{
        type: ObjectId,
        ref: 'QuarantineLocation',
    }],
    time: {
        type: Date
    }

});

module.exports = mongoose.model('log_quarantines', logQuarantineSchema);
