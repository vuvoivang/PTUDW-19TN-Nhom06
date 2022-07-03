const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const minimumTransferSchema = new Schema({
    value: {
        type: Number,
        required: true,
        min: 30000,
    },
    type:{
        type: String,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('minimum_transfer', minimumTransferSchema);
