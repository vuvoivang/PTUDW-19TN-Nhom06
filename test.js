function extractFilenameFromURL(url) {
    const filename = url.split('?')[0].replace('https://storage.googleapis.com/ptudw-covid.appspot.com/', '');  
    return filename;
}

console.log(extractFilenameFromURL('https://storage.googleapis.com/ptudw-covid.appspot.com/categories/category-thucannhanh_1655176969931.jpg?GoogleAccessId=firebase-adminsdk-152ur%40ptudw-covid.iam.gserviceaccount.com&Expires=16446992400&Signature=SCh%2BPLA68d%2BPcoWMUipoAC9PmItzJVfYssue%2B%2B131fxpFy366K7K0lkNqmed7jfTvkYYHv8RVUVLXVwmbAbcqI%2FwMMRfAf%2BsUMBkQ6m3b5wX4N0cKKkf98UBooTVYK7szGE6j3IGQNV3pSJpeOT5W2X7DDiVLsogESkvjXTFzCyjzS12e3rFKxSf%2Bw3t9ns5VGedsH5EnHtQg6xQVBc6iI47zEtkpvvhWZ423dvPer1HkP%2BZ0viV4t3%2BEWMuLRD2pSGdo5lpoeJGANHuIhw0aAb2bnryEeTEhxXFAxsh0gD1oaR5%2B7VfdUTUcBpsgYM0GF0nn2KYg2I7Gfoj%2FqeTmg%3D%3D'));