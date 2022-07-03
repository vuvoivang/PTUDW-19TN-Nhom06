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
    return arr.map((item) => item.toObject());
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

function getDate() {
    let date = new Date();
    return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}

function sortProductByPackage(products, productPackage) {
    const [productsInPackage, productsNotInPackage] = products.reduce((acc, product) => {
        const productPackageItem = productPackage.find(item => item.product === product._id)
        if (productPackageItem) {
            acc[0].push(product)
        } else {
            acc[1].push(product)
        }
        return acc
    }, [[], []])
    return [...productsInPackage, ...productsNotInPackage]
}

function sortRelatesPatient(relates, relatedPatient) {
    const [relatesPatient, relatesNotPatient] = relates.reduce((acc, relate) => {
        const relatePatient = relatedPatient.find(item => item.relatedUserId === relate._id)
        if (relatePatient) {
            acc[0].push(relate)
        } else {
            acc[1].push(relate)
        }
        return acc
    }, [[], []])
    return [...relatesPatient, ...relatesNotPatient]
}

function getNextStateRelated(state) {
    switch (state) {
        case 'F0':
            return 'F1';
        case 'F1':
            return 'F2';
        case 'F2':
            return 'F3';
        default:
            return 'Khỏi bệnh';
    }
}

function compareState(state1, state2) {
    const state1Index = ['Khỏi bệnh', 'F0', 'F1', 'F2', 'F3'].indexOf(state1);
    const state2Index = ['Khỏi bệnh', 'F0', 'F1', 'F2', 'F3'].indexOf(state2);
    return state1Index > state2Index;
}

// format Date type to format yyyy-MM-dd
function formatDate(date) {
    const d = new Date(date);
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const day = `0${d.getDate()}`.slice(-2);
    return `${d.getFullYear()}-${month}-${day}`;
}

module.exports = {
    uploadFile,
    getFileURL,
    mapObjectInArray,
    deleteFile,
    extractFilenameFromURL,
    deleteFileFromURL,
    createUrlFromImageName,
    getDate,
    sortProductByPackage,
    sortRelatesPatient,
    getNextStateRelated,
    compareState,
    formatDate,
};
