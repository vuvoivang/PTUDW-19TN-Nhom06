const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const transactionSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'PaymentAccount',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    type: {
        type: String,
        enum: ['deposit', 'withdraw', 'payment'],
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 255
    }
});


module.exports = mongoose.model('transactions', transactionSchema);
