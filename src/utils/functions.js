const firebase = require('../config/firebase');

// ex: filename = folder + req.file.originalname
async function uploadFile(req, filename) {
    const blob = firebase.bucket.file(filename);

    const blobWriter = blob.createWriteStream({
        metadata: {
            contentType: req.file.mimetype,
        },
    });

    blobWriter.on('error', (err) => {
        console.log('file error: ' + err);
    });

    blobWriter.on('finish', () => {
        console.log('File uploaded.');
    });
    blobWriter.end(req.file.buffer);
    const url = await firebase.bucket.file(filename).getSignedUrl({
        action: 'read',
        expires: '03-09-2491',
    });

    return url;
}

async function getFilename(filename) {
    const url = await firebase.bucket.file(filename).getSignedUrl({
        action: 'read',
        expires: '03-09-2491',
    });

    return url;
}

const mapObjectInArray = (arr) => {
    return arr.map(item => item.toObject());
}

module.exports = {
    uploadFile,
    getFilename,
    mapObjectInArray
}