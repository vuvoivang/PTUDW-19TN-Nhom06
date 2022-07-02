const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quarantineLocationSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 50
    },
    address: {
        type: String,
        trim: true
    },
    capacity: {
        type: Number,
        required: true,
        min: 0
    },
    patientsNumber: {
        type: Number,
        required: true,
        min: 0
    }
});

module.exports = mongoose.model('quarantine_locations', quarantineLocationSchema);
