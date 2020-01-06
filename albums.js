const albums = require('./albumsData.json');

function getAlbum(id) {
    for (let album of albums.albums) {
        if (id === String(album.id)) {
            return album;
        }
    }
    return `Data not found`
}

function getAlbumData(id) {
    let albumObj = getAlbum(id);
    if (albumObj === 'Data not found') {
        return albumObj
    } else {
        return `<li>Album ID: ${albumObj.id}</li>
    <li>Album Title: ${albumObj.title}</li>
    <li>Album Artist: ${albumObj.artist}</li>`
    }
}

function getAlbumTitles() {
    let result = ``;
    for (let album of albums.albums) {
        result += `<li>Name: ${album.title} ID: ${album.id}</li>`;
    }
    return result;
}

function getSongsForAlbum(id) {
    let albumObj = getAlbum(id);
    if (albumObj === 'Data not found') {
        return albumObj
    } else {
        let result = "";
        let songs = albumObj.songs;
        for (let song of songs) {
            result += `<li>Title: ${song.title}</li>
            <li>ID: ${song.id}`;
        }
        return result;
    }
}

function getSongData(albumId, songId) {
    let albumObj = getAlbum(albumId);
    if (albumObj === 'Data not found') {
        return albumObj;
    }
    let song;
    for (let songObj of albumObj.songs) {
        if (String(songObj.id) === songId) {
            song = songObj;
        }
    }
    if (song === undefined) {
        return 'Data not found';
    }
    return `<li>Album: ${albumObj.title}</li>
    <li>Artist: ${albumObj.artist}</li>
    <li>Song Title: ${song.title}</li>
    <li>Song ID: ${songId}</li>`
}

// console.log(getAlbumData("1001"));

module.exports = {
    getAlbumTitles,
    getSongsForAlbum,
    getAlbumData,
    getSongData
};