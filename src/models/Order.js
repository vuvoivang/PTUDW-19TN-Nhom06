const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: Number,
        ref: 'Account',
        required: true,
    },
    item: {
        type: Number, // can be ref to Product or Package model base on type
        refPath: 'type',
    },
    type: {
        type: String,
        enum: ['Product', 'Package'],
        required: true,
    },
    detail: [
        {
            product: {
                type: Number,
                ref: 'Product',
            },
            quantity: {
                type: Number,
            },
            price: {
                type: Number,
            },
        },
    ],
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    orderTime: {
        type: Date,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'credit-card'],
        required: true,
    },
    paymentAccount: {
        type: String,
        ref: 'PaymentAccount',
        // required: true,
    },
    paymentTime: {
        type: Date,
        // required: true,
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'delivering', 'delivered', 'cancelled'],
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('orders', orderSchema);
