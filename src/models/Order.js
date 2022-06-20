const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'Account',
        required: true,
    },
    item: {
        type: ObjectId, // can be ref to Product or Package model base on type
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
        required: true,
    },
    paymentTime: {
        type: Date,
        required: true,
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
});

module.exports = mongoose.model('orders', orderSchema);
