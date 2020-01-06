const albums = require('./albumsData.json');

function getAlbumTitle(id) {
    for (let album of albums.albums) {
        if (id === album.id) {
            return album.title;
        }
    }
    return `Data not found`
}

function getAlbums() {
    return albums.albums;
}

function getAlbum(id) {
    for (let album of albums.albums) {
        if (id === album.id) {
            return album;
        }
    }
    return `Data not found`
}

function getAlbumTitles() {
    let result = ``;
    for (let album of albums.albums) {
        result += `${album.title} `;
    }
    return result;
}

function getSongsForAlbum(id) {
    let albumObj = getAlbum(id);
    return albumObj.songs;
}

module.exports = {
    getAlbumTitle,
    getAlbumTitles,
    getSongsForAlbum,
    getAlbums,
    getAlbum
};