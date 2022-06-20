const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const productSchema = new Schema({
    _id: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    unit: {
        type: String,
        required: true,
        min: 0,
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true,
    },
    description: {
        type: String,
    },
    images: [
        {
            type: String,
            required: true,
        },
    ],
});

productSchema.plugin(AutoIncrement, { id: 'product_seq', start_seq: 1000, collection_name: 'product_counters' });
module.exports = mongoose.model('products', productSchema);
