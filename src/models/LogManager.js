const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logManagerSchema = new Schema({
    description: {
        type: String,
        required: true,
        maxLength: 255
    },
    action: {
        type: String,
        required: true
    },
    managerUsername: {
        type: String,
        ref: 'Account',
    },
    userId: {
        type: Number,
        ref: 'Account',
    },
    time: {
        type: Date
    }

});

module.exports = mongoose.model('log_managers', logManagerSchema);
