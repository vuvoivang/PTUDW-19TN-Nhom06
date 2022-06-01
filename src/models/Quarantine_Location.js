const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Quarantine_Location = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    location: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    patientsNumber: {
        type: Number,
        required: true
    },
    


});

module.exports = mongoose.model('Quarantine_Location', Quarantine_Location);
