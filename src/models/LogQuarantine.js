const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const LogQuarantine = new Schema({
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
        required: true
    },
    quarantineLocation: [{
        type: ObjectId,
        ref: 'Quarantine_Location',
    }, ],
    time: {
        type: Date
    }

});

module.exports = mongoose.model('LogQuarantine', LogQuarantine);
