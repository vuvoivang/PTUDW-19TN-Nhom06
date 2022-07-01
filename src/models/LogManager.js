const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

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

});

module.exports = mongoose.model('log_managers', logManagerSchema);
