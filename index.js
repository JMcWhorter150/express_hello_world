const http = require('http');
const express = require('express');
const PORT = 3000;
const albums = require('./albums.js');
const album = require('./albumsData.json');

const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
    console.log("Request received");
    res.send(`Hello Express!!!`)
})

app.get('/albums', (req, res) => {
    res.send(albums.getAlbumTitles());
})

// :albumID is a placeholder
// can't match the following:
// ? & = % /
app.get(`/albums/:albumID`, (req, res) => {
    res.send(albums.getAlbumData(req.params.albumID));
})

app.get(`/albums/:albumID/songs`, (req, res) => {
    res.send(albums.getSongsForAlbum(req.params.albumID));
})


// when route matching, it goes first one first and doesn't care about later route matches
app.get(`/albums/:albumID/songs/:songID`, (req, res) => {
    res.send(albums.getSongData(req.params.albumID, req.params.songID));
})

app.get(`/json/albums`, (req, res) => {
    res.json(album.albums);
})

// has to go at the end because if at the top, routes don't matter as this catches all
// At the bottom, this catches any typos/everything
// - res has methods....
app.get(`*`, (req, res) => {
    console.log(`Redirecting because no page here.`)
    res.redirect(`/`);
});

server.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
})
