const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const packageStatisticsSchema = new Schema({
    package: {
        type: Number,
        ref: 'packages',
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

module.exports = mongoose.model('package_statistics', packageStatisticsSchema);
