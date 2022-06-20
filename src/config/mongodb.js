require('dotenv').config();
const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');


async function connect() {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1
        });
        console.log('Connect MongoDB successfully!!!');
    } catch (error) {
        console.log('Connect MongoDB failure!!!');
        process.exit(1);
    }
}

module.exports = { connect };