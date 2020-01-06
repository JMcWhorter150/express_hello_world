const http = require('http');
const express = require('express');
const PORT = 3000;

const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
    console.log("Request received");
    res.send(`Hello Express!!!`)
})

app.get('/albums', (req, res) => {
    res.send(`a list of albums`);
})

// :albumID is a placeholder
// can't match the following:
// ? & = % /
app.get(`/albums/:albumID`, (req, res) => {
    
    res.send(`You want: ${req.params.albumID}`)
})

app.get(`/albums/:albumID/songs`, (req, res) => {
    res.send(`The songs for album ${req.params.albumID}`)
})


// when route matching, it goes first one first and doesn't care about later route matches
app.get(`/albums/:albumID/songs/:songID`, (req, res) => {
    res.send(`Song ${req.params.songID} on album ${req.params.albumID}`)
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
