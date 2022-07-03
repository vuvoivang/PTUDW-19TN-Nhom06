const mongoose = require('mongoose');

const announceSchema = mongoose.Schema({
    type: {
        type: String,
        default: "debt",
        require: true
    },
    content: {
        type: String,
        require: true
    },
    userId: {
        type: Number,
        ref: 'Account'
    },
    label: {
        type: String,
        default: "Thanh toán nợ",
        trim: true
    },
    createAt: {
        type: Date,
        default: Date(Date.now())
    }
});

module.exports = mongoose.model('Announce', announceSchema);