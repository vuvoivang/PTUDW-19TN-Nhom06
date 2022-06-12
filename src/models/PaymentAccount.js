const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const paymentAccountSchema = new Schema({
    paymentAccountId: {
        type: ObjectId,
        ref: 'Account',
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    accountNumber: {
        type: Number,
        unique: true, // main: 100000000000
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }

}, {
    timestamps: true,
});

paymentAccountSchema.plugin(AutoIncrement, {
    id: "account_number_seq",
    inc_field: 'accountNumber',
    start_seq: 10000001,
    collection_name: "account_number_counters"
});
module.exports = mongoose.model('payment_accounts', paymentAccountSchema);
