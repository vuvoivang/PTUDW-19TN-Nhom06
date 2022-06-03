const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentAccountSchema = new Schema({
})

module.exports = mongoose.model('Payment_Account', paymentAccountSchema);