const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const transactionSchema = new Schema({
    _id: {
        type: Number,
        unique: true,
    },
    accountId: {
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
}, {
    _id: false
});

transactionSchema.plugin(AutoIncrement, { id: "transaction_seq", start_seq: 10000, collection_name: "transaction_counters" });
module.exports = mongoose.model('transactions', transactionSchema);
