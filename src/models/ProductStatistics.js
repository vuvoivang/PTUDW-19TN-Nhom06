const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const productStatisticsSchema = new Schema({
    product: {
        type: Number,
        ref: 'products',
        required: true,
    },
    totalSold: {
        type: Number,
        required: true,
        default: 0,
    },
    date: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('product_statistics', productStatisticsSchema);