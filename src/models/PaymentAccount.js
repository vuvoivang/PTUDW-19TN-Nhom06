const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const paymentAccountSchema = new Schema({
    // confuse: tài khoản chính
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
    accountNumber:{
        type: String,
        required: true,
        unique: true, // main: 000000000000
        $regex: /^([0-9])$/ // uncertain
    },
    balance:{
        type: Number,
        required: true,
        min: 0
    },
    debt:{
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('PaymentAccount', paymentAccountSchema);
