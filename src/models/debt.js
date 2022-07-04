const mongoose = require('mongoose');

const debtSchema = mongoose.Schema({
    userId: {
        type: Number,
        require: true
    },
    username: {
        type: String
    },
    displayName: {
        type: String
    },
    state: {
        type: String,
        enum: ["Khỏi bệnh", 'F0', 'F1', 'F2', 'F3']
    },
    debt: {
        type: Number,
        default: 0
    },
    isAnnounce: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Debt', debtSchema);