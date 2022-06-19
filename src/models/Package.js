const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const packageSchema = new Schema({
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
    }
});

module.exports = mongoose.model('packages', packageSchema);
