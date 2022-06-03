const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const Log_Manager = new Schema({
    description: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    tableName: {
        type: String,
        required: true
    },
    manager: {
        type: ObjectId,
        ref: 'Account',
    },

});

module.exports = mongoose.model('Log_Manager', Log_Manager);
