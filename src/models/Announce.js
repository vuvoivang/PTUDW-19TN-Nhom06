const mongoose = require('mongoose');

const announceSchema = mongoose.Schema({
    header: {
        type: String,
        default: "Thanh toán nợ",
        trim: true
    },
    content: {
        type: String,
        require: true
    },
    userId: {
        type: Number,
        ref: 'Account',
        require: true
    },
    createAt: {
        type: Date,
        default: Date(Date.now())
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Announce', announceSchema);