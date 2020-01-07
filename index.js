const http = require('http');
const express = require('express');
const PORT = 3000;
const albums = require('./albums.js');
const album = require('./albumsData.json');
const es6Renderer = require('express-es6-template-engine');
const morgan = require('morgan');
const logger = morgan('tiny');


const app = express();
const server = http.createServer(app);

const partials = {
    header: 'partials/header',
    nav: 'partials/nav',
    footer: 'partials/footer',
}

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

app.use(logger);
app.get('/', (req, res) => {
    res.render('home', {
        locals: {
            content: "<h1>Welcome to the home page</h1>",
            pageTitle: "Home"
        },
        partials
    })
})

app.get('/albums', (req, res) => {
    // res.send(albums.getAlbumTitles());
    let content = albums.getAlbumTitles();
    res.render('home', {
        locals: {
            content,
            pageTitle: req.url.slice(1)
        },
        partials
    })
})

// :albumID is a placeholder
// can't match the following:
// ? & = % /
app.get(`/albums/:albumID`, (req, res) => {
    // res.send(albums.getAlbumData(req.params.albumID));
    const content = albums.getAlbumData(req.params.albumID) + `<li><a href="${req.url}/songs">Songs</a></li>` + `<li><a href="/albums">Return to Albums</a></li>`;
    res.render('home', {
        locals: {
            content,
            pageTitle: req.params.albumID
        },
        partials
    })
})

app.get(`/albums/:albumID/songs`, (req, res) => {
    // res.send(albums.getSongsForAlbum(req.params.albumID));
    let content = albums.getSongsForAlbum(req.params.albumID);
    res.render('home', {
        locals: {
            content,
            pageTitle: "songs"
        },
        partials
    })
})


// when route matching, it goes first one first and doesn't care about later route matches
app.get(`/albums/:albumID/songs/:songID`, (req, res) => {
    let content = albums.getSongData(req.params.albumID, req.params.songID);
    // res.send(albums.getSongData(req.params.albumID, req.params.songID));
    res.render('home', {
        locals: {
            content,
            pageTitle: req.params.songID
        },
        partials
    })
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
