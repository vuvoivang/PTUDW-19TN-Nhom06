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

async function getFileURL(filename) {
    const url = await firebase.bucket.file(filename).getSignedUrl({
        action: 'read',
        expires: '03-09-2491',
    });

    return url;
}

function extractFilenameFromURL(url) {
    const filename = url.split('?')[0].replace('https://storage.googleapis.com/ptudw-covid.appspot.com/', '');  
    return filename;
}

async function deleteFile(filename) {
    await firebase.bucket.deleteFiles({
        prefix: filename,
    });
}

async function deleteFileFromURL(url) {
    const filename = extractFilenameFromURL(url);
    await firebase.bucket.deleteFiles({
        prefix: filename,
    });
}

module.exports = {
    uploadFile,
    getFileURL,
    deleteFile,
    extractFilenameFromURL,
    deleteFileFromURL
};
