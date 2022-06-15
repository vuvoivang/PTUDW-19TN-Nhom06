const firebase = require('../config/firebase');

// ex: filename = folder + file.originalname
async function uploadFile(file, filename) {
    const blob = firebase.bucket.file(filename);

    const blobWriter = blob.createWriteStream({
        metadata: {
            contentType: file.mimetype,
        },
    });

    blobWriter.on('error', (err) => {
        console.log('file error: ' + err);
    });

    blobWriter.on('finish', () => {
        console.log('File uploaded.');
    });
    blobWriter.end(file.buffer);
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

async function deleteFile(filename) {
    await firebase.bucket.deleteFiles({
        prefix: filename,
    });
}

module.exports = {
    uploadFile,
    getFilename,
    deleteFile,
};
