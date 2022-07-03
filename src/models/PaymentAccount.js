const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcryptjs');

const paymentAccountSchema = new Schema({
    paymentAccountId: {
        type: Number,
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
paymentAccountSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

paymentAccountSchema.methods.correctPassword = async function (candidate, password) {
   return bcrypt.compare(candidate, password);
};

module.exports = mongoose.model('payment_accounts', paymentAccountSchema);
