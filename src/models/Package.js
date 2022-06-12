const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const productListSchema = new Schema({
    product: {
        type: ObjectId,
        ref: 'Product',
        required: true
    },
    limitPerPackage: {
        type: Number,
        required: true
    },
})

const packageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    limitPerPerson: {
        type: Number,
        required: true
    },
    limitTime: {
        type: Number,
        required: true
    },
    productList: {
        type: Array(productListSchema),
        required: true,
        minlength: 2,
    }
})

module.exports = mongoose.model('packages', packageSchema);