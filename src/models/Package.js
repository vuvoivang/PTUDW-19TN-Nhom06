const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const packageSchema = new Schema({
    _id: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    limitPerPerson: {
        type: Number,
        required: true,
    },
    limitTime: {
        type: Number,
        required: true,
    },
    productList: [
        {
            product: {
                type: Number,
                ref: 'products',
            },
            limitPerPackage: {
                type: Number,
            },
        },
    ],
    image: {
        type: String,
        required: true,
    },
    defaultPrice: {
        type: Number,
        required: true,
    }
});

packageSchema.plugin(AutoIncrement, { id: 'package_seq', collection_name: 'package_counters' });
module.exports = mongoose.model('packages', packageSchema);
