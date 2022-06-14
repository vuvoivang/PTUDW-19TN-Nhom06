const admin = require('firebase-admin');
const multer = require('multer');
let path = require('path');

// Initialize firebase admin SDK
admin.initializeApp({
    credential: admin.credential.cert(path.join(__dirname, '..', 'ptudw-covid-firebase-adminsdk-152ur-2909d0dea7.json')),
    storageBucket: 'gs://ptudw-covid.appspot.com',
});
// Cloud storage
const bucket = admin.storage().bucket();


const upload = multer({
    storage: multer.memoryStorage(),
});

module.exports = {
    bucket,
    upload,
};
