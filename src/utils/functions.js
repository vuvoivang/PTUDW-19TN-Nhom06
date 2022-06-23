const firebase = require('../config/firebase');
const { PREFIX_STORAGE_FILE } = require('../constants');

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

function mapObjectInArray(arr) {
    return arr.map(item => item.toObject());
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

async function createUrlFromImageName(image, storage) {
    const timestamp = Date.now();
    const name = image.originalname.split('.')[0];
    const type = image.originalname.split('.')[1];
    const prefix = PREFIX_STORAGE_FILE[storage];
    const filename = `${prefix}-${name}_${timestamp}.${type}`;
    const url = await uploadFile(image, `${storage}/${filename}`);
    return url[0];
}

module.exports = {
    uploadFile,
    getFileURL,
    mapObjectInArray,
    deleteFile,
    extractFilenameFromURL,
    deleteFileFromURL,
    createUrlFromImageName
};
